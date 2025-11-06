<template>
  <div class="w-full">
    <AppToolbar>
      <div class="flex items-center px-4 h-full gap-5 justify-between">
        <div class="flex items-center gap-5 justify-start">
          <AppButtonBack :is-white="false" />
          <AppToolbarTitle :title="title" :is-white="false" />
        </div>
        <div class="w-6 h-6 cursor-pointer" @click="handleFilterShow">
          <Icon name="tabler:filter" class="text-2xl" />
        </div>
      </div>
    </AppToolbar>

    <!-- Drawer Content -->
    <DrawerCustom v-model:open="showDrawer" title="All Share Menu" description="Kelola Share Menu" :show-indicator="true" classes="h-full pb-0 !mb-0">
      <AppContainer>
        <div class="flex flex-col gap-3 justify-between h-full overflow-auto px-4">
          <!-- Filters -->
          <div class="flex flex-col gap-5 shrink text-title dark:text-menu">
            <!-- Header -->
            <div class="flex justify-between items-center border-b pb-2 overflow-auto">
              <h3 class="text-2xl font-bold">Filter</h3>
              <Button type="button" variant="link" class="text-destructive px-0" @click="handleFilterReset">Reset</Button>
            </div>

            <!-- Waktu -->
            <!-- <div>
              <h3 class="pb-2 font-bold">Waktu</h3>
              <div class="w-full flex flex-wrap gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-hide">
                <FormRadio v-model="date" :options="date_data" />
              </div>
            </div> -->

            <!-- Status -->
            <div>
              <h3 class="pb-2 font-bold">Status</h3>
              <div class="w-full flex flex-wrap gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-hide">
                <FormRadio v-model="status" :options="status_data" />
              </div>
            </div>

            <!-- Pembayaran -->
            <!-- <div class="mb-13">
              <h3 class="pb-2 font-bold">Pembayaran</h3>
              <div class="w-full flex flex-wrap gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-hide">
                <FormRadio v-model="type" :options="type_data" />
              </div>
            </div> -->
          </div>

          <!-- Submit -->
          <div class="bg-footer p-4 -mx-4">
            <Button type="button" variant="default" class="w-full" @click="applyFilter">Terapkan</Button>
          </div>
        </div>
      </AppContainer>
    </DrawerCustom>

    <div v-if="isFirstLoading" class="px-4 py-5 flex flex-col gap-3">
      <CardTransactionLoading :length="7" />
    </div>

    <div v-else-if="transactions.length > 0" class="px-4 py-5 flex flex-col gap-6">
      <CardTransactions
        v-for="transaction in transactions"
        :key="transaction.invoice_no + '-transactions'"
        v-bind="{
          cover: transaction.details[0].product.cover,
          id: transaction.invoice_no + '-transactions',
          invoice: transaction.invoice_no,
          date: transaction.expired_at,
          amount: transaction.grand_total,
          label: transaction.details[0].name,
          status: transaction.payment_status,
        }"
        class="cursor-pointer"
        @click="$router.push(`/account/transactions/${transaction.id}`)"
      />

      <!-- Trigger untuk observer - HANYA tampil jika belum last page dan tidak loading -->
      <div v-if="!isLastPage && !isLoading" ref="loadMoreTrigger" class="h-4" />

      <!-- Loading indicator -->
      <div v-if="isLoading" class="text-center py-4">
        <div class="inline-flex items-center gap-2">
          <div class="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span class="text-sm text-gray-600">Loading more...</span>
        </div>
      </div>

      <!-- Sudah habis -->
      <div v-if="isLastPage && !isLoading" class="text-center text-sm py-3">Tidak ada lagi Riwayat Transaksi</div>
    </div>

    <p v-else class="text-center text-sm text-gray-500 mt-6">Tidak ada Riwayat Transaksi ditemukan.</p>
  </div>
</template>

<script lang="ts" setup>
import { useIntersectionObserver } from '@vueuse/core';
import { urlApiTransactions } from '~/constants';
import { ProductStatus, type Transaction, type TransactionsResponse } from '~/types/api';

