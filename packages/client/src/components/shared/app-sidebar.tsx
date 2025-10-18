import {
   Asterisk,
   DatabaseBackup,
   Edit,
   FileText,
   Folder,
   FolderHeart,
   MessageSquarePlus,
   Search,
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
import { SearchForm } from '../search-form';
import { cn } from '@/lib/utils';

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

                     <div className="group-data-[collapsible=icon]:block hidden">
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
                     </div>
                  </SidebarMenu>
               </SidebarGroupContent>
            </SidebarGroup>
         </SidebarContent>

         <SidebarFooter>
            {/* {user && (
          <NavUser
            user={{
              name: `${user.firstName} ${user.lastName}`.trim(),
              email: user.email,
              avatar: "",
            }}
          />
        )} */}
            Footer
         </SidebarFooter>
      </Sidebar>
   );
};
