import OpenAI from 'openai';

class EmbeddingHelper {
   private static openAiClient = new OpenAI({
      apiKey: process.env.OPENROUTER_API_KEY || '',
      baseURL: process.env.OPENROUTER_BASE_URL,
   });
   static async generateEmbeddings(
      text: string,
      model: string
   ): Promise<number[]> {
      if (!text || text.trim().length === 0) {
         throw new Error('Text cannot be empty');
      }

      try {
         const response = await this.openAiClient.embeddings.create({
            model,
            input: text,
         });
         const embedding = response.data?.[0]?.embedding;
         if (embedding === undefined) {
            throw new Error('No embedding returned from OpenAI');
         }
         return embedding;
      } catch (error) {
         console.error('Error generating embeddings:', error);
         throw error;
      }
   }
}

export { EmbeddingHelper };
