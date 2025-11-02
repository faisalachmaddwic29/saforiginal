<template>
  <div class="relative flex flex-col space-y-5 flex-1 pt-5">
    <div class="w-full h-full">
      <div class="relative flex flex-col space-y-5 flex-1">
        <!-- Header Skeleton -->
        <div class="header text-center">
          <div class="size-[200px] m-auto">
            <Skeleton class="w-[200px] h-[200px] rounded-full mx-auto" />
          </div>
          <Skeleton class="w-[180px] h-6 mx-auto mt-4" />
        </div>

        <hr class="border-5 border-footer" />

        <!-- Content Skeleton -->
        <div class="w-full px-4 flex flex-col gap-4 pb-18">
          <!-- product skeleton -->
          <div v-for="i in 1" :key="i" class="flex flex-col gap-4">
            <Skeleton class="w-full h-[160px] rounded-xl" />
          </div>

          <!-- detail transaction skeleton -->
          <div class="flex flex-col gap-3 mt-4">
            <Skeleton class="w-1/2 h-5" />
            <Skeleton class="w-2/3 h-5" />
            <Skeleton class="w-1/3 h-5" />
            <Skeleton class="w-3/4 h-5" />
            <Skeleton class="w-full h-5" />
          </div>
        </div>
      </div>

      <!-- Footer Skeleton -->
      <div class="fixed w-full z-10 bottom-0 left-0 bg-grey p-4">
        <AppContainer class="flex flex-col gap-3">
          <Skeleton class="h-10 w-full rounded-xl" />
        </AppContainer>
      </div>
    </div>
  </div>
</template>
