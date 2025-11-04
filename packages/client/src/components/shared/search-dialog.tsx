import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Search, MessageSquare, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Conversation {
   id: string;
   title: string;
   isFavorite: boolean;
   createdAt?: Date;
   updatedAt?: Date;
}

interface SearchDialogProps {
   open: boolean;
   onOpenChange: (open: boolean) => void;
   conversations: Conversation[];
   onSelectConversation: (conversationId: string) => void;
}

export const SearchDialog = ({
   open,
   onOpenChange,
   conversations,
   onSelectConversation,
}: SearchDialogProps) => {
   const [searchQuery, setSearchQuery] = useState('');
   const [filteredConversations, setFilteredConversations] = useState<
      Conversation[]
   >([]);

   useEffect(() => {
      if (!searchQuery.trim()) {
         setFilteredConversations([]);
         return;
      }

      const query = searchQuery.toLowerCase();
      const filtered = conversations.filter((conv) => {
         const title = conv.title?.toLowerCase() || 'untitled conversation';
         return title.includes(query);
      });

      setFilteredConversations(filtered);
   }, [searchQuery, conversations]);

   const handleSelectConversation = (conversationId: string) => {
      onSelectConversation(conversationId);
      setSearchQuery('');
      onOpenChange(false);
   };

   const handleClose = () => {
      setSearchQuery('');
      onOpenChange(false);
   };

   const formatDate = (date?: Date) => {
      if (!date) return '';
      const now = new Date();
      const conversationDate = new Date(date);
      const diffTime = Math.abs(now.getTime() - conversationDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) return 'Today';
      if (diffDays === 1) return 'Yesterday';
      if (diffDays < 7) return `${diffDays} days ago`;
      if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
      return conversationDate.toLocaleDateString();
   };

   return (
      <Dialog open={open} onOpenChange={handleClose}>
         <DialogContent className="sm:max-w-[600px] p-0">
            <DialogHeader className="px-6 pt-6 pb-4">
               <DialogTitle>Search Conversations</DialogTitle>
               <DialogDescription>
                  Search through all your conversations by title or content
               </DialogDescription>
            </DialogHeader>

            <div className="px-6 pb-4">
               <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     placeholder="Type to search..."
                     className="pl-9"
                     autoFocus
                  />
               </div>
            </div>

            <div className="max-h-[400px] overflow-y-auto border-t">
               {!searchQuery.trim() ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                     <Search className="h-12 w-12 text-muted-foreground/50 mb-4" />
                     <p className="text-sm text-muted-foreground">
                        Start typing to search your conversations
                     </p>
                  </div>
               ) : filteredConversations.length > 0 ? (
                  <div className="divide-y">
                     {filteredConversations.map((conv) => (
                        <button
                           key={conv.id}
                           onClick={() => handleSelectConversation(conv.id)}
                           className="w-full px-6 py-3 hover:bg-accent transition-colors text-left group"
                        >
                           <div className="flex items-start gap-3">
                              <MessageSquare className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                              <div className="flex-1 min-w-0">
                                 <p className="text-sm font-medium truncate group-hover:text-primary">
                                    {conv.title || 'Untitled conversation'}
                                 </p>
                                 {conv.updatedAt && (
                                    <div className="flex items-center gap-1 mt-1">
                                       <Clock className="h-3 w-3 text-muted-foreground" />
                                       <p className="text-xs text-muted-foreground">
                                          {formatDate(conv.updatedAt)}
                                       </p>
                                    </div>
                                 )}
                              </div>
                              {conv.isFavorite && (
                                 <span className="text-yellow-500 text-xs">
                                    ★
                                 </span>
                              )}
                           </div>
                        </button>
                     ))}
                  </div>
               ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                     <MessageSquare className="h-12 w-12 text-muted-foreground/50 mb-4" />
                     <p className="text-sm font-medium">No results found</p>
                     <p className="text-xs text-muted-foreground mt-1">
                        Try searching with different keywords
                     </p>
                  </div>
               )}
            </div>

            {searchQuery.trim() && filteredConversations.length > 0 && (
               <div className="border-t px-6 py-3 bg-muted/50">
                  <p className="text-xs text-muted-foreground">
                     {filteredConversations.length} result
                     {filteredConversations.length !== 1 ? 's' : ''} found
                  </p>
               </div>
            )}
         </DialogContent>
      </Dialog>
   );
};
