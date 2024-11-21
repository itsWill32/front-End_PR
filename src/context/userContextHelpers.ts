import { User } from './userTypes';

export const initializeUser = async (): Promise<{
  user: User | null;
  isAuthenticated: boolean;
}> => {
  try {
    const response = await fetch('https://athlete-band-api.integrador.xyz/profile', {
      method: 'GET',
      credentials: 'include',
    });

    if (response.ok) {
      const data = await response.json();
      return {
        user: {
          name: data.data.name,
          email: data.data.email,
          token: data.token || "",
          profilePicture: data.profilePicture || undefined,
        },
        isAuthenticated: true,
      };
    } else {
      return { user: null, isAuthenticated: false };
    }
  } catch (error) {
    console.error('Error al verificar sesión:', error);
    return { user: null, isAuthenticated: false };
  }
};
