<template>
  <div>
    <h1>Protected Index Page</h1>
		<NuxtLink to="/fv/search">Search</NuxtLink>
		<p>Current user: {{ authStore.user?.id }}, {{ authStore.user?.email }}, {{ authStore.user?.username }}</p>
  </div>
</template>

<script setup>
definePageMeta({
	middleware: 'auth',
	layout: 'protected',
});

const authStore = useAuthStore();
</script>