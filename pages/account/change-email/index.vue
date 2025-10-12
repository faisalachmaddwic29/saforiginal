<template>
  <div>
    <form v-if="showFormEmail" class="relative pb-[60px]" @submit="onSubmitEmail">
      <div class="px-4 pt-5 pb-5 w-full">
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <div class="text-title text-sm font-bold">Email</div>
            <FormInput id="email" v-model="new_email" name="email" placeholder="Alamat email aktif" :error="emaiForm.errors.value.new_email" />
          </div>
        </div>
      </div>
      <div class="fixed w-full z-10 bottom-0 left-0 bg-footer shadow-[0px_-2px_4px_rgba(0,0,0,0.05)]">
        <AppContainer class="p-4">
          <Button class="w-full" type="submit" :disabled="isLoading">
            {{ isLoading ? 'Loading...' : 'Selanjutnya' }}
          </Button>
        </AppContainer>
      </div>
    </form>
    <form v-if="showFormOtp" class="relative pb-[60px]" @submit="onSubmitOtp">
      <div class="px-4 pt-5 pb-5 w-full">
        <div class="flex flex-col gap-6">
          <div class="text-title text-sm">
            Silahkan masukkan kode OTP yang telah kami kirimkan ke <strong>{{ new_email }}</strong>
          </div>
          <div class="flex flex-col gap-2">
            <FormOtp v-model="otp" :fields="6" :is-error="Boolean(otpForm.errors.value.otp)" />

            <FormMessageError v-if="otpForm.errors.value.otp" :message="otpForm.errors.value.otp" class="justify-center" />
          </div>
          <p class="text-xs md:text-sm text-[#1E293B] dark:text-[#94A3B8]">
            Tidak menerima kode verifikasi? <span class="cursor-pointer text-primary font-bold pl-0.5" @click="onSubmitEmail">Kirim ulang</span>
          </p>
        </div>
      </div>
      <div class="fixed w-full z-10 bottom-0 left-0 bg-footer shadow-[0px_-2px_4px_rgba(0,0,0,0.05)] p-4">
        <AppContainer>
          <Button class="w-full" type="submit" :disabled="isLoading">
            {{ isLoading ? 'Loading...' : 'Verifikasi' }}
          </Button>
        </AppContainer>
      </div>
    </form>
    <div v-if="showFormSuccess" class="relative pb-[60px]">
      <div class="px-4 pt-5 pb-5 w-full">
        <div class="flex flex-col gap-4 item-center">
          <NuxtImg src="/images/success-form.svg" class="w-full px-10" />
          <div class="text-title text-lg text-center">Berhasil Melakukan Verifikasi Email</div>
        </div>
      </div>
      <div class="fixed w-full z-10 bottom-0 left-0 bg-footer shadow-[0px_-2px_4px_rgba(0,0,0,0.05)]">
        <AppContainer class="p-4">
          <Button class="w-full" @click="router.back()"> Oke </Button>
        </AppContainer>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { urlAuthChangeEmail, urlAuthChangeEmailConfirm } from '~/constants';

const title = ref('Ubah Email');
const router = useRouter();
const authStore = useAuthStore();

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
const showFormEmail = ref(true);
const showFormOtp = ref(false);
const showFormSuccess = ref(false);
const loadingStore = useLoadingStore();

const emailSchema = z.object({
  new_email: z.string().min(1, 'Email harus diisi').email('Format email tidak valid'),
});

const emaiForm = useForm({
  validationSchema: toTypedSchema(emailSchema),
  initialValues: {
    new_email: '',
  },
  validateOnMount: false,
});

const [new_email] = emaiForm.defineField('new_email');

const onSubmitEmail = emaiForm.handleSubmit(async (values) => {
  try {
    loadingStore.start();
    isLoading.value = true;

    const response = await apiSaforiginal.post(urlAuthChangeEmail, {
      new_email: values.new_email,
    });

    const { message } = response;
    notify.success(message);
    showFormEmail.value = false;
    showFormOtp.value = true;
    title.value = 'Verifikasi Email';
  } catch (error: any) {
    if (error?.code >= 500) {
      notify.error(error?.message);
    } else {
      handleValidationError(error, emaiForm.setErrors);
    }
  } finally {
    isLoading.value = false;
    loadingStore.stop();
  }
});

const otpSchema = z.object({
  otp: z.preprocess(
    (val) => String(val), // Konversi nilai ke string terlebih dahulu
    z.string().length(6, 'otp harus tepat 6 digit')
  ),
});

const otpForm = useForm({
  validationSchema: toTypedSchema(otpSchema),
  initialValues: {
    otp: '',
  },
  validateOnMount: false,
});

const [otp] = otpForm.defineField('otp');

const onSubmitOtp = otpForm.handleSubmit(async (values) => {
  try {
    loadingStore.start();
    isLoading.value = true;

    const response = await apiSaforiginal.post(urlAuthChangeEmailConfirm, {
      otp: values.otp,
      new_email: new_email.value,
    });

    const { message } = response;
    notify.success(message);
    showFormOtp.value = false;
    showFormSuccess.value = true;
    authStore.getProfile();
  } catch (error: any) {
    if (error?.code >= 500) {
      notify.error(error?.message);
    } else {
      handleValidationError(error, emaiForm.setErrors);
    }
  } finally {
    isLoading.value = false;
    loadingStore.stop();
  }
});
</script>
