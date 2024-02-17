<template>
  <div>
    <h1>Protected Index Page</h1>
		<NuxtLink to="/fv/search">Search</NuxtLink>
		<button @click="logoutAndRedirect">Logout</button>
		<p>Current user: {{ authStore.user?.id }}, {{ authStore.user?.email }}, {{ authStore.user?.username }}</p>
  </div>
</template>

<script setup>
definePageMeta({
	middleware: 'auth',
});

const authStore = useAuthStore();
const router = useRouter();

const logoutAndRedirect = () => {
  authStore.logout();
  router.push('/login');
};
</script>