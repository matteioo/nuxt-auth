<template>
  <div class="w-full max-w-80">
    <h1 class="font-semibold text-xl text-center text-primary-900 dark:text-primary-100 p-4">Login für FV-Mitglieder</h1>
    <UForm :validate="validate" :state="state" class="space-y-4" @submit="login">
      <UFormGroup label="Benutzername" name="username">
        <UInput v-model="state.username" type="text" />
      </UFormGroup>
  
      <UFormGroup label="Passwort" name="password">
        <UInput v-model="state.password" type="password" />
      </UFormGroup>
  
      <UButton type="submit" class="float-right">
        Anmelden
      </UButton>
    </UForm>
  </div>
</template>

<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const toast = useToast()

const router = useRouter()
const authStore = useAuthStore()

const state = reactive({
  username: '',
  password: '',
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.username) errors.push({ path: 'username', message: 'Username is required' })
  if (!state.password) errors.push({ path: 'password', message: 'Password is required' })
  return errors
}

async function login(event: FormSubmitEvent<any>) {
  try {
    await authStore.login(event.data.username, event.data.password);
    router.push('/fv');
  } catch (error) {
    if (error instanceof Error) {
      toast.add({
        title: error.message,
        icon: 'i-heroicons-exclamation-triangle',
        color: 'red',
      })
    }
  } finally {
    state.username = '';
    state.password = '';
  }
};
</script>