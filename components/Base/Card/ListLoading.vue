<script setup lang="ts">
defineProps({
  length: {
    type: Number,
    default: 1,
  },
  rows: {
    type: Number,
    default: 1,
  },
});
</script>

<template>
  <div class="grid gap-4" :class="{ 'grid-cols-1': rows === 1, 'grid-cols-2': rows === 2, 'grid-cols-3': rows === 3 }">
    <template v-for="i in length" :key="i">
      <div class="group w-full flex gap-4">
        <Skeleton class="relative rounded-lg size-24 md:size-36 shrink-0" />

        <div class="flex w-full flex-col gap-3 py-2">
          <Skeleton class="h-4 w-1/1" />
          <Skeleton class="h-4 w-2/3" />
          <Skeleton class="h-4 w-1/5" />
        </div>
      </div>
    </template>
  </div>
</template>
