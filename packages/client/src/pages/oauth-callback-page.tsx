import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';

export function OAuthCallbackPage() {
   const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
      'loading'
   );
   const [message, setMessage] = useState('Processing authentication...');
   const { fetchCurrentUser } = useAuth();

   useEffect(() => {
      const handleCallback = async () => {
         try {
            // Wait a bit to ensure the cookie is set
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Fetch the current user to update the store
            await fetchCurrentUser();

            setStatus('success');
            setMessage('Authentication successful! Redirecting...');

            // Redirect to home page after 1 second
            setTimeout(() => {
               window.location.href = '/';
            }, 1000);
         } catch (error) {
            setStatus('error');
            setMessage('Authentication failed. Please try again.');

            // Redirect to login after 3 seconds
            setTimeout(() => {
               window.location.href = '/login';
            }, 3000);
         }
      };

      handleCallback();
   }, [fetchCurrentUser]);

   return (
      <div className="flex min-h-screen items-center justify-center bg-background">
         <div className="w-full max-w-md space-y-8 text-center">
            <div className="space-y-2">
               {status === 'loading' && (
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
               )}
               {status === 'success' && (
                  <svg
                     className="mx-auto h-16 w-16 text-green-500"
                     fill="none"
                     stroke="currentColor"
                     viewBox="0 0 24 24"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                     />
                  </svg>
               )}
               {status === 'error' && (
                  <svg
                     className="mx-auto h-16 w-16 text-red-500"
                     fill="none"
                     stroke="currentColor"
                     viewBox="0 0 24 24"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                     />
                  </svg>
               )}
            </div>
            <h2 className="text-2xl font-bold">{message}</h2>
         </div>
      </div>
   );
}
