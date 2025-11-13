import fs from 'fs';
import path from 'path';
import { TokensHelper } from '../utils/tokensHelper';
import { EmbeddingHelper } from '../utils/EmbeddingHelper';
import { DocumentRepository } from '../repositories/document.repository';
import { execSync } from 'child_process';
// @ts-ignore: pdfjs-dist/legacy/build/pdf has no bundled type declarations in this project
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';

/**
 * Convert PDF to text using pdftotext if available,
 * otherwise fallback to pdfjs-dist
 */
async function pdfToText(filePath: string): Promise<string> {
   const txtPath = filePath.replace(/\.pdf$/i, '.txt');

   // If the txt already exists, reuse it.
   if (fs.existsSync(txtPath)) {
      return fs.readFileSync(txtPath, 'utf-8');
   }

   // Try to use pdftotext
   try {
      execSync(`pdftotext "${filePath}" "${txtPath}"`);
      return fs.readFileSync(txtPath, 'utf-8');
   } catch {
      console.warn('pdftotext not available, using pdfjs-dist...');
   }

   // Fallback: pdfjs-dist
   try {
      const data = new Uint8Array(fs.readFileSync(filePath));
      const pdf = await pdfjsLib.getDocument({ data }).promise;

      let fullText = '';
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
         const page = await pdf.getPage(pageNum);
         const content = await page.getTextContent();
         const pageText = content.items
            .map((item: any) => item.str || '')
            .join(' ');
         fullText += pageText + '\n\n';
      }

      fs.writeFileSync(txtPath, fullText);
      return fullText;
   } catch (err) {
      console.error('Error parsing PDF with pdfjs-dist:', err);
      return '';
   }
}

class PrepareDocuments {
   private DOCUMENTS_DIR = path.join(__dirname, '../assets/documents');
   private documentRepository: DocumentRepository;

   constructor() {
      this.documentRepository = new DocumentRepository();
   }

   private cleanText(text: string): string {
      return text
         .replace(/\n+/g, '\n')
         .replace(/[ \t]+/g, ' ')
         .trim();
   }

   async extractTextFromFile(filePath: string): Promise<string> {
      const ext = path.extname(filePath).toLowerCase();
      if (ext === '.pdf') {
         return pdfToText(filePath);
      } else if (ext === '.md' || ext === '.txt') {
         return fs.readFileSync(filePath, 'utf-8');
      } else {
         console.warn(`Unsupported format: ${filePath}`);
         return '';
      }
   }

   async processDocument(fileName: string): Promise<number> {
      const filePath = path.join(this.DOCUMENTS_DIR, fileName);
      console.log(`📄 Processing: ${fileName}`);

      const rawText = await this.extractTextFromFile(filePath);
      if (!rawText) {
         console.warn(`⚠️  No text extracted from ${fileName}`);
         return 0;
      }

      const text = this.cleanText(rawText);
      const chunks = TokensHelper.chunkTextByTokens(
         text,
         500,
         50,
         'text-embedding-3-small'
      );
      console.log(`   → ${chunks.length} chunks created`);

      const docId = fileName.replace(/\.[^/.]+$/, '');
      fs.writeFileSync(path.join(this.DOCUMENTS_DIR, `${docId}.txt`), text);

      const BATCH_SIZE = 5;
      for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
         const batch = chunks.slice(i, i + BATCH_SIZE);
         const embeddings = await Promise.all(
            batch.map((chunk) =>
               EmbeddingHelper.generateEmbeddings(
                  chunk ?? '',
                  'text-embedding-3-small'
               )
            )
         );

         await Promise.all(
            embeddings.map((embedding, idx) =>
               this.documentRepository.storeDocumentChunk(
                  docId,
                  fileName,
                  i + idx,
                  batch[idx] ?? '',
                  embedding,
                  { source: fileName, totalChunks: chunks.length }
               )
            )
         );

         console.log(
            `   → Processed ${Math.min(i + BATCH_SIZE, chunks.length)}/${chunks.length}`
         );
      }

      console.log(`✅ ${fileName} completed\n`);
      return chunks.length;
   }

   async processAllDocuments(): Promise<void> {
      if (!fs.existsSync(this.DOCUMENTS_DIR)) {
         console.error(
            `❌ Documents directory not found: ${this.DOCUMENTS_DIR}`
         );
         return;
      }

      const files = fs.readdirSync(this.DOCUMENTS_DIR);
      if (files.length === 0) {
         console.log('📭 No documents found to process');
         return;
      }

      console.log(`📚 Found ${files.length} file(s) to process\n`);
      let totalChunks = 0;
      let processedFiles = 0;

      for (const file of files) {
         try {
            const chunksProcessed = await this.processDocument(file);
            totalChunks += chunksProcessed;
            processedFiles++;
         } catch (err) {
            console.error(`❌ Error processing ${file}:`, err);
         }
      }

      console.log('\n' + '='.repeat(50));
      console.log(`✅ Processing complete!`);
      console.log(`   Files processed: ${processedFiles}/${files.length}`);
      console.log(`   Total chunks stored: ${totalChunks}`);
      console.log('='.repeat(50));
   }
}

async function main() {
   const prepareDocuments = new PrepareDocuments();
   await prepareDocuments.processAllDocuments();
}

if (require.main === module) {
   main()
      .then(() => {
         console.log('\n🎉 All done!');
         process.exit(0);
      })
      .catch((error) => {
         console.error('\n💥 Fatal error:', error);
         process.exit(1);
      });
}

export { PrepareDocuments };
