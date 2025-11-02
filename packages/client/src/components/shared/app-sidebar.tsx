import {
   Asterisk,
   BadgeCheck,
   ChevronRight,
   ChevronsUpDown,
   DatabaseBackup,
   // Edit,
   FileText,
   Folder,
   FolderHeart,
   LogOut,
   MessageSquarePlus,
   Search,
   Lock,
   Star,
   Trash2,
} from 'lucide-react';
import {
   Sidebar,
   SidebarContent,
   SidebarFooter,
   SidebarGroup,
   SidebarGroupContent,
   SidebarHeader,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
} from '../ui/sidebar';
// import { SearchForm } from '../search-form';
import { cn } from '@/lib/utils';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useAuthStore } from '@/store/auth.store';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/hooks/use-auth';
import { useState } from 'react';
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
} from '../ui/alert-dialog';
import {
   Collapsible,
   CollapsibleContent,
   CollapsibleTrigger,
} from '@/components/ui/collapsible';

import { useConversations } from '@/hooks/queries/conversation.queries';
import { useNavigate } from 'react-router';
import {
   useToggleFavorite,
   useDeleteConversation,
} from '@/hooks/mutation/conversation.mutation';

const navigationItems = [
   {
      name: 'New chat',
      icon: MessageSquarePlus,
      hasCollapsableSection: false,
   },
   {
      name: 'Recent',
      icon: DatabaseBackup,
      hasCollapsableSection: true,
   },
   {
      name: 'Search chat',
      icon: Search,
      hasCollapsableSection: false,
   },
   {
      name: 'Favorites',
      icon: FolderHeart,
      hasCollapsableSection: true,
   },
   {
      name: 'Folders',
      icon: Folder,
      hasCollapsableSection: true,
   },
   {
      name: 'Templates',
      icon: FileText,
      hasCollapsableSection: true,
   },
];

