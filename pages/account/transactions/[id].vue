<template>
  <div class="relative flex flex-col">
    <div v-if="transaction" class="w-full h-full">
      <ContentPaymentSuccess v-if="transaction && transaction.payment_status === 'paid'" :transaction="transaction" />
      <ContentPaymentFailed v-if="transaction && transaction.payment_status === 'failed'" :transaction="transaction" />
      <ContentPaymentPending v-if="transaction && transaction.payment_status === 'pending'" :transaction="transaction" />
    </div>
    <ContentPaymentStrukLoading v-else />
  </div>
</template>

<script setup lang="ts">
import { urlApiTransactions } from '~/constants';
import type { Transaction, TransactionResponse } from '~/types/api';

const route = useRoute();
const transactionId = route.params.id as string; // Pastikan id adalah string
const transaction = ref<Transaction>();
const isLoading = ref(false);
definePageMeta({
  layout: 'detail',
  middleware: 'auth',
  isPaddingTop: true,
  isPaddingBottom: true,
});

const fetchStatusPayment = async () => {
  isLoading.value = true;

  try {
    const { data } = await apiSaforiginal.get<TransactionResponse>(`${urlApiTransactions}/${transactionId}`);
    transaction.value = data.transaction;
  } catch (error) {
    console.error('Error fetching status payment:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchStatusPayment();
});
</script>
