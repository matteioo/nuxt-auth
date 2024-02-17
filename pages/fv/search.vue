<template>
  <div>
    <h1>Protected Search Page</h1>
		<NuxtLink to="/fv">Home</NuxtLink>
		<button @click="logoutAndRedirect">Logout</button>
		<p>Current user: {{ authStore.user?.username }}</p>
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