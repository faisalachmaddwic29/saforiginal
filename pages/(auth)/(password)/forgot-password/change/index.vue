<template>
  <form class="flex flex-col min-dvh-screen px-4 py-5 relative" @submit.prevent="onSubmit">
    <p class="text-xs md:text-base text-[#1E293B] dark:text-[#94A3B8]">Silahkan masukkan kode OTP yang telah kami kirimkan ke nomor WhatsApp / Email anda</p>

    <div class="my-5">
      <FormOtp v-model="otp" :fields="6" :is-error="Boolean(errors.otp)" />

      <FormMessageError v-if="errors.otp" :message="errors.otp" class="justify-center" />

      <p class="mt-2 text-xs md:text-sm text-[#1E293B] dark:text-[#94A3B8]">
        Tidak menerima kode verifikasi? <span class="cursor-pointer text-primary font-bold pl-0.5" @click="sendOtp">Kirim ulang</span>
      </p>

      <div class="flex flex-col gap-5 mt-8">
        <p class="text-xs md:text-base text-[#1E293B] dark:text-[#94A3B8]">Silakan masukan password baru</p>

        <FormInput
          id="password"
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          name="password"
          placeholder="Masukkan password baru (min 8 karakter)"
          label-text="Password Baru"
          :is-icon="true"
          icon-position="right"
          :error="errors.password"
        >
          <template #icon>
            <Icon v-if="showPassword" name="heroicons:eye" class="text-xl text-subtle cursor-pointer" @click="togglePassword" />
            <Icon v-else name="heroicons:eye-slash" class="text-xl text-subtle cursor-pointer" @click="togglePassword" />
          </template>
        </FormInput>

        <FormInput
          id="password_confirmation"
          v-model="password_confirmation"
          :type="confirmshowPassword ? 'text' : 'password'"
          name="password_confirmation"
          placeholder="Masukan konfirmasi password baru"
          :is-icon="true"
          icon-position="right"
          label-text="Konfirmasi password baru"
          :error="errors.password_confirmation"
        >
          <template #icon>
            <Icon v-if="confirmshowPassword" name="heroicons:eye" class="text-xl text-subtle cursor-pointer" @click="toggleConfirmPassword" />
            <Icon v-else name="heroicons:eye-slash" class="text-xl text-subtle cursor-pointer" @click="toggleConfirmPassword" />
          </template>
        </FormInput>
      </div>
    </div>

    <div class="fixed w-full z-10 bottom-0 left-0 bg-footer shadow-[0px_-2px_4px_rgba(0,0,0,0.05)]">
      <AppContainer class="p-4">
        <Button class="w-full" type="submit" :disabled="isLoading">{{ isLoading ? 'Loading...' : 'Simpan Perubahan' }}</Button>
      </AppContainer>
    </div>
  </form>
</template>

<script setup lang="ts">
import { z } from 'zod';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { urlAuthForgotPassword, urlAuthResetPassword } from '~/constants';

const title = 'Ubah Password';

definePageMeta({
  layout: 'detail',
  isPaddingTop: true,
  isPaddingBottom: true,
  title: title,
});

useSeoMeta({
  title: title,
});

// Di script setup
const router = useRouter();

onMounted(() => {
  if (!forgotPasswordStore.identifier) {
    // Balik ke halaman sebelumnya
    if (history.length > 1) {
      router.back();
    } else {
      // Kalau ga ada history, ke register
      navigateTo('/forgot-password');
    }
  }
});

const isLoading = ref(false);
const showPassword = ref(false);
const confirmshowPassword = ref(false);

// Schema validasi Zod - hanya required
const schema = z
  .object({
    otp: z.preprocess(
      (val) => String(val), // Konversi nilai ke string terlebih dahulu
      z.string().length(6, 'otp harus tepat 6 digit')
    ),
    password: z.string().min(1, 'Password harus diisi').min(8, 'Password minimal 8 karakter'),
    // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password harus mengandung huruf besar, huruf kecil, dan angka'),

    password_confirmation: z.string().min(1, 'Konfirmasi password harus diisi'),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Konfirmasi password tidak cocok',
    path: ['password_confirmation'],
  });

const { defineField, handleSubmit, errors, setErrors } = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    otp: '',
    password: '',
    password_confirmation: '',
  },
});

// Define fields dengan vee-validate
const [otp] = defineField('otp');
const [password] = defineField('password');
const [password_confirmation] = defineField('password_confirmation');

// Toggle password visibility
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

// Toggle confirm password visibility
const toggleConfirmPassword = () => {
  confirmshowPassword.value = !confirmshowPassword.value;
};

// Store
const loadingStore = useLoadingStore();
const forgotPasswordStore = useForgotPasswordStore();

// Handle submit dengan vee-validate
const onSubmit = handleSubmit(async (values) => {
  loadingStore.start();
  isLoading.value = true;

  try {
    const response = await apiSaforiginal.post(urlAuthResetPassword, {
      identifier: forgotPasswordStore.identifier,
      otp: values.otp,
      password: values.password,
      password_confirmation: values.password_confirmation,
    });

    const { message } = response;
    notify.success(message);

    if (window.history.length > 3) {
      window.history.go(-3);
    } else {
      navigateTo('/login-password');
    }

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

const sendOtp = async () => {
  loadingStore.start();

  try {
    const response = await apiSaforiginal.post(urlAuthForgotPassword, {
      identifier: forgotPasswordStore.setIdentifier,
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
