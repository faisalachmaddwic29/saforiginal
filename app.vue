<template>
	<Html :class="colorModeClass">
    <Body>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>


<script setup lang="ts">
const colorMode = useColorMode()
const colorModeClass = computed(() => colorMode.value) // 'light' / 'dark'
</script>