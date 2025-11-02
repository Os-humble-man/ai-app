import { lazy } from 'react';
import { createBrowserRouter } from 'react-router';
import { Suspense } from 'react';

import './App.css';
import Layout from './components/layout/main-layout';
import { ChatBox } from './components/chat-box';
import Load from './components/layout/load-wrapper';
import { OAuthCallbackPage } from './pages/oauth-callback-page';
import { ProtectedRoute } from './components/shared/protected-route';

const LoginPage = lazy(() => import('./pages/login-page'));
const RegisterPage = lazy(() => import('./pages/register-page'));

// function App() {
//    return (
//       <Layout>
//          <div className="flex flex-1 items-center justify-center">
//             <ChatBox />
//          </div>
//       </Layout>
//    );
// }
const AppRouter = createBrowserRouter([
   {
      path: '/',
      element: (
         <ProtectedRoute>
            <Layout>
               <Suspense fallback={<div>Loading chat...</div>}>
                  <ChatBox />
               </Suspense>
            </Layout>
         </ProtectedRoute>
      ),
   },
   {
      path: '/login',
      element: Load(<LoginPage />),
   },
   {
      path: '/register',
      element: Load(<RegisterPage />),
   },
   {
      path: '/oauth/callback',
      element: <OAuthCallbackPage />,
   },
]);

export default AppRouter;
