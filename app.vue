<template>
	<Html :class="colorModeClass">
    <Body>
      <NuxtLayout>
				<NuxtLoadingIndicator color="#BD9E72" />
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>


<script setup lang="ts">
const colorMode = useColorMode()
const colorModeClass = computed(() => colorMode.value) // 'light' / 'dark'
</script>