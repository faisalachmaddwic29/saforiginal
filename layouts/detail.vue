<template>
	<div class="bg-white text-[#1E293B] dark:bg-[#0F172A] dark:text-white min-h-dvh w-full antialiased flex flex-col">

			<header class="fixed z-10 w-full top-0 bg-white/80 dark:bg-[#0F172A]/80 shadow-[0px_2px_4px_rgba(0,0,0,0.1)] h-[70px] max-h-[70px] backdrop-filter backdrop-blur">
				<PageContainer class="flex justify-between items-center px-4 h-full">
					<!-- Tombol back kiri -->
					<button class="h-6 w-6 inline-block" @click="$router.back()"  >
						<Icon name="material-symbols:arrow-back-rounded" class="text-3xl text-[#1E293B] dark:text-[#627086]" />
					</button>

					<!-- Logo tengah -->
					<div class="flex justify-center">
						<BackToHomeImage />
					</div>

					<!-- Kolom kanan kosong (buat balance) -->
					<div />
				</PageContainer>
			</header>

			<PageMain>
				<slot />
			</PageMain>

	</div>
</template>