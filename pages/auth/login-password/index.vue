<template>
	<form class="flex flex-col min-dvh-screen px-4 py-5 relative">
		<h2 class="text-2xl md:text-3xl font-manrope font-extrabold mb-2.5 text-[#1E293B] dark:text-[#94A3B8]">Masuk</h2>
		<p class="text-xs md:text-sm mb-5 text-[#1E293B] dark:text-[#94A3B8]">Halo kak, silahkan masukkan detail akun untuk masuk</p>

		<!-- Form Login Paassword -->
		<div class="flex flex-col">

			<input type="text" placeholder="Masukkan alamat email atau telepon" class="input mb-5">

			<input type="text" placeholder="Masukkan password" class="input mb-2.5">

			<NuxtLink to="/" class="text-xs md:text-sm text-secondary font-bold mb-7">Lupa password?</NuxtLink>

			<p class="text-xs md:text-sm text-[#1E293B] dark:text-[#94A3B8]">Belum punya akun? <NuxtLink to="/" class="text-secondary font-bold pl-0.5">Daftar sekarang</NuxtLink></p>

		</div>

		<div class="fixed w-full z-10 bottom-0 left-0 bg-white dark:bg-[#0F172A] shadow-[0px_-2px_4px_rgba(0,0,0,0.05)] p-4">
			<AppContainer>
				<!-- <button type="submit" class="btn-primary">Masuk</button> -->
				<NuxtLink to="/" class="btn-primary">Masuk</NuxtLink>
			</AppContainer>
		</div>

	</form>
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'detail',
});
</script>