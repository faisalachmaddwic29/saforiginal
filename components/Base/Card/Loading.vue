<template>
  <div class="grid gap-4" :class="{ 'grid-cols-1': rows === 1, 'grid-cols-2': rows === 2, 'grid-cols-3': rows === 3 }">
    <template v-for="i in length" :key="i">
      <div class="group w-full overflow-hidden animate-pulse rounded-lg flex-shrink-0">
        <Skeleton class="relative overflow-hidden rounded-lg aspect-[3/3.5]" />
        <div class="w-full pt-2 space-y-2">
          <Skeleton class="h-4 rounded w-2/3" />
          <Skeleton class="h-4 rounded w-1/3" />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
defineProps({
  length: {
    type: Number,
    default: 1,
  },
  rows: {
    type: Number,
    default: 2,
  },
});
</script>
