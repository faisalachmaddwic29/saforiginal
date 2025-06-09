<template>
	<form @submit.prevent="onSubmit" class="flex flex-col min-dvh-screen px-4 py-5 relative">
		<h2 class="text-2xl md:text-3xl font-manrope font-extrabold mb-2.5 text-[#1E293B] dark:text-[#94A3B8]">Verifikasi Register</h2>
		<p class="text-xs md:text-base text-[#1E293B] dark:text-[#94A3B8]">Halo kak, silahkan masukkan kode OTP untuk mengaktifkan akun</p>

		<div class="my-5">
			<FormOtp v-model="otp" :fields="6" :isError="Boolean(errors.otp)" />

			<FormMessageError v-if="errors.otp" :message="errors.otp" class="justify-center" />
		</div>

		<p class="text-xs md:text-sm text-[#1E293B] dark:text-[#94A3B8]">Tidak menerima kode verifikasi? <NuxtLink to="/registration" class="text-primary font-bold pl-0.5">Kirim ulang</NuxtLink></p>


		<div class="fixed w-full z-10 bottom-0 left-0 bg-white dark:bg-[#0F172A] shadow-[0px_-2px_4px_rgba(0,0,0,0.05)] p-4">
			<AppContainer>
				<Button class="w-full" type="submit" :disabled="isLoading">{{ isLoading ? 'Loading...' : 'Masuk' }}</Button>
			</AppContainer>
		</div>
	</form>
</template>

<script setup lang="ts">
import { z } from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'

definePageMeta({
	layout: 'detail',
	middleware: 'guest'
});

const isLoading = ref(false);

// Schema validasi Zod - hanya required
const schema = z.object({
	otp: z.preprocess(
    (val) => String(val), // Konversi nilai ke string terlebih dahulu
    z.string().length(6, 'otp harus tepat 6 digit')
  )
})


const { defineField, handleSubmit, errors, setErrors } = useForm({
	validationSchema: toTypedSchema(schema),
	initialValues: {
		otp: '',
	}
})

// Define fields dengan vee-validate
const [otp] = defineField('otp')
const loadingStore = useLoadingStore();
const registrationStore = useRegistrationStore();
const authStore = useAuthStore();

// Handle submit dengan vee-validate
const onSubmit = handleSubmit(async (values) => {
	loadingStore.start();
	isLoading.value = true

	try {
		const response = await apiService.post('/auth/register/verify-otp', {
				phone: registrationStore.phone,
				otp: values.otp
		});
		loadingStore.toggle();


		const { data } = response;

    // Simpan token ke cookie dan state
    authStore.saveToken({
      access_token: data.access_token,
      expires_in: data.expires_in,
      token_type: data.token_type,
    });


    // Redirect ke halaman berikutnya
		registrationStore.reset();
    navigateTo("/");

		// Redirect setelah berhasil
		// await navigateTo('/');
	} catch (error: any) {
		handleValidationError(error, setErrors)

		// Handle error (bisa tambahkan toast/notification)
	} finally {
		loadingStore.stop();
		isLoading.value = false
	}
})
</script>