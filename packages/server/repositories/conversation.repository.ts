interface Message {
   role: 'user' | 'assistant';
   content: string;
}

const conversations = new Map<string, Message[]>();

export const conversationRepository = {
   getLastResponseId(conversationId: string): Message[] | undefined {
      return conversations.get(conversationId);
   },
   setLastResponseId(conversationId: string, messages: Message[]) {
      conversations.set(conversationId, messages);
   },
};
