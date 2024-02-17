export default defineNuxtRouteMiddleware((to, from) => {
	const authStore = useAuthStore();

	if (!isTokenValid()) {
		return navigateTo('/login');
	}

	function isTokenValid(): boolean {
		if (authStore.user === null) {
			return false;
		}

		const tokenExpiration = authStore.getTokenExpiration ?? 0;

		return tokenExpiration > Date.now() / 1000;
	}
});