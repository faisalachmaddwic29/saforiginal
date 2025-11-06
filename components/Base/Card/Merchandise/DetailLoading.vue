<template>
  <div class="flex gap-6 -mx-4 md:mx-0 overflow-hidden md:rounded-xl relative z-[1] p-4 md:p-6 backdrop-blur-lg shadow-md">
    <!-- BACKDROP SKELETON -->
    <div class="absolute inset-x-0 -z-[1] opacity-10 w-full top-1/2 filter blur-xs transform -translate-y-1/2 bg-muted"></div>

    <!-- THUMBNAIL SKELETON -->
    <Skeleton class="size-[130px] md:size-[180px] flex-shrink-0 aspect-[1/1] rounded-md" />

    <!-- CONTENT SKELETON -->
    <div class="flex flex-col flex-1 min-w-0 gap-2">
      <!-- TITLE -->
      <Skeleton class="h-6 md:h-8 w-3/4 rounded" />

      <!-- AUTHOR -->
      <Skeleton class="h-4 md:h-5 w-1/3 rounded" />

      <!-- TYPE -->
      <Skeleton class="h-4 md:h-5 w-1/4 rounded" />

      <!-- SHARE BUTTON -->
      <div class="mt-3 self-end">
        <Skeleton class="h-8 w-24 rounded-md" />
      </div>
    </div>
  </div>

  <div class="fixed w-full z-10 bottom-0 left-0 bg-footer shadow-[0px_-2px_4px_rgba(0,0,0,0.05)]">
    <AppContainer class="p-4">
      <!-- Tombol Loading Skeleton -->
      <Skeleton class="w-full h-10 md:h-12 rounded-md" />
    </AppContainer>
  </div>
</template>
