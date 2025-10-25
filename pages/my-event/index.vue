<template>
  <div>
    <AppToolbar class="z-[999]">
      <div class="flex items-center px-4 h-full gap-4 justify-between">
        <div class="flex items-center flex-1 rounded-full border border-[rgba(151,151,151,0.2)] text-[rgba(77,77,77,0.03)] h-[48px] px-4">
          <Icon name="iconamoon:search" class="text-2xl text-[#627086] mr-2" />
          <input
            ref="searchInput"
            v-model="searchQuery"
            type="text"
            placeholder="Masukan pencarian kamu"
            class="font-manrope bg-transparent placeholder-menu/30 text-menu text-base focus:outline-none w-full"
          />
        </div>
        <!-- <NuxtImg src="/images/icons/filter.svg" alt="filter" class="h-6 w-6 cursor-pointer" /> -->
      </div>
    </AppToolbar>
    <div class="p-4">
      <div v-if="transactions.length" class="w-full mx-auto px-4 md:px-0 flex flex-col gap-4">
        <div v-for="transaction in transactions" :id="transaction.id + '-transactions'" :key="transaction.id + '-transactions'">
          <!-- <CardMyEvent v-for="item in transaction?.details" :key="item.id" :transaction-id="transaction.id" :product="item.product" :transaction-status="transaction.payment_status" /> -->
          <CardMyEvent :transaction-id="transaction.id" :product="transaction.details[0].product" :transaction-status="transaction.payment_status" />
        </div>

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
        <div v-if="isLastPage && !isLoading" class="text-center text-sm py-3"></div>
      </div>

      <!-- Empty state -->
      <div v-else-if="!isFirstLoading && transactions.length === 0" class="text-center py-8">
        <NuxtImg src="/images/empty.png" alt="Empty event" class="aspect-auto w-full px-12" />
      </div>

      <!-- Loading saat pertama -->
      <CardListLoading v-if="isFirstLoading" :rows="1" :length="4" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useIntersectionObserver, watchDebounced } from '@vueuse/core';
import { urlApiTransactions } from '~/constants';
import type { Transaction, TransactionsResponse } from '~/types/api';

const title = 'My Event';
definePageMeta({
  layout: 'home',
  isShadow: true,
  middleware: 'auth',
  isPaddingTop: true,
  isPaddingBottom: true,
  title: title,
});

useSeoMeta({
  title: title,
});

// State
// const isOpen = ref(false);
// const showDrawer = ref(false);
const route = useRoute();
const searchQuery = ref('');
const searchInput = ref<HTMLInputElement | null>(null);

const transactions = ref<Transaction[]>([]);
const page = ref(1);
const isLoading = ref(false);
const isFirstLoading = ref(true);
const isLastPage = ref(false);
const loadMoreTrigger = ref<HTMLElement | null>(null);

const kategori = ref((route.query.category as string) ?? 'all');

const fetchTransactions = async (isNewSearch = false) => {
  if (isLoading.value && !isNewSearch) return;
  if (isLoading.value || isLastPage.value) return;
  isLoading.value = true;

  try {
    if (isNewSearch) {
      page.value = 1;
      transactions.value = [];
      isLastPage.value = false;
      isFirstLoading.value = true;
    }

    const { data } = await apiSaforiginal.get<TransactionsResponse>(
      `${urlApiTransactions}?${buildParams({ type: 'event', category: kategori.value, date: 'all', location: 'all', search: searchQuery.value })}`
    );

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
    console.error('Error fetching transaction:', error);
  } finally {
    isLoading.value = false;
    isFirstLoading.value = false;
  }
};

watchDebounced(
  searchQuery,
  () => {
    transactions.value = [];
    page.value = 1;
    isLastPage.value = false;

    if (searchQuery.value.trim().length > 2) {
      fetchTransactions(true); // ⬅️ New search
    } else if (searchQuery.value.trim().length === 0) {
      fetchTransactions();
    }
  },
  { debounce: 500, maxWait: 1000 }
);

// Helpers
const buildParams = ({
  type = null,
  category = null,
  date = null,
  location = null,
  search = null,
}: {
  type?: string | null;
  category?: string | null;
  date?: string | null;
  location?: string | null;
  search?: string | null;
} = {}) => {
  const params = new URLSearchParams();

  if (search && search !== 'all') {
    params.append('search', search);
  }

  if (category && category !== 'all') {
    params.append('category', category);
  }
  if (date && date !== 'all') {
    params.append('date', date);
  }
  if (location && location !== 'all') {
    params.append('location', location);
  }

  if (type && type !== 'all') {
    params.append('type', type);
  }

  params.append('payment_status', 'paid');
  params.append('page', String(page.value));
  params.append('per_page', '3');
  params.append('sort', '-created_at');

  return params.toString();
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
    kategori.value = (route.query.category as string) ?? 'all';
    resetFirstFetch();
    fetchTransactions();
  },
  { immediate: true }
);

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

// ✅ Cleanup observer saat component unmount
onUnmounted(() => {
  stopObserver();
});
</script>
