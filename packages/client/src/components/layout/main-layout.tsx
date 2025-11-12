import React, { useState } from 'react';
import { SidebarInset, SidebarProvider } from '../ui/sidebar';
// import Header from '../shared/Header';
import { AppSidebar } from '../shared/app-sidebar';
import Header from '../shared/header';
import { RagModeProvider, useRagMode } from '@/contexts/RagModeContext';

function LayoutContent({ children }: { children: React.ReactNode }) {
   const [currentView, setCurrentView] = useState('Dashboard');
   const [isOpen, setIsOpen] = useState(true);
   const { isRagMode, setIsRagMode } = useRagMode();

   return (
      <SidebarProvider
         defaultOpen={isOpen}
         open={isOpen}
         onOpenChange={setIsOpen}
      >
         <AppSidebar currentView={currentView} onViewChange={setCurrentView} />
         <SidebarInset className="min-w-0 overflow-hidden">
            <Header
               currentView={currentView}
               isRagMode={isRagMode}
               onRagModeChange={setIsRagMode}
            />
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0 min-w-0 overflow-hidden">
               {children}
            </div>
         </SidebarInset>
      </SidebarProvider>
   );
}

export default function Layout({ children }: { children: React.ReactNode }) {
   return (
      <RagModeProvider>
         <LayoutContent>{children}</LayoutContent>
      </RagModeProvider>
   );
}
