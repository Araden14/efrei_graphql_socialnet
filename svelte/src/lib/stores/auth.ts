import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Define the user type
type User = {
  id: string;
  username: string;
} | null;

// Create the auth store
function createAuthStore() {
  const { subscribe, set, update } = writable<{
    user: User;
    token: string | null;
    isAuthenticated: boolean;
  }>({
    user: null,
    token: browser ? localStorage.getItem('token') : null,
    isAuthenticated: browser ? !!localStorage.getItem('token') : false,
  });

  return {
    subscribe,
    login: (user: User, token: string) => {
      if (browser) {
        localStorage.setItem('token', token);
      }
      set({ user, token, isAuthenticated: true });
    },
    logout: () => {
      if (browser) {
        localStorage.removeItem('token');
      }
      set({ user: null, token: null, isAuthenticated: false });
    },
    // Initialize from token
    initFromToken: async (token: string) => {
      // Here you could verify the token with your API
      // For now, we'll just set it
      set({ user: null, token, isAuthenticated: true });
    }
  };
}

export const auth = createAuthStore(); 