export const AppSidebar = ({
   currentView,
   onViewChange,
}: {
   currentView: string;
   onViewChange: (view: string) => void;
}) => {
   // Sidebar implementation
   const { user } = useAuthStore();
   const { logout } = useAuth();
   const isMobile = useIsMobile();
   const [showLogoutDialog, setShowLogoutDialog] = useState(false);
   const [showDeleteDialog, setShowDeleteDialog] = useState(false);
   const [conversationToDelete, setConversationToDelete] = useState<
      string | null
   >(null);
   const navigation = useNavigate();
   const [openSections, setOpenSections] = useState<Record<string, boolean>>({
      recent: false,
      favorites: false,
      folders: false,
      templates: false,
   });
   const { data: conversations, isLoading: isConversationsLoading } =
      useConversations(user?.id);
   const toggleFavoriteMutation = useToggleFavorite(user?.id);
   const deleteConversationMutation = useDeleteConversation(user?.id);

   const userInitials = user?.name
      ? user.name
           .split(' ')
           .map((n) => n[0])
           .slice(0, 2)
           .join('')
           .toUpperCase()
      : '';

   const handleLogoutClick = () => {
      setShowLogoutDialog(true);
   };

   const handleLogoutConfirm = async () => {
      setShowLogoutDialog(false);
      await logout();
   };

   const handleLogoutCancel = () => {
      setShowLogoutDialog(false);
   };

   const handleSelectConversation = (conversationId: string) => {
      // Handle conversation selection logic here
      console.log('Selected conversation ID:', conversationId);
      navigation(`/chat/${conversationId}`);
   };

   const handleToggleFavorite = (
      e: React.MouseEvent,
      conversationId: string,
      isFavorite: boolean
   ) => {
      e.stopPropagation(); // Empêcher la navigation
      toggleFavoriteMutation.mutate({
         conversationId,
         isFavorite: !isFavorite,
      });
   };

   const handleDeleteConversation = (
      e: React.MouseEvent,
      conversationId: string
   ) => {
      e.stopPropagation(); // Empêcher la navigation
      setConversationToDelete(conversationId);
      setShowDeleteDialog(true);
   };

   const handleDeleteConfirm = () => {
      if (conversationToDelete) {
         deleteConversationMutation.mutate(conversationToDelete);
         setShowDeleteDialog(false);
         setConversationToDelete(null);
      }
   };

   const handleDeleteCancel = () => {
      setShowDeleteDialog(false);
      setConversationToDelete(null);
   };

   return (
      <Sidebar collapsible="icon">
         <SidebarHeader>
            <SidebarMenuButton
               size="lg"
               className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground "
            >
               <div className="flex items-center gap-2">
                  <div className="grid h-7 w-7 place-items-center rounded-md bg-blue-500 text-white shadow-sm dark:from-zinc-200 dark:to-zinc-300 dark:text-zinc-900">
                     <Asterisk className="h-4 w-4" />
                  </div>
                  <div className="text-sm font-semibold tracking-tight">
                     AI Assistant
                  </div>
               </div>
            </SidebarMenuButton>
         </SidebarHeader>
         <SidebarContent>
            <SidebarGroup>
               <SidebarGroupContent>
                  <SidebarMenu>
                     {navigationItems.map((item) => {
                        const sectionKey = item.name.toLowerCase();
                        const isOpen = openSections[sectionKey];

                        if (item.hasCollapsableSection) {
                           return (
                              <Collapsible
                                 key={item.name}
                                 open={isOpen}
                                 onOpenChange={(open) =>
                                    setOpenSections((prev) => ({
                                       ...prev,
                                       [sectionKey]: open,
                                    }))
                                 }
                                 className="group/collapsible"
                              >
                                 <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                       <SidebarMenuButton
                                          className={cn(
                                             currentView === sectionKey &&
                                                'bg-accent'
                                          )}
                                          tooltip={item.name}
                                       >
                                          <item.icon className="w-6 h-6" />
                                          <span className="group-data-[collapsible=icon]:hidden">
                                             {item.name}
                                          </span>
                                          <ChevronRight
                                             className={cn(
                                                'ml-auto h-4 w-4 transition-transform duration-200 group-data-[collapsible=icon]:hidden',
                                                isOpen && 'rotate-90'
                                             )}
                                          />
                                       </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                       <div className="pl-8 pr-2 py-1 text-sm text-muted-foreground group-data-[collapsible=icon]:hidden">
                                          {sectionKey === 'recent' ? (
                                             isConversationsLoading ? (
                                                <p className="text-xs py-2">
                                                   Loading...
                                                </p>
                                             ) : conversations &&
                                               conversations.length > 0 ? (
                                                <div className="space-y-1">
                                                   {conversations
                                                      .slice(0, 5)
                                                      .map((conv) => (
                                                         <div
                                                            key={conv.id}
                                                            className="group/item flex items-center gap-1 w-full px-2 py-1.5 rounded-md hover:bg-accent transition-colors"
                                                         >
                                                            <button
                                                               className="flex-1 text-left text-xs truncate"
                                                               onClick={() =>
                                                                  handleSelectConversation(
                                                                     conv.id
                                                                  )
                                                               }
                                                            >
                                                               {conv.title ||
                                                                  'Untitled conversation'}
                                                            </button>
                                                            <div className="flex items-center gap-1 opacity-0 group-hover/item:opacity-100 transition-opacity">
                                                               <button
                                                                  onClick={(
                                                                     e
                                                                  ) =>
                                                                     handleToggleFavorite(
                                                                        e,
                                                                        conv.id,
                                                                        conv.isFavorite
                                                                     )
                                                                  }
                                                                  className={cn(
                                                                     'p-1 rounded hover:bg-accent-foreground/10',
                                                                     conv.isFavorite &&
                                                                        'text-yellow-500'
                                                                  )}
                                                                  title={
                                                                     conv.isFavorite
                                                                        ? 'Remove from favorites'
                                                                        : 'Add to favorites'
                                                                  }
                                                               >
                                                                  <Star
                                                                     className={cn(
                                                                        'h-3 w-3',
                                                                        conv.isFavorite &&
                                                                           'fill-current'
                                                                     )}
                                                                  />
                                                               </button>
                                                               <button
                                                                  onClick={(
                                                                     e
                                                                  ) =>
                                                                     handleDeleteConversation(
                                                                        e,
                                                                        conv.id
                                                                     )
                                                                  }
                                                                  className="p-1 rounded hover:bg-destructive/10 hover:text-destructive"
                                                                  title="Delete conversation"
                                                               >
                                                                  <Trash2 className="h-3 w-3" />
                                                               </button>
                                                            </div>
                                                         </div>
                                                      ))}
                                                </div>
                                             ) : (
                                                <p className="text-xs py-2">
                                                   No conversations yet
                                                </p>
                                             )
                                          ) : (
                                             <p className="text-xs py-2">
                                                No items yet
                                             </p>
                                          )}
                                       </div>
                                    </CollapsibleContent>
                                 </SidebarMenuItem>
                              </Collapsible>
                           );
                        }

                        return (
                           <SidebarMenuItem key={item.name}>
                              <SidebarMenuButton
                                 asChild
                                 className={cn(
                                    currentView === sectionKey && 'bg-accent'
                                 )}
                                 tooltip={item.name}
                              >
                                 <p
                                    onClick={() => {
                                       if (sectionKey === 'new chat') {
                                          navigation('/');
                                       } else {
                                          onViewChange(sectionKey);
                                       }
                                    }}
                                 >
                                    <item.icon className="w-6 h-6" />
                                    <span className="group-data-[collapsible=icon]:hidden">
                                       {item.name}
                                    </span>
                                 </p>
                              </SidebarMenuButton>
                           </SidebarMenuItem>
                        );
                     })}
                  </SidebarMenu>
               </SidebarGroupContent>
            </SidebarGroup>
         </SidebarContent>

         <SidebarFooter>
            {user && (
               <SidebarMenu>
                  <SidebarMenuItem>
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                           <SidebarMenuButton
                              size="lg"
                              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                           >
                              <Avatar className="h-8 w-8 rounded-lg">
                                 <AvatarImage
                                    src={user.avatarUrl}
                                    alt={user.name}
                                 />
                                 <AvatarFallback className="rounded-lg">
                                    {userInitials}
                                 </AvatarFallback>
                              </Avatar>
                              <div className="grid flex-1 text-left text-sm leading-tight">
                                 <span className="truncate font-medium">
                                    {user.name}
                                 </span>
                                 <span className="truncate text-xs">
                                    {user.email}
                                 </span>
                              </div>
                              <ChevronsUpDown className="ml-auto size-4" />
                           </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                           className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                           side={isMobile ? 'bottom' : 'right'}
                           align="end"
                           sideOffset={4}
                        >
                           <DropdownMenuLabel className="p-0 font-normal">
                              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                 <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage
                                       src={user.avatarUrl}
                                       alt={user.name}
                                    />
                                    <AvatarFallback className="rounded-lg">
                                       {userInitials}
                                    </AvatarFallback>
                                 </Avatar>
                                 <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">
                                       {user.name}
                                    </span>
                                    <span className="truncate text-xs">
                                       {user.email}
                                    </span>
                                 </div>
                              </div>
                           </DropdownMenuLabel>
                           <DropdownMenuSeparator />
                           <DropdownMenuGroup>
                              <DropdownMenuItem>
                                 <BadgeCheck />
                                 Account
                              </DropdownMenuItem>
                              <DropdownMenuItem
                              // onClick={() => navigate('/change-password')}
                              >
                                 <Lock />
                                 Change Password
                              </DropdownMenuItem>
                           </DropdownMenuGroup>
                           <DropdownMenuSeparator />
                           <DropdownMenuItem
                              variant="destructive"
                              onClick={handleLogoutClick}
                           >
                              <LogOut />
                              Log out
                           </DropdownMenuItem>
                        </DropdownMenuContent>
                     </DropdownMenu>
                  </SidebarMenuItem>
               </SidebarMenu>
            )}
         </SidebarFooter>

         {/* Logout Confirmation Dialog */}
         <AlertDialog
            open={showLogoutDialog}
            onOpenChange={setShowLogoutDialog}
         >
            <AlertDialogContent>
               <AlertDialogHeader>
                  <AlertDialogTitle>
                     Are you sure you want to logout?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                     You will be logged out of your account and redirected to
                     the login page.
                  </AlertDialogDescription>
               </AlertDialogHeader>
               <AlertDialogFooter>
                  <AlertDialogCancel onClick={handleLogoutCancel}>
                     Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction onClick={handleLogoutConfirm}>
                     Logout
                  </AlertDialogAction>
               </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialog>

         {/* Delete Confirmation Dialog */}
         <AlertDialog
            open={showDeleteDialog}
            onOpenChange={setShowDeleteDialog}
         >
            <AlertDialogContent>
               <AlertDialogHeader>
                  <AlertDialogTitle>Delete conversation?</AlertDialogTitle>
                  <AlertDialogDescription>
                     This action cannot be undone. This will permanently delete
                     the conversation and all its messages.
                  </AlertDialogDescription>
               </AlertDialogHeader>
               <AlertDialogFooter>
                  <AlertDialogCancel onClick={handleDeleteCancel}>
                     Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                     onClick={handleDeleteConfirm}
                     className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                     Delete
                  </AlertDialogAction>
               </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialog>
      </Sidebar>
   );
};
