<script setup lang="ts">
const props = defineProps<{
  imageUrl?: string | null; // Optional URL foto profil
  width?: number; // Optional width
  height?: number; // Optional height
}>();

// Buat inisial nama
// const initials = computed(() => initialName(props.name));

// Set default width dan height jika tidak diberikan
const imgWidth = props.width ?? 80;
const imgHeight = props.height ?? 80;
</script>

<template>
  <div
    class="aspect-square rounded-full border dark:border-blue-950 overflow-hidden flex justify-center items-center m-auto relative shadow-sm dark:shadow-blue-950"
    :style="{ width: `${imgWidth}px`, height: `${imgHeight}px` }"
  >
    <template v-if="props?.imageUrl">
      <NuxtImg :src="imageUrl ?? ''" alt="User profile" class="object-fill w-full h-full" />
    </template>
    <template v-else>
      <NuxtImg src="/images/icons/user_default.svg" alt="User profile" class="rounded-full object-cover w-full" />
    </template>
  </div>
</template>
