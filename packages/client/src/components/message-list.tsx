import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export interface Message {
   id: string;
   content: string;
   sender: 'user' | 'ai';
   timestamp: Date;
}

interface MessageListProps {
   messages: Message[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
   if (messages.length === 0) {
      return null;
   }

   return (
      <div className="flex flex-col space-y-4 p-4 h-full overflow-y-auto">
         {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
         ))}
      </div>
   );
};

interface MessageBubbleProps {
   message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
   const isUser = message.sender === 'user';

   return (
      <div
         className={`flex ${isUser ? 'justify-end' : 'justify-start'} w-full`}
      >
         <div
            className={`max-w-sm sm:max-w-md lg:max-w-2xl xl:max-w-3xl px-4 py-2 rounded-lg ${
               isUser
                  ? 'bg-blue-500 text-white rounded-br-none'
                  : 'bg-gray-100 text-gray-900 rounded-bl-none'
            }`}
         >
            {isUser ? (
               // 💬 Texte simple pour le message utilisateur
               <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            ) : (
               // 🤖 Rendu Markdown pour les messages de l'IA
               <div className="prose prose-slate max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                     {message.content}
                  </ReactMarkdown>
               </div>
            )}

            <p
               className={`text-xs mt-1 ${
                  isUser ? 'text-blue-100' : 'text-gray-500'
               }`}
            >
               {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
               })}
            </p>
         </div>
      </div>
   );
};

export default MessageList;
