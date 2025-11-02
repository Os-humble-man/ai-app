import { useState, useEffect, useCallback } from 'react';
import { useAuthStore } from '@/store/auth.store';
import {
   authApi,
   type LoginCredentials,
   type RegisterCredentials,
} from '@/api/auth.api';

export const useAuth = () => {
   const {
      user,
      token,
      isLoading,
      error,
      setUser,
      setToken,
      setLoading,
      setError,
   } = useAuthStore();
   const [isAuthenticated, setIsAuthenticated] = useState(false);

   useEffect(() => {
      const authenticated = !!user && !!token;
      console.log('Auth state changed:', { user, token, authenticated });
      setIsAuthenticated(authenticated);
   }, [user, token]);

   const login = useCallback(
      async (credentials: LoginCredentials) => {
         try {
            setLoading(true);
            setError(null);
            const response = await authApi.login(credentials);
            console.log('response', response);
            setUser(response.user);
            setToken(response.token);
            return response;
         } catch (err: any) {
            const errorMessage = err?.message || 'Login failed';
            setError(errorMessage);
            throw err;
         } finally {
            setLoading(false);
         }
      },
      [setUser, setToken, setLoading, setError]
   );

   const register = useCallback(
      async (credentials: RegisterCredentials) => {
         try {
            setLoading(true);
            setError(null);
            const response = await authApi.register(credentials);
            // Don't auto-login after registration, user needs to verify email
            return response;
         } catch (err: any) {
            const errorMessage = err?.message || 'Registration failed';
            setError(errorMessage);
            throw err;
         } finally {
            setLoading(false);
         }
      },
      [setLoading, setError]
   );

   const logout = useCallback(async () => {
      try {
         setLoading(true);
         // Call backend to clear cookie
         await authApi.logout();
         // Clear store
         setUser(null);
         setToken(null);
         // Redirect to login
         window.location.href = '/login';
      } catch (error) {
         console.error('Logout error:', error);
         // Clear store anyway
         setUser(null);
         setToken(null);
         // Redirect to login
         window.location.href = '/login';
      } finally {
         setLoading(false);
      }
   }, [setUser, setToken, setLoading]);

   const verifyEmail = useCallback(
      async (token: string) => {
         try {
            setLoading(true);
            setError(null);
            const response = await authApi.verifyEmail(token);
            return response;
         } catch (err: any) {
            const errorMessage = err?.message || 'Email verification failed';
            setError(errorMessage);
            throw err;
         } finally {
            setLoading(false);
         }
      },
      [setLoading, setError]
   );

   const fetchCurrentUser = useCallback(async () => {
      try {
         setLoading(true);
         const response = await authApi.me();
         setUser(response.user);
         setToken(response.token);
         return response.user;
      } catch (err: any) {
         // Token might be invalid
         setUser(null);
         setToken(null);
         throw err;
      } finally {
         setLoading(false);
      }
   }, [setUser, setToken, setLoading]);

   const loginWithGoogle = useCallback(() => {
      authApi.loginWithGoogle();
   }, []);

   const loginWithGithub = useCallback(() => {
      authApi.loginWithGithub();
   }, []);

   return {
      user,
      token,
      isLoading,
      error,
      isAuthenticated,
      login,
      register,
      logout,
      verifyEmail,
      fetchCurrentUser,
      loginWithGoogle,
      loginWithGithub,
   };
};
