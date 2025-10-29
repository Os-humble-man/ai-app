import OpenAI from 'openai';
import { conversationRepository } from '../repositories/conversation.repository';

interface ChatResponse {
   id: string;
   message: string;
}

const openai = new OpenAI({
   apiKey: process.env.OPENROUTER_API_KEY,
   baseURL: process.env.OPENROUTER_BASE_URL,
});

export const chatService = {
   async generateConversationTitle(
      conversationId: string,
      messages: any[]
   ): Promise<string> {
      const existingTitle =
         conversationRepository.getConversationTitle(conversationId);
      if (existingTitle) {
         return existingTitle;
      }

      const contextMessages = messages.slice(0, 4);
      const titlePrompt = `Generate a concise and descriptive title for the following conversation between a user and an AI assistant. The title should capture the main topic discussed. Respond with only the title, no additional text.

Conversation:
${contextMessages.map((msg) => `${msg.role}: ${msg.content}`).join('\n')}
Titre:`;
      try {
         const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: titlePrompt }],
            temperature: 0.2,
            max_tokens: 100,
         });

         const title = response.choices[0]?.message?.content || '';
         conversationRepository.setConversationTitle(conversationId, title);
         return title;
      } catch (error) {
         console.error('Error generating conversation title:', error);
         throw new Error('Failed to generate conversation title');
      }
   },

   async sendMessage(
      prompt: string,
      conversationId: string
   ): Promise<ChatResponse> {
      let messages =
         conversationRepository.getLastResponseId(conversationId) || [];

      const isNewConversation = messages.length === 0;

      // Add the user's new message to the conversation
      messages.push({ role: 'user', content: prompt });

      const response = await openai.chat.completions.create({
         model: 'gpt-4o-mini',
         messages: messages,
         temperature: 0.2,
         max_tokens: 100,
      });

      const assistantMessage = response.choices[0]?.message?.content || '';

      // Add the assistant's response to the conversation
      messages.push({ role: 'assistant', content: assistantMessage });

      // Update conversation history
      conversationRepository.setLastResponseId(conversationId, messages);

      if (isNewConversation && messages.length > 2) {
         // Generate and set conversation title for new conversations
         await this.generateConversationTitle(conversationId, messages);
      }

      console.log(`Conversation ${conversationId}:`, messages);
      return {
         id: response.id,
         message: assistantMessage,
      };
   },

   async *sendMessageStream(
      prompt: string,
      conversationId: string
   ): AsyncGenerator<{ id: string; content: string; done: boolean }> {
      let messages =
         conversationRepository.getLastResponseId(conversationId) || [];

      const isNewConversation = messages.length === 0;

      // Add the user's new message to the conversation
      messages.push({ role: 'user', content: prompt });

      const stream = await openai.chat.completions.create({
         model: 'gpt-4o-mini',
         messages: messages,
         temperature: 0.2,
         max_tokens: 1000,
         stream: true,
      });

      let fullResponse = '';
      let responseId = '';

      for await (const chunk of stream) {
         const delta = chunk.choices[0]?.delta;

         if (chunk.id && !responseId) {
            responseId = chunk.id;
         }

         if (delta?.content) {
            fullResponse += delta.content;
            yield {
               id: responseId,
               content: delta.content,
               done: false,
            };
         }
      }

      // Add the complete assistant's response to the conversation
      messages.push({ role: 'assistant', content: fullResponse });

      // Update conversation history
      conversationRepository.setLastResponseId(conversationId, messages);

      if (isNewConversation && messages.length >= 2) {
         await this.generateConversationTitle(conversationId, messages);
      }

      console.log(`Conversation ${conversationId}:`, messages);

      // Signal that streaming is complete
      yield {
         id: responseId,
         content: '',
         done: true,
      };
   },
};
