<!-- pages//login.vue -->
<template>
  <div class="flex items-center justify-center min-h-screen p-8">
    <div class="rounded-xl shadow-[0px_4px_10px_rgba(0,0,0,0.1)] dark:bg-[#091122] p-3 md:p-5 w-full">
      <!-- Logo dan Judul -->
      <div class="text-center mb-6">
        <NuxtImg src="/images/logos/logo.svg" alt="Logo" class="h-[40px] mx-auto" />
      </div>

      <!-- Login Form Component -->
      <!-- <AuthPhoneLoginForm @success="handleLoginSuccess" @error="handleLoginError" /> -->
      <form class="space-y-5" @submit.prevent="onSubmit">
        <h2 class="text-center text-2xl md:text-3xl font-manrope font-extrabold mb-2.5 text-[#1E293B] dark:text-[#94A3B8]">Masuk</h2>
        <p class="text-center text-xs md:text-sm mb-5 text-[#1E293B] dark:text-[#94A3B8]">Silahkan masukkan nomor WhatsApp anda untuk masuk/daftar</p>

        <div>
          <FormInput id="phone" v-model="phone" type="text" name="phone" placeholder="Masukkan nomor WhatsApp, misal: 6281xxx" :is-number="true" :error="errors.phone" />
        </div>

        <div class="flex flex-col divide-y divide-[#D9D9D9]">
          <div class="pb-5">
            <Button class="w-full" type="submit" variant="default" :disabled="isLoading">{{ isLoading ? 'Loading...' : 'Masuk' }}</Button>
          </div>

          <div class="pt-5">
            <NuxtLink :to="{ path: '/login-password', query: $route.query }" class="inline-block w-full cursor-pointer">
              <Button class="w-full" type="button" variant="outline-primary">Masuk dengan password</Button>
            </NuxtLink>
          </div>
        </div>
      </form>

      <!-- Icon Tema -->
      <div class="absolute top-[62px] right-4">
        <AppToggleDarkMode size="lg" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import type { LoginPhoneRequest, LoginPhoneResponse } from '~/types/auth';
import { urlAuthLoginPhone } from '~/constants';

definePageMeta({
  layout: 'home',
  middleware: 'guest',
  isPaddingBottom: true,
});

useSeoMeta({
  title: 'Login',
});

const route = useRoute();
const isLoading = ref(false);

// Schema validasi Zod - hanya required
const schema = z.object({
  phone: z.string().min(1, 'Nomor WhatsApp harus diisi'),
});

// Setup vee-validate dengan zod schema
const { defineField, handleSubmit, errors, setErrors } = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    phone: '',
  },
});

const [phone] = defineField('phone');
const loadingStore = useLoadingStore();
const loginStore = useLoginStore();
const registrationStore = useRegistrationStore();

// Reset state saat halaman dimuat
onBeforeMount(() => {
  loginStore.reset();
  registrationStore.reset();
});

const onSubmit = handleSubmit(async (values) => {
  loadingStore.start();
  isLoading.value = true;

  try {
    const response = await apiSaforiginal.post<LoginPhoneResponse, LoginPhoneRequest>(urlAuthLoginPhone, {
      phone: values.phone,
    });
    const { data, message } = response;

    if (data?.is_registered ?? false) {
      // Redirect setelah berhasil
      loginStore.setPhone(values.phone);
      await navigateTo({
        path: '/otp',
        query: route.query, // ⬅️ bawa redirect dari login
      });
    } else {
      // Redirect setelah berhasil
      registrationStore.setPhone(values.phone);
      await navigateTo({
        path: '/registration',
        query: route.query, // ⬅️ bawa redirect dari login
      });
    }
    notify.success(message);
  } catch (error: any) {
    handleValidationError(error, setErrors);

    // Handle error (bisa tambahkan toast/notification)
  } finally {
    loadingStore.stop();
    isLoading.value = false;
  }
});
</script>
