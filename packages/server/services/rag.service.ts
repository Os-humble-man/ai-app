import { inject, injectable } from 'inversify';
import { EmbeddingHelper } from '../utils/EmbeddingHelper';
import { DocumentRepository } from '../repositories/document.repository';

@injectable()
export class RagService {
   constructor(
      @inject('DocumentRepository')
      private documentRepository: DocumentRepository
   ) {}

   static buildPrompt(userPrompt: string, contexts: string[]): string {
      const contextText = contexts
         .map((c, i) => `📄 Document ${i + 1}:\n${c}`)
         .join('\n\n');

      return `
            Voici la question de l’utilisateur :

            ❓ **Question :**
            ${userPrompt}

            ---

            Voici les extraits les plus pertinents issus des documents internes :

            ${contextText}

            ---

            🎯 **Ta mission :**
            - Utilise uniquement les informations des documents internes ci-dessus pour répondre.
            - Si l’information n’y figure pas, indique-le explicitement.
            - Si plusieurs documents se contredisent, précise les différences.
            - Structure ta réponse ainsi :
            1. Réponse directe et claire.
            2. Étapes ou explications principales (si applicable).
            3. Référence au document ou à la source interne.
            4. Citation : “Source : [Nom du document]”.

            Ne fais **aucune invention** et reste professionnel et concis.
`;
   }

   static getSystemPrompt(): string {
      return `
            Tu es **RAG Assistant**, un agent conversationnel interne développé par **Oscar Kanangila** pour **Kng Enterprise**.  
            Ta mission est d'aider les employés à trouver des informations précises, fiables et à jour issues de la documentation interne.

            Tu fonctionnes dans un environnement professionnel et confidentiel.  
            Tu dois toujours :
            - Utiliser uniquement les informations issues des documents internes fournis (procédures, fiches, guides, politiques RH, etc.).
            - Donner des réponses claires, structurées et utiles.
            - Citer la ou les sources internes.
            - Refuser de répondre si tu n’as pas d’information fiable.

            Règles principales :
            1. Si l’information existe dans les documents internes → réponds clairement, cite la source.
            2. Si tu ne trouves pas l’information → indique-le et suggère un service interne à contacter.
            3. Ne jamais inventer ni extrapoler.
            4. Si on te demande ton origine → tu as été créé par Oscar Kanangila pour Kng Enterprise.
            5. Évite tout contenu externe à l’entreprise (pas de données publiques, pas d’opinions).

            Structure attendue de réponse :
            1. **Réponse directe et concise**
            2. **Étapes ou explications synthétiques**
            3. **Lien ou référence interne**
            4. **Source** (titre du document, date, lien interne si applicable)

            Style :
            - Professionnel, bienveillant, accessible.
            - Langage fluide et simple.
            - Pas de répétition ni de contenu inutile.
`;
   }

   async answerWithContext(
      userPrompt: string
   ): Promise<{ context: string; sources: any[] }> {
      const queryEmbedding = await EmbeddingHelper.generateEmbeddings(
         userPrompt,
         'text-embedding-3-small'
      );

      const relevantChunks = await this.documentRepository.findSimilarChunks(
         queryEmbedding,
         5
      );

      const combined = Array.isArray(relevantChunks)
         ? relevantChunks
              .map((c: any) => c.text ?? c.content ?? JSON.stringify(c))
              .join('\n\n')
         : '';

      return {
         context: combined,
         sources: Array.isArray(relevantChunks) ? relevantChunks : [],
      };
   }

   // Legacy method for backward compatibility
   async getContext(userPrompt: string): Promise<string> {
      const result = await this.answerWithContext(userPrompt);
      return result.context;
   }
}
