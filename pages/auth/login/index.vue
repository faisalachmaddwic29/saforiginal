<template>
	<div class="flex items-center justify-center min-h-screen p-8">
		<div class="rounded-xl shadow-[0px_4px_10px_rgba(0,0,0,0.1)] dark:bg-[#091122] p-5 w-full">
			<!-- Logo dan Judul -->
			<div class="text-center mb-6">
				<NuxtImg src="/images/logos/logo.svg" alt="Logo" class="h-[40px] mx-auto" />
			</div>

			<!-- Form Login -->
			<form class="space-y-5 text-center">
				<h2 class="text-2xl md:text-3xl font-manrope font-extrabold mb-2.5 text-[#1E293B] dark:text-[#94A3B8]">Masuk</h2>
				<p class="text-xs md:text-sm mb-5 text-[#1E293B] dark:text-[#94A3B8]">Silahkan masukkan nomor WhatsApp anda untuk masuk/daftar</p>

				<input type="text" placeholder="Masukkan nomor WhatsApp, misal: 6281xxx" class="input">

				<!-- <hr class="bg-[#1E293B] dark:bg-[#94A3B8]00 h-0.5 border-0"> -->
				<div class="flex flex-col divide-y divide-[#D9D9D9]">
					<div class="pb-5">
						<button type="submit" class="btn-primary">Masuk</button>
					</div>

					<div class="pt-5">
						<NuxtLink to="/auth/login-password" class="inline-block w-full cursor-pointer">
							<button type="button" class="btn-primary-outline">Masuk dengan password</button>
						</NuxtLink>
					</div>
				</div>
			</form>

			<!-- Icon Tema (Opsional) -->
			<div class="absolute top-[62px] right-4">
				<AppToggleDarkMode size="lg" />
			</div>
		</div>

		<AppToolbarMenus />

	</div>
</template>

<script setup lang="ts">

definePageMeta({
	layout: 'default',
});
const config = useRuntimeConfig()

onMounted(async () => {
	console.log('Runtime Config:', config.public.apiBaseUrl);

	try {
  const res = await $fetch('http://157.15.124.158:8080/api/auth/login',{method:'POST',
		headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
		body: JSON.stringify({
				email: 'aryapujianto2@gmail.com',
				password: 'password'
			})
	})
		console.log('Locations:', res)
	} catch (err) {
		console.error('Fetch error:', err)
	}
})
</script>
