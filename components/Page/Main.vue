<template>
  <main class="flex-1 w-full" :class="{ 'pb-[56px] pt-[70px]': !props.clean }">
		<div class="max-w-container mx-auto relative">
			<NuxtImg v-if="!props.clean" src="/images/background.png" alt="Bacground" class="absolute top-[-50px] w-full h-[130px]" />
			<slot />
		</div>
	</main>
</template>

<script setup lang="ts">
const props = defineProps({
	clean: {
		type: Boolean,
		default: false
	}
})
</script>