const title = 'Riwayat Transaksi';

definePageMeta({
  layout: 'default',
  middleware: 'auth',
  isPaddingTop: true,
  title: title,
});

useSeoMeta({
  title: title,
});

const isLoading = ref(false);
const transactions = ref<Transaction[]>([]);
const page = ref(1);
const isFirstLoading = ref(true);
const isLastPage = ref(false);
const loadMoreTrigger = ref<HTMLElement | null>(null);

const route = useRoute();
const showDrawer = ref(false);
const status = ref('all');
const type = ref('all');
const date = ref('all');

const buildParams = ({
  type = null,
  status = null,
  date = null,
}: {
  type?: string | null;
  status?: string | null;
  date?: string | null;
} = {}) => {
  const params = new URLSearchParams();

  if (status && status !== 'all') {
    params.append('payment_status', status);
  }
  if (date && date !== 'all') {
    params.append('date', date);
  }

  if (type && type !== 'all') {
    params.append('type', type);
  }

  params.append('page', String(page.value));
  params.append('per_page', '5');
  params.append('sort', '-created_at');

  return params.toString();
};

const fetchTransactions = async () => {
  // Proteksi ganda untuk mencegah multiple request
  if (isLoading.value || isLastPage.value) {
    // console.log('Fetch dibatalkan - isLoading:', isLoading.value, 'isLastPage:', isLastPage.value);
    return;
  }

  // console.log('Fetching participants page:', page.value);
  isLoading.value = true;

  try {
    const { data } = await apiSaforiginal.get<TransactionsResponse>(`${urlApiTransactions}?${buildParams({ type: type.value, status: status.value, date: date.value })}`);

    if (data.transactions && data.transactions.length > 0) {
      transactions.value.push(...data.transactions);

      // Update page untuk next request
      page.value++;

      // Check apakah sudah last page
      if (data.meta && data.meta.current_page >= data.meta.last_page) {
        isLastPage.value = true;
        // console.log('Reached last page');
      }
    } else {
      // Jika tidak ada data, tandai sebagai last page
      isLastPage.value = true;
      // console.log('No more data available');
    }
  } catch (error) {
    console.error('Error fetching transactions:', error);
    // Jangan set isLastPage true saat error, biar bisa retry
  } finally {
    isLoading.value = false;
    isFirstLoading.value = false;
  }
};

// ✅ Observer infinite scroll dengan proteksi lebih ketat
const { stop: stopObserver } = useIntersectionObserver(
  loadMoreTrigger,
  ([entry]) => {
    if (entry?.isIntersecting && !isLoading.value && !isLastPage.value && !isFirstLoading.value) {
      // console.log('Intersection triggered, fetching more...');
      fetchTransactions();
    }
  },
  {
    rootMargin: '100px', // Kasih jarak lebih besar
    threshold: 0.1,
  }
);

const status_data = [
  { value: 'all', label: 'Semua' },
  { value: ProductStatus.GAGAL, label: 'Gagal' },
  { value: ProductStatus.SUKSES, label: 'Sukses' },
  { value: ProductStatus.MENUNGGU, label: 'Menunggu' },
];

const handleFilterShow = () => {
  showDrawer.value = true;
};

const handleFilterReset = () => {
  status.value = 'all';
  type.value = 'all';
  date.value = 'all';
};

const applyFilter = () => {
  showDrawer.value = false;
  resetFirstFetch();
  fetchTransactions();
};

const resetFirstFetch = () => {
  transactions.value = [];
  page.value = 1;
  isLastPage.value = false;
  isFirstLoading.value = true;
};

// Effects
watch(
  () => route.query,
  () => {
    status.value = 'all';
    type.value = 'all';
    date.value = 'all';
    resetFirstFetch();
    fetchTransactions();
  },
  { immediate: true }
);

// ✅ Cleanup observer saat component unmount
onUnmounted(() => {
  stopObserver();
});

// ✅ Initial load
onMounted(async () => {
  // console.log('Component mounted, initial fetch...');
  await fetchTransactions();
});
</script>
