<template>
	<div class="bg-white text-[#1E293B] dark:bg-[#0F172A] dark:text-white min-h-dvh w-full antialiased flex flex-col">

			<header class="fixed z-10 w-full top-0 bg-white/80 dark:bg-[#0F172A]/80 shadow-[0px_2px_4px_rgba(0,0,0,0.1)] h-[70px] max-h-[70px] backdrop-filter backdrop-blur">
				<PageContainer class="flex gap-4 items-center justify-between h-full px-4">
					<!-- Tombol back kiri -->

					<!-- ini muncul pake attr apakah bisa bro? -->
					<button
						v-if="showBackButton"
						class="h-6 w-6"
						@click="$router.back()"
					>
						<Icon name="material-symbols:arrow-back-rounded" class="text-3xl text-[#1E293B] dark:text-[#627086]" />
					</button>



					<!-- Search input -->
					<div class="flex items-center flex-1 rounded-full border border-[rgba(151,151,151,0.2)] text-[rgba(77,77,77,0.03)] h-[48px] px-4">
						<Icon name="iconamoon:search" class="text-2xl text-[#627086] mr-2" />

						<input
							type="text"
							placeholder="Masukan pencarian kamu"
							class="font-manrope bg-transparent placeholder-[#B0B4C0] text-[#4B5563] text-base focus:outline-none w-full"
						>
					</div>


					<NuxtImg src="/images/icons/filter.svg" alt="filter" class="h-6 w-6" />

				</PageContainer>
			</header>

			<PageMain>
				<slot />
			</PageMain>

			<PageMenus />
	</div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const showBackButton = computed(() => route.meta.showBackButton === true)
</script>