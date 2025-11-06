<template>
  <div class="grid gap-4" :class="{ 'grid-cols-1': rows === 1, 'grid-cols-2': rows === 2, 'grid-cols-3': rows === 3 }">
    <div v-for="n in length" :key="n" class="w-full rounded-sm border border-[rgba(148,163,184,0.2)] overflow-hidden flex-shrink-0">
      <!-- Image Skeleton -->
      <div class="aspect-[1/1] w-full border-b border-[rgba(148,163,184,0.2)] overflow-hidden">
        <Skeleton class="w-full h-full" />
      </div>

      <!-- Content Skeleton -->
      <div class="p-3 md:p-4 space-y-3">
        <div class="space-y-2">
          <Skeleton class="h-4 md:h-5 w-3/4 rounded-sm" />
          <Skeleton class="h-4 w-1/2 rounded-sm" />
        </div>
        <Skeleton class="h-5 md:h-6 w-1/3 rounded-sm" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton';

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
