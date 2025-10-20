<template>
  <div class="w-full h-full">
    <div class="relative flex flex-col space-y-5 flex-1">
      <div class="header text-center">
        <div class="size-[200px] m-auto">
          <Lottie name="payments/success" :loop="false" />
        </div>

        <p class="font-bold text-xl">Pembayaran anda berhasil</p>
      </div>

      <hr class="border-5 border-footer" />

      <div class="w-full px-4 flex flex-col gap-4 pb-18">
        <!-- product -->
        <CardMyEvent :product="transaction.details[0].product" :transaction-id="transaction.id" :is-show-event="true" :transaction-status="transaction.payment_status" />
        <!-- <div v-for="item in transaction.details" :key="item.id" class="flex flex-col gap-4">
        </div> -->

        <ContentPaymentDetailTransaction :transaction="transaction" />
      </div>
    </div>

    <div class="fixed w-full z-10 bottom-0 left-0 bg-footer shadow-[0px_-2px_4px_rgba(0,0,0,0.05)] p-4">
      <AppContainer class="flex flex-col gap-3">
        <Button variant="default" size="lg" class="w-full cursor-pointer" @click="router.replace('/event')">Beli Lagi</Button>
        <Button variant="outline" size="lg" class="w-full cursor-pointer" @click="router.back()">Oke</Button>
      </AppContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Transaction } from '~/types/api';

const router = useRouter();

defineProps({
  transaction: {
    type: Object as PropType<Transaction>,
    required: true,
  },
});
</script>
