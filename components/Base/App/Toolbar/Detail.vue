<template>
  <AppToolbar>
    <div class="flex items-center px-4 h-full gap-5" :class="props.title ? 'justify-start' : 'justify-between'">
      <AppButtonBack :is-white="isWhite" :is-primary="isPrimary" :is-black="isBlack" />

      <!-- Logo tengah -->
      <div v-if="!props.title" class="flex justify-center">
        <AppLogoToHome />
      </div>

      <AppToolbarTitle v-else :title="props.title" :is-white="isWhite" :is-primary="isPrimary" :is-black="isBlack" />
      <!-- Kolom kanan kosong (buat balance) -->
      <div v-if="!props.title" />
    </div>
  </AppToolbar>
</template>

<script setup>
// Define props
const props = defineProps({
  title: {
    type: null,
    default: null,
  },
  isWhite: {
    type: Boolean,
    default: false,
  },
  isPrimary: {
    type: Boolean,
    default: false,
  },
  isBlack: {
    type: Boolean,
    default: false,
  },
});
</script>
