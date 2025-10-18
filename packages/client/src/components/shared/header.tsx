import {
   Asterisk,
   Bell,
   // Bell,
   Globe,
   Moon,
   Settings,
   Sun,
} from 'lucide-react';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
// import { useState } from "react";
// import NotificationModal from "../modals/NotificationModal";
// import UserMenu from "../layout/UserMenu";
// import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { useTheme } from './theme-provider';
import { useState } from 'react';

interface HeaderProps {
   currentView: string;
}

const chatbots = [
   { name: 'GPT-5', icon: '🤖' },
   { name: 'Claude Sonnet 4', icon: '🎭' },
   { name: 'Gemini', icon: '💎' },
   { name: 'Assistant', icon: <Asterisk className="h-4 w-4" /> },
];

export default function Header({ currentView }: HeaderProps) {
   const { setTheme, theme } = useTheme();
   const [selectedBot, setSelectedBot] = useState('GPT-5');
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   //   const [openNotifications, setOpenNotifications] = useState(false);

   return (
      <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
         <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6 py-2">
            <SidebarTrigger className="-ml-1" />
            <Separator
               orientation="vertical"
               className="mx-2 data-[orientation=vertical]:h-4"
            />
            <DropdownMenu>
               <DropdownMenuTrigger
                  asChild
                  className="border-1 border-border/50 bg-popover/90 backdrop-blur-md rounded-md w-[150px] px-3 py-1 hover:bg-popover hover:shadow-md transition"
               >
                  <Button variant="ghost" size="icon">
                     {selectedBot}{' '}
                     {chatbots.find((bot) => bot.name === selectedBot)?.icon}
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="end">
                  {chatbots.map((bot) => (
                     <DropdownMenuItem
                        key={bot.name}
                        onClick={() => setSelectedBot(bot.name)}
                     >
                        {bot.icon} {bot.name}
                     </DropdownMenuItem>
                  ))}
               </DropdownMenuContent>
            </DropdownMenu>
            <div className="ml-auto flex items-center gap-2">
               <div className="flex items-center gap-2">
                  <DropdownMenu>
                     <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                           {theme === 'light' ? (
                              <Sun className="w-5 h-5" />
                           ) : theme === 'dark' ? (
                              <Moon className="w-5 h-5" />
                           ) : (
                              <Settings className="w-5 h-5" />
                           )}
                        </Button>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent align="end">
                        <DropdownMenuItem
                           className="gap-2"
                           onClick={() => setTheme('light')}
                        >
                           <Sun className="w-4 h-4" /> Light
                        </DropdownMenuItem>
                        <DropdownMenuItem
                           className="gap-2"
                           onClick={() => setTheme('dark')}
                        >
                           <Moon className="w-4 h-4" /> Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem
                           className="gap-2"
                           onClick={() => setTheme('system')}
                        >
                           <Settings className="w-4 h-4" /> System
                        </DropdownMenuItem>
                     </DropdownMenuContent>
                  </DropdownMenu>

                  <Button
                     variant="ghost"
                     size="icon"
                     //   onClick={() => setOpenNotifications(true)}
                  >
                     <Bell className="w-5 h-5" />
                  </Button>

                  {/* <Select
              value={language}
              onValueChange={(value) => i18n.changeLanguage(value)}
            >
              <SelectTrigger className="w-auto border-0 bg-transparent p-2 h-auto">
                <Globe className="w-5 h-5" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select> */}
                  {/* <UserMenu /> */}
               </div>
            </div>
         </div>
         {/* <NotificationModal
        isOpen={openNotifications}
        setOpen={setOpenNotifications}
        notifications={[]}
      /> */}
      </header>
   );
}
