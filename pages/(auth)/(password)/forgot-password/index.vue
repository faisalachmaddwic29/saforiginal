<template>
  <form class="flex flex-col min-dvh-screen px-4 py-5 relative" @submit="onSubmit">
    <p class="text-xs md:text-sm mb-5 text-[#1E293B] dark:text-[#94A3B8]">Silakan masukan nomor WhatsApp anda sekarang untuk melakukan konfirmasi</p>

    <!-- Form Login Password -->
    <div class="flex flex-col gap-5 mb-2.5">
      <div>
        <FormInput id="identifier" v-model="identifier" type="text" name="identifier" placeholder="Masukkan alamat email atau telepon" :error="errors.identifier" />
      </div>
    </div>

    <div class="fixed w-full z-10 bottom-0 left-0 bg-footer shadow-[0px_-2px_4px_rgba(0,0,0,0.05)] p-4">
      <AppContainer>
        <Button class="w-full" type="submit" :disabled="isLoading">{{ isLoading ? 'Loading...' : 'Kirim Permintaan' }}</Button>
      </AppContainer>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { urlAuthForgotPassword } from '~/constants';

const title = 'Lupa Password';

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
});

// Setup vee-validate dengan zod schema
const { defineField, handleSubmit, errors, setErrors } = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    identifier: '',
  },
});

// Define fields dengan vee-validate
const [identifier] = defineField('identifier');

const loadingStore = useLoadingStore();
const forgotPasswordStore = useForgotPasswordStore();

// Handle submit dengan vee-validate
const onSubmit = handleSubmit(async (values) => {
  loadingStore.start();
  isLoading.value = true;

  try {
    const response = await apiSaforiginal.post(urlAuthForgotPassword, {
      identifier: values.identifier,
    });

    const { message } = response;

    forgotPasswordStore.setIdentifier(values.identifier);
    notify.success(message);

    // Redirect setelah berhasil
    await navigateTo('/forgot-password/change');
  } catch (error: any) {
    handleValidationError(error, setErrors);

    // Handle error (bisa tambahkan toast/notification)
  } finally {
    loadingStore.stop();
    isLoading.value = false;
  }
});
</script>
