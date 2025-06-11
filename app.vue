<template>
  <Html :data-theme="colorModeClass">
    <Body>
			<DialogProvider>
      <NuxtLoadingIndicator color="var(--color-secondary)" />
      <Toaster position="top-center" :closeButton="true" :rich-colors="true" />
			<Loading />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
			</DialogProvider>
    </Body>
  </Html>
</template>

<script setup lang="ts">
const colorMode = useColorMode();
const colorModeClass = computed(() => colorMode.value); // 'light' / 'dark'
</script>
