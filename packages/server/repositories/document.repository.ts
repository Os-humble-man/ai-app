import { injectable } from 'inversify';
import { BaseRepository } from './base.repository';
import { createId } from '@paralleldrive/cuid2';

@injectable()
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
         const id = createId();
         const embeddingStr = `[${embedding.join(',')}]`;
         const metadataJson = JSON.stringify(metadata || {});
         const now = new Date();

         await this.prisma.$executeRaw`
            INSERT INTO docs_vectors (id, "docId", title, "chunkIndex", content, metadata, embedding, "createdAt", "updatedAt")
            VALUES (
               ${id},
               ${docId},
               ${title},
               ${chunkIndex},
               ${content},
               ${metadataJson}::jsonb,
               ${embeddingStr}::vector,
               ${now},
               ${now}
            )
         `;
         return { id, docId, title, chunkIndex };
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
      try {
         const results = [];
         const now = new Date();
         for (const chunk of chunks) {
            const id = createId();
            const vectorString = `[${chunk.embedding.join(',')}]`;
            const metadataJson = JSON.stringify(chunk.metadata || {});

            await this.prisma.$executeRaw`
               INSERT INTO docs_vectors (id, "docId", title, "chunkIndex", content, metadata, embedding, "createdAt", "updatedAt")
               VALUES (${id}, ${chunk.docId}, ${chunk.title}, ${chunk.chunkIndex}, ${chunk.content}, ${metadataJson}::jsonb, ${vectorString}::vector, ${now}, ${now})
            `;
            results.push({
               id,
               docId: chunk.docId,
               title: chunk.title,
               chunkIndex: chunk.chunkIndex,
            });
         }
         return results;
      } catch (error) {
         console.error('Error storing document chunks:', error);
         throw error;
      }
   }

   /**
    * Find similar document chunks based on embedding similarity
    * @param queryEmbedding - The query embedding vector
    * @param limit - Maximum number of results to return
    */
   async findSimilarChunks(queryEmbedding: number[], limit: number = 5) {
      try {
         // Convert the embedding array to a vector string format
         const vectorString = `[${queryEmbedding.join(',')}]`;

         return await this.prisma.$queryRaw`
            SELECT id, "docId", title, "chunkIndex", content, metadata,
                   (embedding <=> ${vectorString}::vector) as distance
            FROM docs_vectors
            ORDER BY embedding <=> ${vectorString}::vector
            LIMIT ${limit}
         `;
      } catch (error) {
         console.error('Error finding similar chunks:', error);
         throw error;
      }
   }

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
