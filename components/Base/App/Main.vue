<template>
  <main
		class="flex-1 w-full"
		:class="{
			'pb-[60px] pt-[70px]': props.clean
		}"
	>
    <div class="max-w-container mx-auto relative">
      <NuxtImg
        v-if="props.shadow"
        src="/images/background.png"
        alt="Bacground"
        class="absolute top-[-50px] w-full h-[130px] z-0"
      />
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
    default: true,
  },
  shadow: {
    type: Boolean,
    default: true,
  },
});
</script>
