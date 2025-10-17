<template>
  <div class="relative flex flex-col space-y-5 flex-1">
    <div class="w-full p-5 rounded-[20px] flex flex-col justify-start shadow-xl">
      <!-- Logo -->
      <Skeleton class="h-[37px] w-32" />

      <!-- Judul -->
      <Skeleton class="h-6 w-48 mt-5 mb-2.5" />

      <!-- Sub Judul -->
      <Skeleton class="h-4 w-64" />

      <!-- Garis pemisah -->
      <div class="my-5 border border-dashed w-full border-primary rounded" />

      <!-- Detail transaksi -->
      <ContentPaymentDetailTransactionLoading />

      <!-- Tombol -->
      <div class="fixed w-full z-10 bottom-0 left-0 bg-grey p-4">
        <AppContainer class="flex flex-col gap-3">
          <Skeleton class="h-10 w-full rounded-xl" />
        </AppContainer>
      </div>
    </div>
  </div>
</template>
