<template>
  <div class="min-h-dvh container mx-auto flex flex-col items-center px-4">
    <header class="w-full flex justify-between py-2">
      <NuxtLink to="/fv" class="text-primary-900 dark:text-primary-100 text-xl flex items-center gap-x-2"><UIcon name="i-heroicons-scale" /><span>FV Jus</span></NuxtLink>
      <div class="font-medium">
        <UButton color="gray" variant="ghost" size="lg" to="/fv/search"><span>Suchen</span></UButton>
        <UButton color="gray" variant="ghost" size="lg" @click="logoutAndRedirect" icon="i-heroicons-arrow-right-start-on-rectangle" trailing>Logout</UButton>
      </div>
    </header>
    <div class="flex-grow w-full flex items-center justify-center">
      <slot></slot>
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
const router = useRouter();

const logoutAndRedirect = () => {
  authStore.logout();
  router.push('/login');
};
</script>