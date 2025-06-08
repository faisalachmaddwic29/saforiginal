<template>
	<form @submit="" class="flex flex-col min-dvh-screen px-4 py-5 relative">
		<h2 class="text-2xl md:text-3xl font-manrope font-extrabold mb-2.5 text-[#1E293B] dark:text-[#94A3B8]">Verifikasi Register</h2>
		<p class="text-xs md:text-base text-[#1E293B] dark:text-[#94A3B8]">Halo kak, silahkan masukkan kode OTP untuk mengaktifkan akun</p>

		<FormOtp v-model="pin" :fields="6" class="my-5" />

		<p class="text-xs md:text-sm text-[#1E293B] dark:text-[#94A3B8]">Tidak menerima kode verifikasi? <NuxtLink to="/auth/registration" class="text-primary font-bold pl-0.5">Kirim ulang</NuxtLink></p>


		<div class="fixed w-full z-10 bottom-0 left-0 bg-white dark:bg-[#0F172A] shadow-[0px_-2px_4px_rgba(0,0,0,0.05)] p-4">
			<AppContainer>
				<Button class="w-full" type="submit" :disabled="isLoading">{{ isLoading ? 'Loading...' : 'Masuk' }}</Button>
			</AppContainer>
		</div>
	</form>
</template>

<script setup lang="ts">

definePageMeta({
	layout: 'detail',
});

const isLoading = ref(false);
const pin = ref('');
</script>