<template>
  <div>
    <form v-if="showFormPhone" class="relative pb-[60px]" @submit="onSubmitPhone">
      <div class="px-4 pt-5 pb-5 w-full">
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <div class="text-title text-sm font-bold">No. WhatsApp</div>
            <FormInput id="new_phone" v-model="new_phone" name="new_phone" placeholder="No. WhatsApp" :error="phoneForm.errors.value.new_phone" />
          </div>
          <LabelInfo type="warning">Gunakan nomor yang terdaftar pada akun whatsapp anda untuk melakukan verifikasi nomor</LabelInfo>
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
            Silahkan masukkan kode OTP yang telah kami kirimkan ke
            <strong>{{ new_phone }}</strong>
          </div>
          <div class="flex flex-col gap-2">
            <FormOtp v-model="otp" :fields="6" :is-error="Boolean(otpForm.errors.value.otp)" />

            <FormMessageError v-if="otpForm.errors.value.otp" :message="otpForm.errors.value.otp" class="justify-center" />
          </div>
          <p class="text-xs md:text-sm text-[#1E293B] dark:text-[#94A3B8]">
            Tidak menerima kode verifikasi?
            <span class="cursor-pointer text-primary font-bold pl-0.5" @click="onSubmitPhone">Kirim ulang</span>
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
          <NuxtImg src="/images/success-phone.svg" class="w-full px-10" />
          <div class="text-title text-lg text-center">Berhasil Melakukan Verifikasi Nomor WhatsApp</div>
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
import { urlAuthPhoneChangeConfirm, urlAuthPhoneChangeRequest } from '~/constants';

const title = ref('Ubah No. Handphone');
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
const showFormPhone = ref(true);
const showFormOtp = ref(false);
const showFormSuccess = ref(false);
const loadingStore = useLoadingStore();

const phoneSchema = z.object({
  new_phone: z
    .string()
    .min(1, 'Nomor whatsapp harus diisi')
    .regex(/^(\+62|62|0)[0-9]{9,13}$/, 'Format nomor whatsapp tidak valid'),
});

const phoneForm = useForm({
  validationSchema: toTypedSchema(phoneSchema),
  initialValues: {
    new_phone: '',
  },
  validateOnMount: false,
});

const [new_phone] = phoneForm.defineField('new_phone');

const onSubmitPhone = phoneForm.handleSubmit(async (values) => {
  try {
    loadingStore.start();
    isLoading.value = true;

    const response = await apiSaforiginal.post(urlAuthPhoneChangeRequest, {
      new_phone: values.new_phone,
    });

    const { message } = response;
    notify.success(message);
    showFormPhone.value = false;
    showFormOtp.value = true;
    title.value = 'Verifikasi No. Handphone';
  } catch (error: any) {
    if (error?.code >= 500) {
      notify.error(error?.message);
    } else {
      handleValidationError(error, phoneForm.setErrors);
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

    const response = await apiSaforiginal.post(urlAuthPhoneChangeConfirm, {
      otp: values.otp,
      new_phone: new_phone.value,
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
      handleValidationError(error, phoneForm.setErrors);
    }
  } finally {
    isLoading.value = false;
    loadingStore.stop();
  }
});
</script>
