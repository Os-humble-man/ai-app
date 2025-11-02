import apiClient from './apiClient';

export interface LoginCredentials {
   email: string;
   password: string;
}

export interface RegisterCredentials {
   email: string;
   password: string;
   name: string;
}

export interface AuthResponse {
   user: {
      id: string;
      email: string;
      name: string;
      avatarUrl?: string;
      emailVerified: boolean;
   };
   token: string;
}

export interface VerifyEmailResponse {
   success: boolean;
   message: string;
}

export const authApi = {
   /**
    * Login with email and password
    */
   login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
      return apiClient.post<AuthResponse>('/auth/login', credentials);
   },

   /**
    * Register a new user
    */
   register: async (
      credentials: RegisterCredentials
   ): Promise<AuthResponse> => {
      return apiClient.post<AuthResponse>('/auth/register', credentials);
   },

   /**
    * Verify email with token
    */
   verifyEmail: async (token: string): Promise<VerifyEmailResponse> => {
      return apiClient.get<VerifyEmailResponse>(
         `/auth/verify-email?token=${token}`
      );
   },

   /**
    * Get current authenticated user
    */
   me: async (): Promise<AuthResponse> => {
      return apiClient.get<AuthResponse>('/auth/me');
   },

   /**
    * Login with Google OAuth
    */
   loginWithGoogle: () => {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      window.location.href = `${apiUrl}/api/auth/google`;
   },

   /**
    * Login with GitHub OAuth
    */
   loginWithGithub: () => {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      window.location.href = `${apiUrl}/api/auth/github`;
   },

   /**
    * Logout (clear local storage and call backend to clear cookie)
    */
   logout: async (): Promise<{ success: boolean; message: string }> => {
      try {
         // Call backend to clear the cookie
         const response = await apiClient.post<{
            success: boolean;
            message: string;
         }>('/auth/logout', {});

         // Clear local storage
         localStorage.removeItem('auth-storage');
         sessionStorage.clear();

         return response;
      } catch (error) {
         // Even if backend call fails, clear local storage
         localStorage.removeItem('auth-storage');
         sessionStorage.clear();
         throw error;
      }
   },
};
