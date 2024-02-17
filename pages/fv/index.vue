<template>
  <div>
    <h1>Protected Index Page</h1>
		<NuxtLink to="/fv/search">Search</NuxtLink>
  </div>
</template>

<script setup>
definePageMeta({
	middleware: 'auth',
});
</script>