<template>
  <div>
    <h1>Protected Search Page</h1>
		<NuxtLink to="/fv">Home</NuxtLink>
  </div>
</template>

<script setup>
definePageMeta({
	middleware: 'auth',
});
</script>