import {
   Asterisk,
   BadgeCheck,
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

const navigationItems = [
   {
      name: 'New chat',
      icon: MessageSquarePlus,
      hasCollapsableSection: false,
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
      name: 'Recent',
      icon: DatabaseBackup,
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
                     {navigationItems.map((item) => (
                        <SidebarMenuItem key={item.name}>
                           <SidebarMenuButton
                              asChild
                              className={cn(
                                 currentView === item.name.toLowerCase() &&
                                    'bg-accent'
                              )}
                              tooltip={item.name}
                           >
                              <p
                                 onClick={() =>
                                    onViewChange(item.name.toLowerCase())
                                 }
                              >
                                 <item.icon className="w-6 h-6" />
                                 <span className="group-data-[collapsible=icon]:hidden">
                                    {item.name}
                                 </span>
                              </p>
                           </SidebarMenuButton>
                        </SidebarMenuItem>
                     ))}
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
      </Sidebar>
   );
};
