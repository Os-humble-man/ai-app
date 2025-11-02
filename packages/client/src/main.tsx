import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ThemeProvider } from './components/shared/theme-provider.tsx';
import { RouterProvider } from 'react-router';
import AppRouter from './App.tsx';
import { AuthProvider } from './components/auth-provider.tsx';

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <ThemeProvider>
         <AuthProvider>
            <RouterProvider router={AppRouter} />
         </AuthProvider>
      </ThemeProvider>
   </StrictMode>
);
