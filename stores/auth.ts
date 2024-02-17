import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    login(username: string, password: string) {
      // Simulate an API call to login
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (username && password) { // Simplified check
            this.token = 'fake-token'; // Simulate returned token
            localStorage.setItem('token', this.token);
            resolve(this.token);
          } else {
            reject('Invalid credentials');
          }
        }, 1000);
      });
    },
    logout() {
      this.token = null;
      localStorage.removeItem('token');
    },
    initializeStore() {
      const token = localStorage.getItem('token');
      if (token) {
        this.token = token;
      }
    },
  }
});
