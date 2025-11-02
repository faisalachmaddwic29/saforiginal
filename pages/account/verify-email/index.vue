<template>
  <form class="flex flex-col min-dvh-screen px-4 py-5 relative" @submit.prevent="onSubmit">
    <p class="text-xs md:text-base text-[#1E293B] dark:text-[#94A3B8]">Silahkan masukkan kode OTP yang telah kami kirimkan ke email anda</p>

    <div class="my-5">
      <FormOtp v-model="otp" :fields="6" :is-error="Boolean(errors.otp)" />

      <FormMessageError v-if="errors.otp" :message="errors.otp" class="justify-center" />
    </div>

    <p class="text-xs md:text-sm text-[#1E293B] dark:text-[#94A3B8]">Tidak menerima kode verifikasi? <span class="cursor-pointer text-primary font-bold pl-0.5" @click="sendOtp">Kirim ulang</span></p>

    <div class="fixed w-full z-10 bottom-0 left-0 bg-footer shadow-[0px_-2px_4px_rgba(0,0,0,0.05)]">
      <AppContainer class="p-4">
        <Button class="w-full" type="submit" :disabled="isLoading">{{ isLoading ? 'Loading...' : 'Verify' }}</Button>
      </AppContainer>
    </div>
  </form>
</template>

<script setup lang="ts">
import { z } from 'zod';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { urlAuthVerifyEmailConfirm, urlAuthVerifyEmailSend } from '~/constants';

const title = 'Verify Email';
definePageMeta({
  layout: 'detail',
  middleware: 'auth',
  isPaddingTop: true,
  isPaddingBottom: true,
  title: title,
});

useSeoMeta({
  title: title,
});

const isLoading = ref(false);
const router = useRouter();

// Schema validasi Zod - hanya required
const schema = z.object({
  otp: z.preprocess(
    (val) => String(val), // Konversi nilai ke string terlebih dahulu
    z.string().length(6, 'otp harus tepat 6 digit')
  ),
});

const { defineField, handleSubmit, errors, setErrors } = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    otp: '',
  },
});

// Define fields dengan vee-validate
const [otp] = defineField('otp');
const loadingStore = useLoadingStore();
const authStore = useAuthStore();

// Handle submit dengan vee-validate
const onSubmit = handleSubmit(async (values) => {
  loadingStore.start();
  isLoading.value = true;

  try {
    const response = await apiSaforiginal.post(urlAuthVerifyEmailConfirm, {
      otp: values.otp,
    });

    const { message } = response;
    notify.success(message);

    await authStore.getProfile();

    // Redirect setelah berhasil
    router.back();

    // Redirect setelah berhasil
    // await navigateTo('/');
  } catch (error: any) {
    handleValidationError(error, setErrors);

    // Handle error (bisa tambahkan toast/notification)
  } finally {
    loadingStore.stop();
    isLoading.value = false;
  }
});

const sendOtp = async (values: any) => {
  loadingStore.start();

  try {
    const response = await apiSaforiginal.post(urlAuthVerifyEmailSend, {
      otp: values.otp,
    });
    const { message } = response;

    notify.success(message);
  } catch (error: any) {
    handleValidationError(error, setErrors);

    // Handle error (bisa tambahkan toast/notification)
  } finally {
    loadingStore.stop();
  }
};
</script>
