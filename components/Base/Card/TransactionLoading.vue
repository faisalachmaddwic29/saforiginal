<template>
  <div class="space-y-3" aria-busy="true" role="status">
    <div v-for="n in length" :key="n" class="w-full flex gap-2.5 justify-between items-start">
      <!-- Icon / Thumbnail -->
      <div class="size-20 bg-[rgba(0,0,0,0.03)] flex items-center justify-center rounded">
        <Skeleton class="w-12 h-12 rounded object-fill" />
      </div>

      <!-- Content -->
      <div class="flex flex-1 flex-col justify-between gap-[3px]">
        <div class="h-5">
          <Skeleton class="h-5 w-36 rounded" />
        </div>

        <div class="space-y-1">
          <Skeleton class="h-4 w-28 rounded" />
          <Skeleton class="h-4 w-20 rounded" />
        </div>

        <div class="pt-1">
          <Skeleton class="h-3 w-40 rounded" />
        </div>
      </div>

      <!-- Status -->
      <div class="px-3 py-1 h-fit rounded-full">
        <Skeleton class="h-6 w-20 rounded-full" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  length: {
    type: Number,
    default: 1,
  },
});
</script>
