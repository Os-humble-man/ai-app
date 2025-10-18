import React from 'react';

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
                  : 'bg-gray-200 text-gray-900 rounded-bl-none'
            }`}
         >
            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
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
