import OpenAI from 'openai';
import { conversationRepository } from '../repositories/conversation.repository';

interface ChatResponse {
   id: string;
   message: string;
}

const openai = new OpenAI({
   apiKey: process.env.OPENROUTER_API_KEY,
   baseURL: 'https://openrouter.ai/api/v1',
});

export const chatService = {
   async sendMessage(
      prompt: string,
      conversationId: string
   ): Promise<ChatResponse> {
      let messages =
         conversationRepository.getLastResponseId(conversationId) || [];

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

      console.log(`Conversation ${conversationId}:`, messages);
      return {
         id: response.id,
         message: assistantMessage,
      };
   },
};
