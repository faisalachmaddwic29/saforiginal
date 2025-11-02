<template>
  <div class="relative flex flex-col">
    <div v-if="isLoading">
      <CardPaymentLoading />
    </div>
    <div v-else>
      <ContentPaymentQris v-if="(transaction && transaction?.payment?.payment_method === 'qris') || transaction?.payment?.payment_method === 'gopay'" :data="transaction" />
      <ContentPaymentVa v-if="transaction && transaction?.payment?.payment_method !== 'qris' && transaction?.payment?.payment_method !== 'gopay'" :data="transaction" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { urlApiTransactions } from '~/constants';
import type { Transaction, TransactionResponse } from '~/types/api';

const route = useRoute();
// const transactionId = route.query.transaction_id as string; // Pastikan id adalah string
const transactionId = route.query.transaction_id as string; // Pastikan id adalah string
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
    handleValidationError(error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchStatusPayment();
});
</script>
