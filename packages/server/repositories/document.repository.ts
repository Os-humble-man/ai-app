import { BaseRepository } from './base.repository';

class DocumentRepository extends BaseRepository {
   /**
    * Store a document chunk with its embedding in the database
    * @param docId - Document identifier
    * @param title - Document title/filename
    * @param chunkIndex - Index of the chunk
    * @param content - Text content of the chunk
    * @param embedding - Embedding vector as number array
    * @param metadata - Optional metadata about the document
    */
   async storeDocumentChunk(
      docId: string,
      title: string,
      chunkIndex: number,
      content: string,
      embedding: number[],
      metadata?: Record<string, any>
   ) {
      try {
         // Convert embedding array to Buffer for Bytes storage
         const embeddingBuffer = Buffer.from(
            new Float32Array(embedding).buffer
         );

         return await this.prisma.docVector.create({
            data: {
               docId,
               title,
               chunkIndex,
               content,
               metadata: metadata || {},
               embedding: embeddingBuffer,
            },
         });
      } catch (error) {
         console.error('Error storing document chunk:', error);
         throw error;
      }
   }

   /**
    * Store multiple document chunks in a transaction
    * @param chunks - Array of chunk data to store
    */
   async storeDocumentChunks(
      chunks: Array<{
         docId: string;
         title: string;
         chunkIndex: number;
         content: string;
         embedding: number[];
         metadata?: Record<string, any>;
      }>
   ) {
      return await this.withTransaction(async (tx) => {
         const results = [];
         for (const chunk of chunks) {
            const embeddingBuffer = Buffer.from(
               new Float32Array(chunk.embedding).buffer
            );

            const result = await tx.docVector.create({
               data: {
                  docId: chunk.docId,
                  title: chunk.title,
                  chunkIndex: chunk.chunkIndex,
                  content: chunk.content,
                  metadata: chunk.metadata || {},
                  embedding: embeddingBuffer,
               },
            });
            results.push(result);
         }
         return results;
      });
   }

   /**
    * Find similar document chunks based on embedding similarity
    * @param queryEmbedding - The query embedding vector
    * @param limit - Maximum number of results to return
    */
   //    async findSimilarChunks(queryEmbedding: number[], limit: number = 5) {
   //       // Note: This requires pgvector extension and raw SQL
   //       // For now, returning a placeholder - implement with raw query
   //       const queryBuffer = Buffer.from(
   //          new Float32Array(queryEmbedding).buffer
   //       );

   //       return await this.prisma.$queryRaw`
   //          SELECT id, "docId", title, "chunkIndex", content, metadata,
   //                 (embedding <=> ${queryBuffer}::vector) as distance
   //          FROM docs_vectors
   //          ORDER BY embedding <=> ${queryBuffer}::vector
   //          LIMIT ${limit}
   //       `;
   //    }

   /**
    * Delete all chunks for a specific document
    * @param docId - Document identifier
    */
   //    async deleteDocumentChunks(docId: string) {
   //       return await this.prisma.docVector.deleteMany({
   //          where: { docId },
   //       });
   //    }

   /**
    * Get all chunks for a specific document
    * @param docId - Document identifier
    */
   //    async getDocumentChunks(docId: string) {
   //       return await this.prisma.docVector.findMany({
   //          where: { docId },
   //          orderBy: { chunkIndex: 'asc' },
   //       });
   //    }
}

export { DocumentRepository };
