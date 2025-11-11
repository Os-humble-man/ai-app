import { injectable } from 'inversify';
import { DocumentRepository } from '../repositories/document.repository';
import { EmbeddingHelper } from '../utils/EmbeddingHelper';
import { PrepareDocuments } from '../scripts/prepareDocuments';

/**
 * Service for document management and RAG (Retrieval Augmented Generation)
 * @author Oscar Kanangila
 */
@injectable()
export class DocumentService {
   private documentRepository: DocumentRepository;
   private prepareDocuments: PrepareDocuments;

   constructor() {
      this.documentRepository = new DocumentRepository();
      this.prepareDocuments = new PrepareDocuments();
   }

   /**
    * Process and index a single document
    * @param fileName - Name of the file in the documents directory
    * @returns Number of chunks processed
    */
   async processDocument(fileName: string): Promise<number> {
      return await this.prepareDocuments.processDocument(fileName);
   }

   /**
    * Process all documents in the documents directory
    */
   async processAllDocuments(): Promise<void> {
      return await this.prepareDocuments.processAllDocuments();
   }

   /**
    * Search for relevant document chunks based on a query
    * @param query - User's search query
    * @param limit - Maximum number of results to return
    * @returns Array of relevant document chunks with similarity scores
    */
   async searchDocuments(query: string, limit: number = 5) {
      // Generate embedding for the search query
      const queryEmbedding = await EmbeddingHelper.generateEmbeddings(
         query,
         'text-embedding-3-small'
      );

      // Find similar chunks
      const results = await this.documentRepository.findSimilarChunks(
         queryEmbedding,
         limit
      );

      return results;
   }

   /**
    * Get context for RAG from relevant documents
    * @param query - User's query
    * @param maxChunks - Maximum number of chunks to include
    * @returns Formatted context string for LLM
    */
   //    async getContextForQuery(
   //       query: string,
   //       maxChunks: number = 3
   //    ): Promise<string> {
   //       const relevantChunks = await this.searchDocuments(query, maxChunks);

   //       if (relevantChunks.length === 0) {
   //          return '';
   //       }

   //       // Format chunks as context
   //       const context = relevantChunks
   //          .map((chunk, index) => {
   //             return `[Document ${index + 1}: ${chunk.title}]\n${chunk.content}`;
   //          })
   //          .join('\n\n---\n\n');

   //       return context;
   //    }

   /**
    * Delete a document and all its chunks
    * @param docId - Document identifier
    * @returns Number of chunks deleted
    */
   async deleteDocument(docId: string): Promise<number> {
      const result = await this.documentRepository.deleteDocumentChunks(docId);
      return result.count;
   }

   /**
    * Get all chunks for a specific document
    * @param docId - Document identifier
    */
   async getDocumentChunks(docId: string) {
      return await this.documentRepository.getDocumentChunks(docId);
   }

   /**
    * Store a custom document chunk (for programmatic document creation)
    * @param docId - Document identifier
    * @param title - Document title
    * @param content - Text content
    * @param metadata - Optional metadata
    */
   async storeCustomChunk(
      docId: string,
      title: string,
      content: string,
      metadata?: Record<string, any>
   ) {
      // Generate embedding for the content
      const embedding = await EmbeddingHelper.generateEmbeddings(
         content,
         'text-embedding-3-small'
      );

      // Get the next chunk index for this document
      const existingChunks =
         await this.documentRepository.getDocumentChunks(docId);
      const chunkIndex = existingChunks.length;

      // Store the chunk
      return await this.documentRepository.storeDocumentChunk(
         docId,
         title,
         chunkIndex,
         content,
         embedding,
         metadata
      );
   }

   /**
    * Enhance a chat message with relevant document context (RAG)
    * @param userMessage - User's message
    * @param includeChunks - Number of relevant chunks to include
    * @returns Object with context and source citations
    */
   //    async enhanceMessageWithContext(
   //       userMessage: string,
   //       includeChunks: number = 3
   //    ): Promise<{
   //       context: string;
   //       sources: Array<{ title: string; docId: string; relevance: number }>;
   //    }> {
   //       const relevantChunks = await this.searchDocuments(
   //          userMessage,
   //          includeChunks
   //       );

   //       const context = relevantChunks.map((chunk) => chunk.content).join('\n\n');

   //       const sources = relevantChunks.map((chunk) => ({
   //          title: chunk.title,
   //          docId: chunk.docId,
   //          relevance: 1 - (chunk.distance || 0), // Convert distance to similarity score
   //       }));

   //       return { context, sources };
   //    }

   /**
    * Build a system prompt with document context for RAG
    * @param userQuery - User's query
    * @param baseSystemPrompt - Base system prompt
    * @param maxChunks - Maximum chunks to include
    * @returns Enhanced system prompt
    */
   //    async buildRAGSystemPrompt(
   //       userQuery: string,
   //       baseSystemPrompt: string = 'Tu es un assistant qui répond en te basant sur les documents fournis.',
   //       maxChunks: number = 3
   //    ): Promise<string> {
   //       const context = await this.getContextForQuery(userQuery, maxChunks);

   //       if (!context) {
   //          return baseSystemPrompt;
   //       }

   //       return `${baseSystemPrompt}

   // Utilise les informations suivantes pour répondre à la question de l'utilisateur :

   // ${context}

   // Instructions :
   // - Base ta réponse uniquement sur les informations fournies ci-dessus
   // - Si l'information n'est pas présente dans les documents, dis-le clairement
   // - Cite les sources quand c'est pertinent`;
   //    }
}
