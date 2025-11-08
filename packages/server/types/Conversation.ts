export interface Message {
   role: 'user' | 'assistant';
   content: string;
   model_used?: string;
   token_count?: number;
}
