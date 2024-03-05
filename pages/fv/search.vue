<template>
  <div>
    <h1>Protected Search Page</h1>
    <NuxtLink to="/fv">Home</NuxtLink>
    <p>Current user: {{ authStore.user?.username }}</p>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth',
  layout: 'protected',
});

const authStore = useAuthStore();
</script>