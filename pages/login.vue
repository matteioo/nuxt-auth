<template>
  <div>
    <h1>Login Page</h1>
		
		<form @submit.prevent="login">
			<input v-model="username" type="text" placeholder="Username">
			<input v-model="password" type="password" placeholder="Password">
			<button type="submit">Login</button>
		</form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const router = useRouter();
const authStore = useAuthStore();

const login = async () => {
  try {
		console.log('username, password', username.value, password.value);
    await authStore.login(username.value, password.value);
    router.push('/fv');
  } catch (error) {
    alert(error); // Handle errors more gracefully in a real app
  }
};
</script>