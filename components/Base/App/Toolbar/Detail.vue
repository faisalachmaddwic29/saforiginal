<template>
	<AppToolbar>
		<div class="flex justify-between items-center px-4 h-full">
			<button class="h-6 w-6 inline-block cursor-pointer" @click="$router.back()"  >
				<Icon name="material-symbols:arrow-back-rounded" class="text-3xl text-[#1E293B] dark:text-[#627086]" />
			</button>

			<!-- Logo tengah -->
			<div class="flex justify-center">
				<NuxtImg src="/images/logos/logo.svg" alt="Logo" class="h-[30px]" />
			</div>

			<!-- Kolom kanan kosong (buat balance) -->
			<div />
		</div>
	</AppToolbar>
</template>