<template>
  <template v-for="i in length" :key="i">
    <div class="group w-[180px] md:w-[210px] overflow-hidden animate-pulse flex-shrink-0" :class="{ 'w-full': isFull }">
      <Skeleton class="relative overflow-hidden rounded-lg aspect-[3/3.5]" />
      <div class="w-full pt-2 space-y-2">
        <Skeleton class="h-4 rounded w-2/3" />
        <Skeleton class="h-4 rounded w-1/3" />
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
defineProps({
  length: {
    type: Number,
    default: 1,
  },
  isFull: {
    type: Boolean,
    default: false,
  },
});
</script>
