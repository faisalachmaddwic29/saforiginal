<template>
  <form class="flex flex-col min-dvh-screen px-4 py-5 relative" @submit="onSubmit">
    <h2 class="text-2xl md:text-3xl font-manrope font-extrabold mb-2.5 text-[#1E293B] dark:text-menu">Masuk</h2>
    <p class="text-xs md:text-sm mb-5 text-[#1E293B] dark:text-menu">Halo kak, silahkan masukkan detail akun untuk masuk</p>

    <!-- Form Login Password -->
    <div class="flex flex-col gap-5 mb-2.5">
      <div>
        <FormInput id="identifier" v-model="identifier" type="text" name="identifier" placeholder="Masukkan alamat email atau telepon" :error="errors.identifier" />
      </div>

      <div>
        <FormInput
          id="password"
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          name="password"
          placeholder="Masukan Password"
          :is-icon="true"
          icon-position="right"
          :error="errors.password"
        >
          <template #icon>
            <Icon v-if="showPassword" name="heroicons:eye" class="text-xl text-subtle cursor-pointer" @click="togglePassword" />
            <Icon v-else name="heroicons:eye-slash" class="text-xl text-subtle cursor-pointer" @click="togglePassword" />
          </template>
        </FormInput>
      </div>
    </div>

    <NuxtLink to="/forgot-password" class="mb-8 text-xs md:text-sm text-primary font-bold">Lupa password?</NuxtLink>

    <p class="text-xs md:text-sm text-[#1E293B] dark:text-menu">Belum punya akun? <NuxtLink to="/registration-password" class="text-primary font-bold pl-0.5">Daftar sekarang</NuxtLink></p>

    <div class="fixed w-full z-10 bottom-0 left-0 bg-background shadow-[0px_-2px_4px_rgba(0,0,0,0.05)]">
      <AppContainer class="p-4">
        <Button class="w-full" type="submit" :disabled="isLoading">{{ isLoading ? 'Loading...' : 'Masuk' }}</Button>
      </AppContainer>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import type { LoginPasswordRequest, LoginPasswordResponse } from '~/types/auth';
import { urlAuthLogin } from '~/constants';

const title = 'Login Password';

definePageMeta({
  layout: 'detail',
  middleware: 'guest',
  isPaddingTop: true,
  isPaddingBottom: true,
  title: title,
});

useSeoMeta({
  title: title,
});

const showPassword = ref(false);
const isLoading = ref(false);

// Schema validasi Zod (sama seperti sebelumnya)
const schema = z.object({
  identifier: z
    .string()
    .min(1, 'Email atau telepon harus diisi')
    .refine((val) => {
      const isEmail = val.includes('@');
      if (isEmail) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
      }
      return /^(\+62|62|0)[0-9]{9,13}$/.test(val.replace(/\s+/g, ''));
    }, 'Format email atau telepon tidak valid'),
  password: z.string().min(1, 'Password harus diisi'),
});

// Setup vee-validate dengan zod schema
const { defineField, handleSubmit, errors, setErrors } = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    identifier: '',
    password: '',
  },
});

// Define fields dengan vee-validate
const [identifier] = defineField('identifier');
const [password] = defineField('password');

// Toggle password
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const loadingStore = useLoadingStore();
const authStore = useAuthStore();

// Handle submit dengan vee-validate
const onSubmit = handleSubmit(async (values) => {
  loadingStore.start();
  isLoading.value = true;

  try {
    const response = await apiSaforiginal.post<LoginPasswordResponse, LoginPasswordRequest>(urlAuthLogin, {
      identifier: values.identifier,
      password: values.password,
    });

    const { data } = response;

    // Simpan token ke cookie dan state
    await authStore.saveToken({
      access_token: data.access_token,
      expires_in: data.expires_in,
      token_type: data.token_type,
    });

    console.log('Login response:', response);

    // Redirect setelah berhasil
    await navigateTo('/');
  } catch (error: any) {
    handleValidationError(error, setErrors);

    // Handle error (bisa tambahkan toast/notification)
  } finally {
    loadingStore.stop();
    isLoading.value = false;
  }
});
</script>
