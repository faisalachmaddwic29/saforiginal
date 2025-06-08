<template>
	<Html :data-theme="colorModeClass">
    <Body>
			<NuxtLoadingIndicator color="var(--color-secondary)" />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
	<NuxtLayout>
		<NuxtPage />
		<Toaster position="top-center" :closeButton="true"  :rich-colors="true"/>
	</NuxtLayout>
</template>


<script setup lang="ts">
const colorMode = useColorMode()
const colorModeClass = computed(() => colorMode.value) // 'light' / 'dark'
</script>
