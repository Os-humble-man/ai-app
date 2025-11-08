import { encoding_for_model } from 'tiktoken';
import type { Message } from '../types/Conversation';

// derive the exact model type expected by encoding_for_model
type TiktokenModel = Parameters<typeof encoding_for_model>[0];

export class TokensHelper {
   /**
    * Get the token count for a given text message.
    * @param text The text message to analyze.
    * @param model The model to use for tokenization.
    * @returns The number of tokens in the message.
    */
   static getTokenCountForMessage(
      message: string,
      model: TiktokenModel = 'gpt-4o-mini' as TiktokenModel
   ): number {
      const encoding = encoding_for_model(model);
      const tokens = encoding.encode(message);
      encoding.free();
      return tokens.length;
   }

   /**
    * Get the token count for an array of messages.
    * @param messages The array of text messages to analyze.
    * @param model The model to use for tokenization.
    * @returns The total number of tokens in all messages.
    */
   static getTokenCountForMessages(
      messages: Message[],
      model: TiktokenModel = 'gpt-4o-mini' as TiktokenModel
   ): number {
      const encoding = encoding_for_model(model);
      let totalTokens = 0;
      for (const message of messages) {
         const tokens = encoding.encode(message.content);
         totalTokens += tokens.length;
      }
      encoding.free();
      return totalTokens;
   }

   /**
    * Chunk a text into smaller parts based on a maximum token limit.
    * @param text The text to chunk.
    * @param maxTokens The maximum number of tokens per chunk.
    * @param model The model to use for tokenization.
    * @returns An array of text chunks.
    * @author Oscar Kanangila
    */
   static chunkTextByTokens(
      text: string,
      chunkSize: number = 500,
      overlap: number = 50,
      model: TiktokenModel = 'text-embedding-3-small' as TiktokenModel
   ): string[] {
      const encoder = encoding_for_model(model);
      const tokens = encoder.encode(text);
      const chunks: string[] = [];
      for (let i = 0; i < tokens.length; i += chunkSize - overlap) {
         const chunkTokens = tokens.slice(i, i + chunkSize);
         const chunkText = new TextDecoder().decode(
            encoder.decode(chunkTokens)
         );
         chunks.push(chunkText);
      }
      encoder.free();
      return chunks;
   }
}
