import { useState } from 'react';
import { Textarea } from './ui/textarea';
import MessageList, { type Message } from './message-list';

export const ChatBox = () => {
   const [messages, setMessages] = useState<Message[]>([]);
   const [inputValue, setInputValue] = useState('');
   const [isLoading, setIsLoading] = useState(false);

   const handleSendMessage = async () => {
      if (!inputValue.trim() || isLoading) return;

      const newUserMessage: Message = {
         id: Date.now().toString(),
         content: inputValue.trim(),
         sender: 'user',
         timestamp: new Date(),
      };

      setMessages((prev) => [...prev, newUserMessage]);
      setInputValue('');
      setIsLoading(true);

      // Créer immédiatement un message AI vide pour le streaming
      const aiMessageId = (Date.now() + 1).toString();
      const initialAiMessage: Message = {
         id: aiMessageId,
         content: '',
         sender: 'ai',
         timestamp: new Date(),
      };
      setMessages((prev) => [...prev, initialAiMessage]);

      try {
         // Alternative avec fetch et ReadableStream
         const response = await fetch('/api/chat/stream', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               Accept: 'text/event-stream',
            },
            body: JSON.stringify({ prompt: newUserMessage.content }),
         });

         if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
         }

         const reader = response.body?.getReader();
         const decoder = new TextDecoder();

         if (!reader) {
            throw new Error('Impossible de lire la réponse');
         }

         let buffer = '';

         while (true) {
            const { value, done } = await reader.read();

            if (done) break;

            buffer += decoder.decode(value, { stream: true });

            // Traiter chaque ligne complète
            const lines = buffer.split('\n');
            buffer = lines.pop() || ''; // Garder la ligne incomplète

            for (const line of lines) {
               if (line.startsWith('data: ')) {
                  const data = line.slice(6); // Retirer "data: "

                  if (data.trim() === '') continue;

                  try {
                     const parsed = JSON.parse(data);

                     if (parsed.type === 'chunk') {
                        // Mettre à jour le message AI avec le nouveau contenu
                        setMessages((prev) =>
                           prev.map((msg) =>
                              msg.id === aiMessageId
                                 ? {
                                      ...msg,
                                      content: msg.content + parsed.content,
                                   }
                                 : msg
                           )
                        );
                     } else if (parsed.type === 'done') {
                        // Streaming terminé
                        setIsLoading(false);
                        break;
                     } else if (parsed.type === 'error') {
                        throw new Error(parsed.error);
                     }
                  } catch (parseError) {
                     console.error('Erreur de parsing:', parseError);
                  }
               }
            }
         }
      } catch (error) {
         console.error("Erreur lors de l'envoi du message:", error);

         // Remplacer le message AI vide par un message d'erreur
         setMessages((prev) =>
            prev.map((msg) =>
               msg.id === aiMessageId
                  ? {
                       ...msg,
                       content:
                          'Désolé, je ne peux pas répondre en ce moment. Veuillez réessayer plus tard.',
                    }
                  : msg
            )
         );
         setIsLoading(false);
      }
   };

   const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault();
         handleSendMessage();
      }
   };

   return (
      <div className="relative h-full max-w-6xl w-full mx-auto">
         <div className="absolute inset-0 pb-40 px-6 pt-6">
            {messages.length === 0 ? (
               <div className="flex flex-col items-center justify-center h-full">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-center mb-4">
                     Bonjour,
                     <br />
                     <span className="text-muted-foreground">
                        comment puis-je vous aider aujourd'hui ?
                     </span>
                  </h1>
               </div>
            ) : (
               <MessageList messages={messages} />
            )}
         </div>

         <div className="absolute bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-sm ">
            <div className="relative max-w-full">
               <Textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Tapez votre message ici..."
                  className="w-full h-32 resize-none rounded-2xl border border-gray-300 p-4 pr-14 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  disabled={isLoading}
               />
               <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="absolute bottom-6 right-3 p-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-full transition-colors"
               >
                  {isLoading ? (
                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     >
                        <path d="m22 2-7 20-4-9-9-4Z" />
                        <path d="M22 2 11 13" />
                     </svg>
                  )}
               </button>
            </div>
         </div>
      </div>
   );
};
