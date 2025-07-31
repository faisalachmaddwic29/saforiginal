<template>
  <form class="flex flex-col min-dvh-screen px-4 py-5 relative" @submit.prevent="onSubmit">
    <h2 class="text-2xl md:text-3xl font-manrope font-extrabold mb-2.5 text-[#1E293B] dark:text-[#94A3B8]">Masuk</h2>
    <p class="text-xs md:text-base text-[#1E293B] dark:text-[#94A3B8]">Silahkan masukkan kode OTP yang telah kami kirimkan ke nomor WhatsApp anda</p>

    <div class="my-5">
      <FormOtp v-model="otp" :fields="6" :is-error="Boolean(errors.otp)" />

      <FormMessageError v-if="errors.otp" :message="errors.otp" class="justify-center" />
    </div>

    <p class="text-xs md:text-sm text-[#1E293B] dark:text-[#94A3B8]">Tidak menerima kode verifikasi? <span class="cursor-pointer text-primary font-bold pl-0.5" @click="sendOtp">Kirim ulang</span></p>

    <div class="fixed w-full z-10 bottom-0 left-0 bg-white dark:bg-[#0F172A] shadow-[0px_-2px_4px_rgba(0,0,0,0.05)]">
      <AppContainer class="p-4">
        <Button class="w-full" type="submit" :disabled="isLoading">{{ isLoading ? 'Loading...' : 'Masuk' }}</Button>
      </AppContainer>
    </div>
  </form>
</template>

<script setup lang="ts">
import { z } from 'zod';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import type { LoginPhoneOtpRequest, LoginPhoneOtpResponse, LoginPhoneRequest, LoginPhoneResponse } from '~/types/auth';
import type { PreferenceItem, PreferencesResponse } from '~/types/api/preferences';

definePageMeta({
  layout: 'detail',
  middleware: 'guest',
});

useSeoMeta({
  title: 'Login',
});

// Di script setup
const router = useRouter();

onMounted(() => {
  if (!loginStore.phone) {
    // Balik ke halaman sebelumnya
    if (history.length > 1) {
      router.back();
    } else {
      // Kalau ga ada history, ke register
      navigateTo('/login');
    }
  }
});

const isLoading = ref(false);

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
const loginStore = useLoginStore();
const authStore = useAuthStore();
const preferences = ref<PreferenceItem[]>([]);

const getPreferenceOptions = async () => {
  try {
    const response = await apiSaforiginal.get<PreferencesResponse>('/v1/preferences');
    const data = response?.data?.preferences ?? [];
    if (data) {
      preferences.value = data;
    } else {
      preferences.value = [];
    }
  } catch (error: any) {
    handleValidationError(error, setErrors);

    // Handle error (bisa tambahkan toast/notification)
  }
};

// Handle submit dengan vee-validate
const onSubmit = handleSubmit(async (values) => {
  loadingStore.start();
  isLoading.value = true;

  try {
    const response = await apiSaforiginal.post<LoginPhoneOtpResponse, LoginPhoneOtpRequest>('/auth/login/otp', {
      phone: loginStore.phone,
      otp: values.otp,
    });

    const { data } = response;

    // Simpan token ke cookie dan state
    await authStore.saveToken({
      access_token: data.access_token,
      expires_in: data.expires_in,
      token_type: data.token_type,
    });

    // // Redirect ke halaman berikutnya
    loginStore.reset();
    await getPreferenceOptions();

    // check apakah sudah ada preferences
    if (preferences.value.length <= 0) {
      navigateTo('/preferences', { replace: true });
    } else {
      navigateTo('/', { replace: true });
    }
  } catch (error: any) {
    handleValidationError(error, setErrors);

    // Handle error (bisa tambahkan toast/notification)
  } finally {
    loadingStore.stop();
    isLoading.value = false;
  }
});

const sendOtp = async () => {
  loadingStore.start();

  try {
    const response = await apiSaforiginal.post<LoginPhoneResponse, LoginPhoneRequest>('/auth/login/phone', {
      phone: loginStore.phone,
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
