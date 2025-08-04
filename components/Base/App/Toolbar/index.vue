<template>
  <header v-if="!custom" class="fixed z-1 bg-background/80 inset-x-0 w-full top-0 left-0 shadow-[0px_2px_4px_rgba(0,0,0,0.1)] h-[70px] max-h-[70px] filter backdrop-blur">
    <AppContainer>
      <slot />
    </AppContainer>
  </header>
  <header v-else class="w-full h-[70px] max-h-[70px]">
    <AppContainer>
      <slot />
    </AppContainer>
  </header>
</template>

<script setup lang="ts">
defineProps({
  custom: {
    type: Boolean,
    default: false,
  },
});
</script>
