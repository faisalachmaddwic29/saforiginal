<template>
	<p class="mt-1 font-manrope font-medium text-sm text-red-600 flex gap-1 items-center">
		<Icon name="ion:alert-circle-outline" class="text-lg text-red-600 inline-block" />
		<span class="inline-block">
			{{ capitalize(props.message) }}
		</span>
	</p>
</template>

<script setup lang="ts">
const props = defineProps({
	message: {
		type: String,
		required: true,
	},
})
</script>