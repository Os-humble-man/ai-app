import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ThemeProvider } from './components/shared/theme-provider.tsx';
import { RouterProvider } from 'react-router';
import AppRouter from './App.tsx';
import { AuthProvider } from './components/auth-provider.tsx';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/react-query.ts';

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <ThemeProvider>
         <AuthProvider>
            <QueryClientProvider client={queryClient}>
               <RouterProvider router={AppRouter} />
            </QueryClientProvider>
         </AuthProvider>
      </ThemeProvider>
   </StrictMode>
);
