import OpenAI from 'openai';
import { ConversationRepository } from '../repositories/conversation.repository';
import { inject } from 'inversify';

interface ChatResponse {
   id: string;
   message: string;
}

interface StreamChunk {
   id: string;
   content: string;
   done: boolean;
}

interface Message {
   role: 'user' | 'assistant';
   content: string;
   model_used?: string;
   token_count?: number;
}

const openai = new OpenAI({
   apiKey: process.env.OPENROUTER_API_KEY,
   baseURL: process.env.OPENROUTER_BASE_URL,
});

export class ChatService {
   private readonly DEFAULT_MODEL = 'gpt-4o-mini';
   private readonly DEFAULT_TEMPERATURE = 0.2;
   private readonly DEFAULT_MAX_TOKENS = 1000;

   constructor(
      @inject('ConversationRepository')
      private conversationRepository: ConversationRepository
   ) {}

   async generateConversationTitle(
      conversationId: string,
      messages: Message[]
   ): Promise<string> {
      try {
         const existingTitle =
            await this.conversationRepository.getConversationTitle(
               conversationId
            );

         if (existingTitle && existingTitle !== 'Nouvelle conversation') {
            return existingTitle;
         }

         if (messages.length < 2) {
            return 'Nouvelle conversation';
         }

         const contextMessages = messages.slice(0, 4);
         const titlePrompt = `Génère un titre concis et descriptif (max 5-6 mots) pour la conversation suivante. Le titre doit capturer le sujet principal. Réponds uniquement avec le titre, sans texte supplémentaire.

Conversation:
${contextMessages.map((msg) => `${msg.role}: ${msg.content}`).join('\n')}
Titre:`;

         const response = await openai.chat.completions.create({
            model: this.DEFAULT_MODEL,
            messages: [{ role: 'user', content: titlePrompt }],
            temperature: 0.3,
            max_tokens: 30,
         });

         const title =
            response.choices[0]?.message?.content?.trim() ||
            'Nouvelle conversation';

         const cleanTitle = title.replace(/^["']|["']$|\.$/g, '').trim();

         await this.conversationRepository.setConversationTitle(
            conversationId,
            cleanTitle
         );

         console.log(
            `Titre généré: "${cleanTitle}" pour la conversation ${conversationId}`
         );
         return cleanTitle;
      } catch (error) {
         console.error('Error generating conversation title:', error);
         return 'Nouvelle conversation';
      }
   }

   async sendMessage(
      prompt: string,
      conversationId: string | undefined,
      userId: string
   ): Promise<ChatResponse & { conversationId: string }> {
      try {
         let actualConversationId = conversationId;
         let isNewConversation = false;

         if (!actualConversationId) {
            const conversation = await this.conversationRepository.create(
               userId,
               'Nouvelle conversation',
               this.DEFAULT_MODEL
            );
            actualConversationId = conversation.id;
            isNewConversation = true;
         }

         let messages: Message[] =
            await this.conversationRepository.getConversationMessages(
               actualConversationId
            );

         // Add user message
         messages.push({
            role: 'user',
            content: prompt,
            model_used: this.DEFAULT_MODEL,
            token_count: prompt.trim().length,
         });

         const response = await openai.chat.completions.create({
            model: this.DEFAULT_MODEL,
            messages: messages,
            temperature: this.DEFAULT_TEMPERATURE,
            max_tokens: this.DEFAULT_MAX_TOKENS,
         });

         const assistantMessage =
            response.choices[0]?.message?.content?.trim() ||
            "Désolé, je n'ai pas pu générer de réponse.";

         messages.push({
            role: 'assistant',
            content: assistantMessage,
            model_used: this.DEFAULT_MODEL,
            token_count: assistantMessage.length,
         });

         // save message and conversation ID
         await this.conversationRepository.saveConversationMessages(
            actualConversationId,
            messages
         );

         // New conversation title generation
         if (isNewConversation) {
            await this.generateConversationTitle(
               actualConversationId,
               messages
            ).catch((error) =>
               console.error('Title generation failed:', error)
            );
         }

         return {
            id: response.id,
            message: assistantMessage,
            conversationId: actualConversationId,
         };
      } catch (error) {
         console.error('Error in sendMessage:', error);
         throw new Error(
            'Failed to send message: ' +
               (error instanceof Error ? error.message : 'Unknown error')
         );
      }
   }

   async *sendMessageStream(
      prompt: string,
      conversationId: string | undefined, // Permettre undefined ici aussi
      userId: string
   ): AsyncGenerator<StreamChunk & { conversationId?: string }> {
      try {
         let actualConversationId = conversationId;
         let messages: Message[] = [];
         let isNewConversation = false;

         // Même logique de création/récupération que sendMessage
         if (!actualConversationId) {
            const conversation = await this.conversationRepository.create(
               userId,
               'Nouvelle conversation',
               this.DEFAULT_MODEL
            );
            actualConversationId = conversation.id;
            isNewConversation = true;
            messages = [];
         } else {
            messages =
               await this.conversationRepository.getConversationMessages(
                  actualConversationId
               );
            isNewConversation = messages.length === 0;
         }

         messages.push({ role: 'user', content: prompt });

         const stream = await openai.chat.completions.create({
            model: this.DEFAULT_MODEL,
            messages: messages,
            temperature: this.DEFAULT_TEMPERATURE,
            max_tokens: this.DEFAULT_MAX_TOKENS,
            stream: true,
         });

         let fullResponse = '';
         let responseId = '';

         yield {
            id: 'conversation',
            content: '',
            done: false,
            conversationId: actualConversationId,
         };

         for await (const chunk of stream) {
            const delta = chunk.choices[0]?.delta;

            if (chunk.id && !responseId) {
               responseId = chunk.id;
            }

            if (delta?.content) {
               const content = delta.content;
               fullResponse += content;
               yield {
                  id: responseId,
                  content: content,
                  done: false,
               };
            }

            if (chunk.choices[0]?.finish_reason === 'length') {
               console.warn('Stream ended due to token limit');
               break;
            }
         }

         const cleanResponse = fullResponse.trim();
         messages.push({
            role: 'assistant',
            content: cleanResponse,
            model_used: this.DEFAULT_MODEL,
            token_count: fullResponse.length,
         });

         await this.conversationRepository.saveConversationMessages(
            actualConversationId,
            messages
         );

         if (isNewConversation && messages.length >= 2) {
            await this.generateConversationTitle(actualConversationId, messages) // ← CORRECTION
               .catch((error) =>
                  console.error('Background title generation failed:', error)
               );
         }

         console.log(`Conversation ${actualConversationId}: Stream completed`); // ← CORRECTION

         yield {
            id: responseId,
            content: '',
            done: true,
         };
      } catch (error) {
         console.error('Error in sendMessageStream:', error);
         yield {
            id: 'error',
            content:
               'Une erreur est survenue lors de la génération de la réponse.',
            done: true,
         };
         throw new Error(
            'Streaming failed: ' +
               (error instanceof Error ? error.message : 'Unknown error')
         );
      }
   }
}
