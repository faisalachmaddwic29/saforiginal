<template>
  <main
    class="relative z-0 w-full h-fit flex-1"
    :class="{
      'pb-[60px] pt-[70px]': props.clean,
      'pb-[76px]': props.bottom,
      'pt-[70px]': props.top,
    }"
  >
    <div class="max-w-container mx-auto relative">
      <NuxtImg v-if="props.shadow" src="/images/background.png" alt="Bacground" class="absolute top-[-70px] w-full h-[130px] z-0" />
      <div class="relative z-10">
        <slot />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
const props = defineProps({
  clean: {
    type: Boolean,
    default: false,
  },
  bottom: {
    type: Boolean,
    default: false,
  },
  top: {
    type: Boolean,
    default: false,
  },
  shadow: {
    type: Boolean,
    default: false,
  },
});
</script>
