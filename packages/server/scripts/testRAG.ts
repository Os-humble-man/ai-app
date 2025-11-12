/**
 * Test Script for RAG Integration
 *
 * This script tests the RAG functionality by:
 * 1. Preparing sample documents
 * 2. Testing document search
 * 3. Testing RAG-enhanced chat
 */

import { RagService } from '../services/rag.service';
import { DocumentRepository } from '../repositories/document.repository';
import { EmbeddingHelper } from '../utils/EmbeddingHelper';

async function testRAGIntegration() {
   console.log('🧪 Starting RAG Integration Tests\n');

   // Initialize services
   const documentRepository = new DocumentRepository();
   const ragService = new RagService(documentRepository);

   // Test 1: Check if documents are indexed
   console.log('📊 Test 1: Checking indexed documents...');
   try {
      const testQuery = 'procedure';
      const embedding = await EmbeddingHelper.generateEmbeddings(
         testQuery,
         'text-embedding-3-small'
      );
      const results = await documentRepository.findSimilarChunks(embedding, 3);

      if (Array.isArray(results) && results.length > 0) {
         console.log(`✅ Found ${results.length} indexed documents`);
         results.forEach((doc: any, idx: number) => {
            console.log(
               `   ${idx + 1}. ${doc.title} (distance: ${doc.distance})`
            );
         });
      } else {
         console.log('⚠️  No documents found. Run prepare-docs first!');
      }
   } catch (error) {
      console.error('❌ Test 1 failed:', error);
   }

   console.log('\n' + '='.repeat(50) + '\n');

   // Test 2: Test RAG context retrieval
   console.log('📊 Test 2: Testing RAG context retrieval...');
   try {
      const userQuery = 'Comment demander des congés ?';
      const result = await ragService.answerWithContext(userQuery);

      console.log(`✅ Retrieved context (${result.context.length} chars)`);
      console.log(`✅ Found ${result.sources.length} relevant sources`);

      if (result.sources.length > 0) {
         console.log('\n📄 Sources:');
         result.sources.forEach((source: any, idx: number) => {
            console.log(
               `   ${idx + 1}. ${source.title} (chunk ${source.chunkIndex})`
            );
         });
      }

      console.log('\n📝 Context preview:');
      console.log(result.context.substring(0, 200) + '...\n');
   } catch (error) {
      console.error('❌ Test 2 failed:', error);
   }

   console.log('\n' + '='.repeat(50) + '\n');

   // Test 3: Test prompt building
   console.log('📊 Test 3: Testing prompt construction...');
   try {
      const userQuery = 'Quelle est la politique de sécurité ?';
      const contexts = [
         'La politique de sécurité exige que tous les employés utilisent des mots de passe forts.',
         'Les accès aux systèmes critiques doivent être approuvés par le manager.',
      ];

      const enhancedPrompt = RagService.buildPrompt(userQuery, contexts);

      console.log('✅ Enhanced prompt generated');
      console.log(`   Length: ${enhancedPrompt.length} characters`);
      console.log(
         `   Contains system instructions: ${enhancedPrompt.includes('agent conversationnel')}`
      );
      console.log(
         `   Contains user query: ${enhancedPrompt.includes(userQuery)}`
      );
      console.log(`   Contains context: ${enhancedPrompt.includes('Context')}`);
   } catch (error) {
      console.error('❌ Test 3 failed:', error);
   }

   console.log('\n' + '='.repeat(50) + '\n');

   // Test 4: Performance metrics
   console.log('📊 Test 4: Performance metrics...');
   try {
      const startTime = Date.now();

      const userQuery = 'Procédure de demande de congé';
      const result = await ragService.answerWithContext(userQuery);

      const endTime = Date.now();
      const duration = endTime - startTime;

      console.log(`✅ RAG retrieval completed in ${duration}ms`);

      if (duration < 500) {
         console.log('   🚀 Excellent performance!');
      } else if (duration < 1000) {
         console.log('   ✅ Good performance');
      } else {
         console.log('   ⚠️  Performance could be improved');
      }
   } catch (error) {
      console.error('❌ Test 4 failed:', error);
   }

   console.log('\n' + '='.repeat(50) + '\n');
   console.log('✅ All tests completed!\n');
}

// Run tests
if (require.main === module) {
   testRAGIntegration()
      .then(() => {
         console.log('🎉 Test suite finished successfully!');
         process.exit(0);
      })
      .catch((error) => {
         console.error('💥 Test suite failed:', error);
         process.exit(1);
      });
}

export { testRAGIntegration };
