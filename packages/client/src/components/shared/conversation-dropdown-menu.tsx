import {
   MoreVertical,
   Share2,
   Edit3,
   FolderInput,
   Heart,
   FileStack,
   Trash2,
   Plus,
   Folder,
   FileText,
} from 'lucide-react';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
   DropdownMenuSub,
   DropdownMenuSubContent,
   DropdownMenuSubTrigger,
   DropdownMenuPortal,
} from '../ui/dropdown-menu';
import { cn } from '@/lib/utils';
import type { Folder as FolderList } from '@/api/folder.api';
import { useMoveConversationToFolder } from '@/hooks/mutation/conversation.mutation';

interface Conversation {
   id: string;
   title: string;
   isFavorite: boolean;
}

interface ConversationDropdownMenuProps {
   conversation: Conversation;
   folders: FolderList[];
   onToggleFavorite: (
      e: React.MouseEvent,
      conversationId: string,
      isFavorite: boolean
   ) => void;
   onDelete: (e: React.MouseEvent, conversationId: string) => void;
   onCreateFolder: (e: React.MouseEvent) => void;
   userId?: string;
}

const templates = [
   { id: '1', name: 'Code Review' },
   { id: '2', name: 'Meeting Notes' },
   { id: '3', name: 'Bug Report' },
];

export const ConversationDropdownMenu = ({
   conversation,
   onToggleFavorite,
   onDelete,
   folders,
   onCreateFolder,
   userId,
}: ConversationDropdownMenuProps) => {
   const moveConversationMutation = useMoveConversationToFolder(userId);

   const handleMoveToFolder = (e: React.MouseEvent, folderId: string) => {
      e.stopPropagation();
      moveConversationMutation.mutate(
         { conversationId: conversation.id, folderId },
         {
            onSuccess: () => {
               console.log('Conversation moved to folder successfully');
            },
            onError: (error) => {
               console.error('Failed to move conversation:', error);
            },
         }
      );
   };

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <button className="p-1 rounded hover:bg-accent-foreground/10">
               <MoreVertical className="h-3 w-3" />
            </button>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="end" className="w-48">
            {/* Share */}
            <DropdownMenuItem
               onClick={(e) => {
                  e.stopPropagation();
                  // TODO: Implement share functionality
                  console.log('Share', conversation.id);
               }}
            >
               <Share2 className="h-4 w-4" />
               Share
            </DropdownMenuItem>

            {/* Rename */}
            <DropdownMenuItem
               onClick={(e) => {
                  e.stopPropagation();
                  // TODO: Implement rename functionality
                  console.log('Rename', conversation.id);
               }}
            >
               <Edit3 className="h-4 w-4" />
               Rename
            </DropdownMenuItem>

            {/* Move to folder - Submenu */}
            <DropdownMenuSub>
               <DropdownMenuSubTrigger>
                  <FolderInput className="h-4 w-4" />
                  <span>Move to folder</span>
               </DropdownMenuSubTrigger>
               <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                     <DropdownMenuItem
                        onClick={(e) => {
                           e.stopPropagation();
                           onCreateFolder(e);
                        }}
                        className="font-medium"
                     >
                        <Plus className="h-4 w-4" />
                        Create new folder
                     </DropdownMenuItem>
                     <DropdownMenuSeparator />
                     {folders.map((folder) => (
                        <DropdownMenuItem
                           key={folder.id}
                           onClick={(e) => handleMoveToFolder(e, folder.id)}
                        >
                           <Folder className="h-4 w-4" />
                           {folder.name}
                        </DropdownMenuItem>
                     ))}
                  </DropdownMenuSubContent>
               </DropdownMenuPortal>
            </DropdownMenuSub>

            {/* Toggle Favorite */}
            <DropdownMenuItem
               onClick={(e) =>
                  onToggleFavorite(e, conversation.id, conversation.isFavorite)
               }
            >
               <Heart
                  className={cn(
                     'h-4 w-4',
                     conversation.isFavorite && 'fill-current text-yellow-500'
                  )}
               />
               {conversation.isFavorite
                  ? 'Remove from favorites'
                  : 'Mark as favorite'}
            </DropdownMenuItem>

            {/* Add as template - Submenu */}
            <DropdownMenuSub>
               <DropdownMenuSubTrigger>
                  <FileStack className="h-4 w-4" />
                  <span>Add as template</span>
               </DropdownMenuSubTrigger>
               <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                     <DropdownMenuItem
                        onClick={(e) => {
                           e.stopPropagation();
                           // TODO: Implement create new template
                           console.log('Create new template', conversation.id);
                        }}
                        className="font-medium"
                     >
                        <Plus className="h-4 w-4" />
                        Create new template
                     </DropdownMenuItem>
                     <DropdownMenuSeparator />
                     {templates.map((template) => (
                        <DropdownMenuItem
                           key={template.id}
                           onClick={(e) => {
                              e.stopPropagation();
                              // TODO: Implement add to template
                              console.log(
                                 'Add to template',
                                 conversation.id,
                                 template.name
                              );
                           }}
                        >
                           <FileText className="h-4 w-4" />
                           {template.name}
                        </DropdownMenuItem>
                     ))}
                  </DropdownMenuSubContent>
               </DropdownMenuPortal>
            </DropdownMenuSub>

            <DropdownMenuSeparator />

            {/* Delete */}
            <DropdownMenuItem
               variant="destructive"
               onClick={(e) => onDelete(e, conversation.id)}
            >
               <Trash2 className="h-4 w-4" />
               Delete
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
};
