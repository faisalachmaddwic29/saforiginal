<template>
	<form @submit="onSubmit" class="relative pb-[60px]">
		<div class="px-4 pt-[38px] pb-5 w-full">
			<div class="flex flex-col gap-4">
					<div class="text-title text-sm">Silakan masukan password sekarang untuk mengubah password</div>
					<div class="flex flex-col gap-2">
						<div class="text-title text-sm font-bold">Password sekarang</div>
						<FormInput
							:type="showOldPassword ? 'text' : 'password'"
							id="old_password"
							name="old_password"
							placeholder="Password sekarang"
							:isIcon="true"
							iconPosition="right"
							v-model="old_password"
							:error="errors.old_password"
						>
							<template #icon>
								<Icon v-if="showOldPassword" name="heroicons:eye" class="text-xl text-subtle cursor-pointer" @click="toggleOldPassword" />
								<Icon v-else name="heroicons:eye-slash" class="text-xl text-subtle cursor-pointer" @click="toggleOldPassword" />
							</template>
						</FormInput>
					</div>
					<NuxtLink to="#" class="text-xs md:text-sm text-primary font-bold">Lupa password?</NuxtLink>
					<hr/>
					<TitleInfo type="warning">Pastikan data yang diisi sesuai, e-tiket akan di kirimkan ke alamat email dan nomor telepon yang dicantumkan</TitleInfo>
					<div class="flex flex-col gap-2">
						<div class="text-title text-sm font-bold">Password Baru</div>
						<FormInput
							:type="showNewPassword ? 'text' : 'password'"
							id="new_password"
							name="new_password"
							placeholder="Password baru"
							:isIcon="true"
							iconPosition="right"
							v-model="new_password"
							:error="errors.new_password"
						>
							<template #icon>
								<Icon v-if="showNewPassword" name="heroicons:eye" class="text-xl text-subtle cursor-pointer" @click="toggleNewPassword" />
								<Icon v-else name="heroicons:eye-slash" class="text-xl text-subtle cursor-pointer" @click="toggleNewPassword" />
							</template>
						</FormInput>
					</div>
					<div class="flex flex-col gap-2">
						<div class="text-title text-sm font-bold">Konfirmasi Password Baru</div>
						<FormInput
							:type="showNewConfirmPassword ? 'text' : 'password'"
							id="new_password_confirmation"
							name="new_password_confirmation"
							placeholder="Konfirmasi password baru"
							:isIcon="true"
							iconPosition="right"
							v-model="new_password_confirmation"
							:error="errors.new_password_confirmation"
						>
							<template #icon>
								<Icon v-if="showNewConfirmPassword" name="heroicons:eye" class="text-xl text-subtle cursor-pointer" @click="toggleNewConfirmPassword" />
								<Icon v-else name="heroicons:eye-slash" class="text-xl text-subtle cursor-pointer" @click="toggleNewConfirmPassword" />
							</template>
						</FormInput>
					</div>
			</div>
		</div>
		<div class="fixed w-full z-10 bottom-0 left-0 bg-[#F9F9F9] dark:bg-[#0F172A] shadow-[0px_-2px_4px_rgba(0,0,0,0.05)] p-4">
			<AppContainer>
				<Button class="w-full" type="submit" :disabled="isLoading">{{ isLoading ? 'Loading...' : 'Simpan Perubahan' }}</Button>
			</AppContainer>
		</div>
	</form>
</template>
<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

const title = "Keamanan & Akun";
const dialog = useDialog()
const loadingStore = useLoadingStore()
useHead({title: title});
const layoutData = useState('layoutData')
layoutData.value = {
	title: title
}
definePageMeta({
	layout: 'detail',
	middleware: "auth",
});

const isLoading = ref(false);
const showOldPassword = ref(false);
const showNewConfirmPassword = ref(false);
const showNewPassword = ref(false);

const registrationSchema = z.object({
	old_password: z.string()
		.min(1, 'Password harus diisi')
		.min(6, 'Password minimal 6 karakter'),

	new_password: z.string()
		.min(1, 'Password harus diisi')
		.min(6, 'Password minimal 6 karakter'),
		// .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password harus mengandung huruf besar, huruf kecil, dan angka'),

	new_password_confirmation: z.string()
		.min(1, 'Konfirmasi password harus diisi')
}).refine((data) => data.new_password === data.new_password_confirmation, {
	message: 'Konfirmasi password tidak cocok',
	path: ['new_password_confirmation']
})

const { defineField, handleSubmit, errors, setErrors ,resetForm} = useForm({
	validationSchema: toTypedSchema(registrationSchema),
	initialValues: {
		old_password: '',
		new_password: '',
		new_password_confirmation: ''
	},
	validateOnMount: false
})


const [old_password] = defineField('old_password')
const [new_password] = defineField('new_password')
const [new_password_confirmation] = defineField('new_password_confirmation')

const toggleOldPassword = () => {
	showOldPassword.value = !showOldPassword.value
}

const toggleNewPassword = () => {
	showNewPassword.value = !showNewPassword.value
}

const toggleNewConfirmPassword = () => {
	showNewConfirmPassword.value = !showNewConfirmPassword.value
}

const onSubmit = handleSubmit(async (values) => {
	dialog.show({
		title : 'Simpan perubahan?',
		buttonConfirmLabel: 'Simpan',
		onConfirm :async () => {
			try {
				loadingStore.start();
				isLoading.value = true
				const response = await apiService.post('/auth/change-password', {
						"old_password": values.old_password,
						"new_password": values.new_password,
						"new_password_confirmation": values.new_password_confirmation
				});

				const { data, message } = response;
				notify.success(message);
				resetForm()
			} catch (error: any) {
				if(error?.code >= 500){
					notify.error(error?.message)
				}else{
					handleValidationError(error, setErrors)
				}

			} finally {
				isLoading.value = false
				loadingStore.stop();
			}
		},
	})
}, (errors) => {
	//to do
})
</script>
