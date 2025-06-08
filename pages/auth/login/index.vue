<!-- pages/auth/login.vue -->
<template>
  <div class="flex items-center justify-center min-h-screen p-8">
    <div
      class="rounded-xl shadow-[0px_4px_10px_rgba(0,0,0,0.1)] dark:bg-[#091122] p-3 md:p-5 w-full"
    >
      <!-- Logo dan Judul -->
      <div class="text-center mb-6">
        <NuxtImg src="/images/logos/logo.svg" alt="Logo" class="h-[40px] mx-auto" />
      </div>

      <!-- Login Form Component -->
      <!-- <AuthPhoneLoginForm @success="handleLoginSuccess" @error="handleLoginError" /> -->
			<form @submit.prevent="onSubmit" class="space-y-5">
				<h2 class="text-center text-2xl md:text-3xl font-manrope font-extrabold mb-2.5 text-[#1E293B] dark:text-[#94A3B8]">
					Masuk
				</h2>
				<p class="text-center text-xs md:text-sm mb-5 text-[#1E293B] dark:text-[#94A3B8]">
					Silahkan masukkan nomor WhatsApp anda untuk masuk/daftar
				</p>

				<div>
					<FormInput
						id="phone"
						type="text"
						name="phone"
						placeholder="Masukkan nomor WhatsApp, misal: 6281xxx"
						:isNumber="true"
						v-model="phone"
						:error="errors.phone"
					/>
				</div>

				<div class="flex flex-col divide-y divide-[#D9D9D9]">
					<div class="pb-5">
						<button
							type="submit"
							class="btn-primary"
							:disabled="isLoading"
						>
							{{ isLoading ? 'Loading...' : 'Masuk' }}
						</button>
					</div>

					<div class="pt-5">
						<NuxtLink to="/auth/login-password" class="inline-block w-full cursor-pointer">
							<button type="button" class="btn-primary-outline">
								Masuk dengan password
							</button>
						</NuxtLink>
					</div>
				</div>
			</form>

      <!-- Icon Tema -->
      <div class="absolute top-[62px] right-4">
        <AppToggleDarkMode size="lg" />
      </div>
    </div>

    <AppToolbarMenus />
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'


definePageMeta({
  layout: "default",
});



const isLoading = ref(false)
const config = useRuntimeConfig()

// Schema validasi Zod - hanya required
const schema = z.object({
	phone: z.string().min(1, 'Nomor WhatsApp harus diisi')
})

// Setup vee-validate dengan zod schema
const { defineField, handleSubmit, errors, setErrors } = useForm({
	validationSchema: toTypedSchema(schema),
	initialValues: {
		phone: ''
	}
})

const [phone] = defineField('phone')

const onSubmit = handleSubmit(async (values) => {
	isLoading.value = true

	try {
		console.log('Form data:', values)

		const response = await apiService.post('/auth/login/phone', {
				phone: values.phone
		});

		console.log('Login response:', response)

		// Redirect setelah berhasil
		// await navigateTo(props.redirectTo)

	} catch (error: any) {
		handleValidationError(error, setErrors)

		// Handle error (bisa tambahkan toast/notification)
	} finally {
		isLoading.value = false
	}
})


onMounted(async () => {
  console.log("Runtime Config:", config.public.apiBaseUrl);
});
</script>
