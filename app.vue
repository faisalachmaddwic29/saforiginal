<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>


<script setup lang="ts">
const colorMode = useColorMode()
const colorModeClass = computed(() => colorMode.value) // 'light' / 'dark'
</script>