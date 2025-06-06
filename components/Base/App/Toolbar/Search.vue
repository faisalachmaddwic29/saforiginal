<template>
	<AppToolbar>
		<div class="flex gap-4 justify-between items-center px-4 h-full">
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
							class="font-manrope bg-transparent placeholder-[#B0B4C0] text-[#4B5563] dark:placeholder-[#4B5563] dark:text-[#B0B4C0] text-base focus:outline-none w-full"
						>
					</div>


					<NuxtImg src="/images/icons/filter.svg" alt="filter" class="h-6 w-6" />
		</div>
	</AppToolbar>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const showBackButton = computed(() => route.meta.showBackButton === true)
</script>