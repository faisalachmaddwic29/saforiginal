<template>
  <h2 class="flex text-lg md:text-xl font-bold text-title">
    {{ title }}
  </h2>
</template>

<script lang="ts" setup>
defineProps({
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
  title: {
    type: String,
    default: '',
  },
});
</script>
