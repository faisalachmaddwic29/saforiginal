<template>
  <div class="p-4 space-y-5" aria-busy="true" role="status">
    <!-- Header / LabelPayment -->
    <div class="border-2 border-footer rounded-t p-4">
      <div class="flex flex-col gap-1">
        <Skeleton class="h-4 w-40 rounded" />
        <Skeleton class="h-5 w-60 rounded" />
      </div>
    </div>

    <div class="p-4 flex flex-col gap-5 border-2 border-footer rounded-b">
      <!-- Nomor Virtual Account -->
      <div class="p-3 flex flex-col gap-3 border-2 border-footer rounded-lg">
        <Skeleton class="h-5 w-48 rounded" />
        <div class="flex items-center justify-between">
          <div class="space-y-1">
            <Skeleton class="h-3 w-28 rounded" />
            <Skeleton class="h-6 w-32 rounded" />
          </div>
          <Skeleton class="h-8 w-20 rounded-md" />
        </div>
      </div>

      <!-- Metode Pembayaran -->
      <div class="p-3 flex flex-col gap-3 border-2 border-footer rounded-lg">
        <Skeleton class="h-5 w-44 rounded" />
        <div class="flex items-center gap-4">
          <Skeleton class="h-12 w-20 rounded" />
          <Skeleton class="h-7 w-40 rounded" />
        </div>
      </div>

      <!-- Total Pembayaran -->
      <div class="p-3 flex flex-col gap-3 border-2 border-footer rounded-lg">
        <Skeleton class="h-5 w-44 rounded" />
        <div class="flex items-center justify-between">
          <Skeleton class="h-7 w-40 rounded" />
          <Skeleton class="h-8 w-20 rounded-md" />
        </div>
      </div>
    </div>

    <!-- Fixed Button -->
    <div class="fixed w-full z-10 bottom-0 left-0 bg-footer shadow-[0px_-2px_4px_rgba(0,0,0,0.05)]">
      <AppContainer class="p-4">
        <Skeleton class="h-10 w-full rounded-md" />
      </AppContainer>
    </div>
  </div>
</template>
