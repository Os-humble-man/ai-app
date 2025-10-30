import OpenAI from 'openai';
import { ConversationRepository } from '../repositories/conversation.repository';
import { inject } from 'inversify';

interface ChatResponse {
   id: string;
   message: string;
}

const openai = new OpenAI({
   apiKey: process.env.OPENROUTER_API_KEY,
   baseURL: process.env.OPENROUTER_BASE_URL,
});

export class ChatService {
   constructor(
      @inject('ConversationRepository')
      private conversationRepository: ConversationRepository
   ) {}

   async generateConversationTitle(
      conversationId: string,
      messages: any[]
   ): Promise<string> {
      const existingTitle =
         await this.conversationRepository.getConversationTitle(conversationId);
      if (existingTitle) {
         return existingTitle;
      }

      // Only generate a title after at least 2 messages (user + assistant)
      if (messages.length < 2) {
         return 'Nouvelle conversation';
      }

      const contextMessages = messages.slice(0, 4);
      const titlePrompt = `Génère un titre concis et descriptif pour la conversation suivante entre un utilisateur et un assistant IA. Le titre doit capturer le sujet principal discuté. Réponds uniquement avec le titre, sans texte supplémentaire.

Conversation:
${contextMessages.map((msg) => `${msg.role}: ${msg.content}`).join('\n')}
Titre:`;

      try {
         const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: titlePrompt }],
            temperature: 0.3,
            max_tokens: 50,
         });

         const title =
            response.choices[0]?.message?.content?.trim() ||
            'Nouvelle conversation';

         await this.conversationRepository.setConversationTitle(
            conversationId,
            title
         );
         return title;
      } catch (error) {
         console.error('Error generating conversation title:', error);
         return 'Nouvelle conversation';
      }
   }

   async sendMessage(
      prompt: string,
      conversationId: string
   ): Promise<ChatResponse> {
      let messages =
         await this.conversationRepository.getConversationMessages(
            conversationId
         );

      const isNewConversation = messages.length === 0;

      // Add the user's new message
      messages.push({ role: 'user', content: prompt });

      const response = await openai.chat.completions.create({
         model: 'gpt-4o-mini',
         messages: messages,
         temperature: 0.2,
         max_tokens: 100,
      });

      const assistantMessage = response.choices[0]?.message?.content || '';

      // Add the assistant's response
      messages.push({ role: 'assistant', content: assistantMessage });

      // Update the conversation history
      await this.conversationRepository.saveConversationMessages(
         conversationId,
         messages
      );

      // Generate a title for new conversations
      if (isNewConversation && messages.length >= 2) {
         await this.generateConversationTitle(conversationId, messages);
      }

      console.log(`Conversation ${conversationId}:`, messages);
      return {
         id: response.id,
         message: assistantMessage,
      };
   }

   async *sendMessageStream(
      prompt: string,
      conversationId: string
   ): AsyncGenerator<{ id: string; content: string; done: boolean }> {
      let messages =
         await this.conversationRepository.getConversationMessages(
            conversationId
         );

      const isNewConversation = messages.length === 0;

      // Add the user's new message
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

      // Add the assistant's full response
      messages.push({ role: 'assistant', content: fullResponse });

      // Update the conversation history
      await this.conversationRepository.saveConversationMessages(
         conversationId,
         messages
      );

      // Generate a title for new conversations
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
   }
}
