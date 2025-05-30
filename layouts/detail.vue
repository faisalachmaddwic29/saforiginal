<template>
	<div class="bg-white text-[#1E293B] dark:bg-[#0F172A] dark:text-white min-h-dvh w-full antialiased flex flex-col">

			<header class="fixed w-full top-0 bg-white/80 dark:bg-[#0F172A]/80 shadow-[0px_2px_4px_rgba(0,0,0,0.1)] h-[70px] max-h-[70px] backdrop-filter backdrop-blur">
				<PageContainer class="flex justify-between items-center px-4 h-full">
					<!-- Tombol back kiri -->
					<button class="h-6 w-6 inline-block" @click="$router.back()"  >
						<Icon name="material-symbols:arrow-back-rounded" class="text-2xl text-[#627086]" />
					</button>

					<!-- Logo tengah -->
					<div class="flex justify-center">
						<NuxtImg src="/images/logos/logo.svg" alt="Logo" class="h-[30px]" />
					</div>

					<!-- Kolom kanan kosong (buat balance) -->
					<div />
				</PageContainer>
			</header>

			<main class="flex-1 max-w-container mx-auto pb-[56px] pt-[70px]">
					<slot />
			</main>

	</div>
</template>