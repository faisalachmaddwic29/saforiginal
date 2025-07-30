<template>
		<div class="w-full h-full bg-primary text-white flex items-center justify-center">
			<h1 class="font-bold text-2xl">{{ initialNameFirst(props.name) }}</h1>
		</div>
</template>

<script setup lang="ts">
const props = defineProps({
	name: {
		type: String,
		required: true
	}
});
</script>