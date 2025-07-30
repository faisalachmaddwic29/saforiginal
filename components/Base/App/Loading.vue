<template>
  <teleport to="body">
    <div v-show="loadingStore.isLoading" class="flex items-center justify-center fixed w-full top-0 h-full z-[99999999] bg-[rgba(0,0,0,0.6)]">
      <div class="before:animate-spin before:content-[''] before:border-secondary before:border-t-primary before:box-border before:w-[50px] before:h-[50px] before:rounded-full before:border-[4px] before:border-solid w-[8rem] h-[8rem] bg-background dark:bg-background shadow-md rounded-[8px] flex items-center justify-center" />
    </div>
  </teleport>
</template>

<script setup lang="ts">
const loadingStore = useLoadingStore();
</script>
