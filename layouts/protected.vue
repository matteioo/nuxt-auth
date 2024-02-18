<template>
	<div>This is a protected page.</div>
	<slot />
	<button @click="logoutAndRedirect">Logout</button>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
const router = useRouter();

const logoutAndRedirect = () => {
  authStore.logout();
  router.push('/login');
};
</script>