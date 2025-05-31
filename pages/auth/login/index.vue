<template>
	<div class="bg-gray-50 dark:bg-dark flex items-center justify-center min-h-screen p-8">
  <div class="rounded-xl shadow-lg p-5 w-full bg-white dark:bg-dark-secondary">
    <!-- Logo dan Judul -->
    <div class="text-center mb-6">
      <NuxtImg src="/images/logos/logo.svg" alt="Logo" class="h-[40px] mx-auto" />
    </div>

    <!-- Form Login -->
    <form class="space-y-5">
      <h2 class="text-xl font-semibold text-center dark:text-[#6E7D94]">Masuk</h2>
      <p class="text-center text-sm">Silahkan masukkan nomor WhatsApp anda untuk masuk/daftar</p>

      <input type="text" placeholder="Masukkan nomor WhatsApp, misal: 6281xxx" class="input"/>

      <button type="submit" class="btn-primary">Masuk</button>
			<hr/>
      <button type="button" class="btn-primary-outline">Masuk dengan password</button>
    </form>

    <!-- Icon Tema (Opsional) -->
    <div class="absolute top-4 right-4">
      <ToggleDarkMode size="lg" />
    </div>
  </div>
</div>
</template>

<script setup lang="ts">

definePageMeta({
	layout: 'akun',
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
