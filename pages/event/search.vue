<template>
  <div class="relative">
    <AppToolbar :is-background="false">
      <div class="flex items-center px-4 h-full gap-5 justify-between">
        <AppButtonBack :is-white="false" />
        <!-- Search Input -->
        <form class="group flex items-center justify-between flex-1 rounded-full border border-[#E5E5EA] h-[44px] pl-4 bg-white] focus-within:border-gray-400" @submit.prevent="handleSearch">
          <div class="flex w-full items-center">
            <Icon name="iconamoon:search" class="text-2xl text-[#757575]/70 group-focus-within:text-black-salammu mr-3" />

            <input
              ref="searchInput"
              v-model="searchQuery"
              autofocus
              type="text"
              placeholder="Masukan pencarian kamu"
              class="bg-transparent placeholder-[#757575]/70 text-black-salammu text-base focus:outline-none w-full placeholder:leading-loose"
            />
          </div>
          <Icon v-if="searchQuery.length > 0" name="iconamoon:close" class="cursor-pointer text-2xl size-6 text-[#757575]/70 group-focus-within:text-danger mr-3" @click="searchQuery = ''" />
        </form>
      </div>
    </AppToolbar>

    <div class="p-4">
      <!-- Loading saat pertama -->

      <div v-if="isFirstTimeShowing" class="event-terbaik">
        <LabelTitle label="Event Terbaik untuk kamu" class="mb-5" />

        <CardListLoading v-if="isLoadingEventsBest" :length="3" />

        <div v-else class="grid grid-cols-1 gap-4">
          <CardProductList
            v-for="product in itemsEventsBest"
            :id="product.id + '-events'"
            :key="product.id + '-events'"
            :slug="product.slug"
            :thumbnail="product.cover"
            :title="product.title"
            :is-full="true"
            :type="toProductType(product.type)"
          />
        </div>
      </div>

      <div v-else>
        <LabelTitle label="Hasil Pencarian" class="mb-5" />

        <CardLoading v-if="isFirstLoading" :length="4" />

        <div class="flex flex-col pb-4 gap-5">
          <div class="grid grid-cols-2 gap-4">
            <CardProduct
              v-for="product in items"
              :id="product.id + '-events'"
              :key="product.id + '-events'"
              :is-full="true"
              :thumbnail="product.cover"
              :title="product.title"
              :slug="product.slug"
              :type="toProductType(product.type)"
            />
          </div>

          <!-- Infinite Scroll Trigger -->
          <div v-if="items.length > 0 && !isLastPage" ref="loadMoreTrigger" class="h-10 flex justify-center items-center">
            <span v-if="isLoading" class="text-sm text-gray-500">Loading more...</span>
          </div>

          <div v-if="!isFirstLoading && items.length === 0" class="flex items-center justify-center pt-[136px]">
            <NuxtImg src="/images/empty.png" alt="Empty Article" class="aspect-auto w-full px-9" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { watchDebounced } from '@vueuse/core';
import { urlApiProducts } from '~/constants';
import { toProductType, type Product, type ProductsResponse } from '~/types/api';

const title = 'Pencarian';

definePageMeta({
  layout: 'default',
  isPaddingTop: true,
  isPaddingBottom: true,
  title: title,
});

useSeoMeta({
  title: title,
});

const searchQuery = ref('');
const searchInput = ref<HTMLInputElement | null>(null);

const items = ref<Product[]>([]);
const page = ref(1);
const isFirstTimeShowing = ref(true);
const isLoading = ref(false);
const isFirstLoading = ref(true);
const loadMoreTrigger = ref<HTMLElement | null>(null);
const isLastPage = ref(false);
let currentCallId = 0;

const fetchEvents = async (isNewSearch = false) => {
  // ⛔ Cegah fetch dobel saat scroll
  if (isLoading.value && !isNewSearch) return;

  const thisCallId = ++currentCallId;
  isLoading.value = true;
  isFirstTimeShowing.value = false;

  try {
    if (isNewSearch) {
      page.value = 1;
      items.value = [];
      isLastPage.value = false;
      isFirstLoading.value = true;
    }

    const { data } = await apiSaforiginal.get<ProductsResponse>(`/v1/products?search=${encodeURIComponent(searchQuery.value)}&page=${page.value}&per_page=10&sort=-created_at`);

    // ⛔ Kalau ini bukan request terbaru (search), abaikan
    if (isNewSearch && thisCallId !== currentCallId) return;

    if (data.products && data.products.length > 0) {
      items.value.push(...data.products);
      page.value++;
    } else {
      isLastPage.value = true;
    }
  } catch (error) {
    console.error('Error fetching search products:', error);
  } finally {
    // ⛔ Hanya request aktif yang boleh reset loading state
    if (thisCallId === currentCallId) {
      isLoading.value = false;
      isFirstLoading.value = false;
    }
  }
};

watchDebounced(
  searchQuery,
  () => {
    items.value = [];
    page.value = 1;
    isLastPage.value = false;

    if (searchQuery.value.trim().length > 2) {
      fetchEvents(true); // ⬅️ New search
    }
  },
  { debounce: 500, maxWait: 1000 }
);

const handleSearch = () => {
  if (searchQuery.value.trim().length > 0) {
    fetchEvents(true); // new search
  } else {
    // Reset jika input kosong
    items.value = [];
    page.value = 1;
    isLastPage.value = false;
    isFirstTimeShowing.value = true;
  }
};

onMounted(() => {
  nextTick(() => {
    searchInput.value?.focus();
  });

  fetchEventsBest();
});

const itemsEventsBest = ref<Product[]>([]);
const isLoadingEventsBest = ref(false);

const fetchEventsBest = async () => {
  isLoadingEventsBest.value = true;

  try {
    const { data } = await apiSaforiginal.get<ProductsResponse>(urlApiProducts + `?page=1&per_page=3`);

    itemsEventsBest.value = data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
  } finally {
    isLoadingEventsBest.value = false;
  }
};
</script>
