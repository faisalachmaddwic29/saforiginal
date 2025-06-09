<template>
  <Html :data-theme="colorModeClass">
    <Body>
      <NuxtLoadingIndicator color="var(--color-secondary)" />
      <Toaster position="top-center" :closeButton="true" :rich-colors="true" />
			<Loading />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>

<script setup lang="ts">
const colorMode = useColorMode();
const colorModeClass = computed(() => colorMode.value); // 'light' / 'dark'
</script>
