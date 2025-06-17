<template>
	<form @submit.prevent="onSubmit" class="flex flex-col min-dvh-screen px-4 py-5 relative">
		<p class="text-xs md:text-base text-[#1E293B] dark:text-[#94A3B8]">Silahkan masukkan kode OTP yang telah kami kirimkan ke nomor WhatsApp / Email anda</p>

		<div class="my-5">
			<FormOtp v-model="otp" :fields="6" :isError="Boolean(errors.otp)" />

			<FormMessageError v-if="errors.otp" :message="errors.otp" class="justify-center" />

			<p class="mt-2 text-xs md:text-sm text-[#1E293B] dark:text-[#94A3B8]">Tidak menerima kode verifikasi? <span @click="sendOtp" class="cursor-pointer text-primary font-bold pl-0.5">Kirim ulang</span></p>


			<div class="flex flex-col gap-5 mt-8">

				<p class="text-xs md:text-base text-[#1E293B] dark:text-[#94A3B8]">Silakan masukan password baru</p>

				<FormInput
					:type="showPassword ? 'text' : 'password'"
					id="password"
					name="password"
					placeholder="Masukkan password baru (min 8 karakter)"
					:isIcon="true"
					iconPosition="right"
					label-text="Password Baru"
					v-model="password"
					:error="errors.password"
				>
					<template #icon>
						<Icon v-if="showPassword" name="heroicons:eye" class="text-xl text-subtle cursor-pointer" @click="togglePassword" />
						<Icon v-else name="heroicons:eye-slash" class="text-xl text-subtle cursor-pointer" @click="togglePassword" />
					</template>
				</FormInput>

				<FormInput
					:type="confirmshowPassword ? 'text' : 'password'"
					id="password_confirmation"
					name="password_confirmation"
					placeholder="Masukan konfirmasi password baru"
					:isIcon="true"
					iconPosition="right"
					label-text="Konfirmasi password baru"
					v-model="password_confirmation"
					:error="errors.password_confirmation"
				>
					<template #icon>
						<Icon v-if="confirmshowPassword" name="heroicons:eye" class="text-xl text-subtle cursor-pointer" @click="toggleConfirmPassword" />
						<Icon v-else name="heroicons:eye-slash" class="text-xl text-subtle cursor-pointer" @click="toggleConfirmPassword" />
					</template>
				</FormInput>

			</div>
		</div>



		<div class="fixed w-full z-10 bottom-0 left-0 bg-white dark:bg-[#0F172A] shadow-[0px_-2px_4px_rgba(0,0,0,0.05)] p-4">
			<AppContainer>
				<Button class="w-full" type="submit" :disabled="isLoading">{{ isLoading ? 'Loading...' : 'Simpan Perubahan' }}</Button>
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
});

const title = 'Ubah Password'
useSeoMeta({
	title: title,
});

const layoutData = useState('layoutData')
layoutData.value = {
	title: title
}

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
const schema = z.object({
	otp: z.preprocess(
    (val) => String(val), // Konversi nilai ke string terlebih dahulu
    z.string().length(6, 'otp harus tepat 6 digit')
  ),
	password: z.string()
		.min(1, 'Password harus diisi')
		.min(6, 'Password minimal 6 karakter'),
		// .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password harus mengandung huruf besar, huruf kecil, dan angka'),

	password_confirmation: z.string()
		.min(1, 'Konfirmasi password harus diisi')
}).refine((data) => data.password === data.password_confirmation, {
	message: 'Konfirmasi password tidak cocok',
	path: ['password_confirmation']
})


const { defineField, handleSubmit, errors, setErrors } = useForm({
	validationSchema: toTypedSchema(schema),
	initialValues: {
		otp: '',
		password: '',
		password_confirmation: ''
	}
})

// Define fields dengan vee-validate
const [otp] = defineField('otp')
const [password] = defineField('password')
const [password_confirmation] = defineField('password_confirmation')


// Toggle password visibility
const togglePassword = () => {
	showPassword.value = !showPassword.value
}

// Toggle confirm password visibility
const toggleConfirmPassword = () => {
	confirmshowPassword.value = !confirmshowPassword.value
}

// Store
const loadingStore = useLoadingStore();
const forgotPasswordStore = useForgotPasswordStore();

// Handle submit dengan vee-validate
const onSubmit = handleSubmit(async (values) => {
	loadingStore.start();
	isLoading.value = true

	try {
		const response = await apiService.post('/auth/reset-password', {
				identifier: forgotPasswordStore.identifier,
				otp: values.otp,
				password: values.password,
				password_confirmation: values.password_confirmation,
		});

		const { data, message } = response;
		notify.success(message);

		if (window.history.length > 3) {
				window.history.go(-3);
		} else {
				navigateTo("/login-password");
		}

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

const sendOtp = async () => {
	loadingStore.start();

	try {
		const response = await apiService.post('/auth/forgot-password', {
				identifier: forgotPasswordStore.setIdentifier
		});
		const { data, message } = response;

		notify.success(message);

	} catch (error: any) {
		handleValidationError(error, setErrors)

		// Handle error (bisa tambahkan toast/notification)
	} finally {
		loadingStore.stop();
	}
}
</script>