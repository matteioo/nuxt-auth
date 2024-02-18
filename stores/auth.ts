import { jwtDecode } from 'jwt-decode'

interface AuthState {
	user: User | null;
	token: string | null;
	refreshToken: string | null;
}

interface User {
	id: number;
	username: string;
	email: string;
}

interface TokenResponse {
	refresh: string;
	access: string;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => {
		return {
			user: null,
			token: null,
			refreshToken: null
		}
  },
  getters: {
		getTokenExpiration: (state): number | null => {
			if (!state.token || !state.refreshToken) {
				return null;
			}
		
			try {
				const decodedToken: any = jwtDecode(state.token);
				return decodedToken.exp;
			} catch (error) {
				console.error('Failed to decode token:', error);
			}
			return null;
		}
	},
  actions: {
    async login(username: string, password: string) {
			try {
				const response = await fetch('/api/auth/login', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ username, password }),
				});

				if (response.ok) {
					const tokenResponse: TokenResponse = await response.json();

					const authStore = useAuthStore();
					authStore.token = tokenResponse.access;
					authStore.refreshToken = tokenResponse.refresh;

					await authStore.fetchUser();
				} else {
					console.error('Login failed:', response.status);
				}
			} catch (error) {
				console.error('Login failed:', error);
			}
    },
		async fetchUser() {
			if (typeof window === 'undefined') return
			try {
				const response = await fetch('/api/auth/user', {
					method: 'GET',
					headers: {
						'Authorization': `Bearer ${this.token}`,
					},
				});

				if (response.ok) {
					const user: User = await response.json();
					this.user = user;
				} else {
					console.error('Failed to fetch user:', response.status);
				}
			} catch (error) {
				console.error('Failed to fetch user:', error);
			}
		},
    async initializeStore() {
      if (this.getTokenExpiration && this.getTokenExpiration > Date.now() / 1000 && this.refreshToken) {
				await this.fetchUser();
      } else {
				this.logout();
			}
    },
    logout() {
			this.user = null;
      this.token = null;
			this.refreshToken = null;
    },
  }
});