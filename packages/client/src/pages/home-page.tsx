import { useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';

export default function HomePage() {
   const { user, isLoading } = useAuth();

   useEffect(() => {
      if (!isLoading) {
         if (user) {
            window.location.href = '/chat';
         } else {
            window.location.href = '/login';
         }
      }
   }, [user, isLoading]);

   return (
      <div className="flex min-h-screen items-center justify-center bg-background">
         <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
      </div>
   );
}
