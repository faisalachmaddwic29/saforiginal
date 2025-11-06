<template>
  <div class="flex flex-col gap-5 px-4 py-1 pb-4">
    <!-- Filter -->
    <div class="mt-2">
      <div class="flex items-center flex-1 rounded-full border border-[rgba(151,151,151,0.2)] text-[rgba(77,77,77,0.03)] h-[48px] px-4 shadow-md">
        <Icon name="iconamoon:search" class="text-2xl text-[#627086] mr-2" />
        <input v-model="search" type="text" placeholder="Cari Buku . . ." class="font-manrope bg-transparent placeholder-menu/30 text-menu text-base focus:outline-none w-full" />
      </div>
    </div>

    <!-- Banner -->
    <div class="w-full h-[100px] relative rounded-2xl overflow-hidden p-4">
      <NuxtImg src="/images/merchandise/background.png" alt="merchandise" class="absolute inset-0 w-full h-full object-fill -z-1" />
      <div class="w-full flex items-center justify-between gap-4">
        <div class="flex flex-col gap-[2px] font-lato">
          <h3 class="text-xl md:text-2xl font-extrabold text-white drop-shadow-lg inline-block">Buku</h3>
          <p class="text-sm md:text-base text-white font-semibold">Buku-Buku Penuh Cinta, Ilmu, dan Teladan Islami</p>
        </div>
        <div class="aspect-auto flex-shrink-0">
          <NuxtImg src="/images/books/logo.png" alt="logos" class="w-fit h-fit" />
        </div>
      </div>
    </div>

    <div class="flex justify-between items-center">
      <LabelTitle label="Buku Pilihan" />
      <!-- <NuxtImg src="/images/icons/filter-primary.svg" alt="filter-primary" class="h-6 w-6 cursor-pointer" /> -->
    </div>

    <div class="w-full">
      <div v-if="books.length" class="w-full mx-auto">
        <div class="grid grid-cols-2 gap-4">
          <CardMerchandise v-for="item in books" :key="item.id + '-merchandise'" :product="item" @click="$router.push(`/merchandise/book/${item.slug}`)" />
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
        <div v-if="isLastPage && !isLoading" class="text-center text-sm py-2"></div>
      </div>

      <!-- Empty state -->
      <div v-else-if="!isFirstLoading && books.length === 0" class="text-center py-8">
        <NuxtImg src="/images/empty.png" alt="Empty event" class="aspect-auto w-full px-12" />
      </div>

      <CardMerchandiseLoading v-if="isFirstLoading" :rows="2" :length="4" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useIntersectionObserver, watchDebounced } from '@vueuse/core';
import { urlApiProducts } from '~/constants';
import { ProductType, type Product, type ProductsResponse } from '~/types/api';

// State
const books = ref<Product[]>([]);
const page = ref(1);
const isLoading = ref(false);
const isFirstLoading = ref(true);
const isLastPage = ref(false);
const loadMoreTrigger = ref<HTMLElement | null>(null);

const search = ref('');

const buildParams = ({
  search = null,
}: {
  type?: string | null;
  search?: string | null;
} = {}) => {
  const params = new URLSearchParams();

  if (search && search !== '') {
    params.append('search', search);
  }

  params.append('type', ProductType.BOOK);
  params.append('page', String(page.value));
  params.append('per_page', '5');
  params.append('sort', '-created_at');

  return params.toString();
};

// API Call
const fetchBooks = async () => {
  if (isLoading.value || isLastPage.value) return;
  isLoading.value = true;

  try {
    const { data } = await apiSaforiginal.get<ProductsResponse>(`${urlApiProducts}?${buildParams({ search: search.value })}`);
    console.log(data.products);
    if (data.products && data.products.length > 0) {
      books.value.push(...data.products);

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
    console.error('Error fetching products:', error);
  } finally {
    isLoading.value = false;
    isFirstLoading.value = false;
  }
};

watchDebounced(
  search,
  () => {
    books.value = [];
    page.value = 1;
    isLastPage.value = false;
    isFirstLoading.value = true;

    fetchBooks();
  },
  { debounce: 500, maxWait: 1000 }
);

const { stop: stopObserver } = useIntersectionObserver(
  loadMoreTrigger,
  ([entry]) => {
    if (entry?.isIntersecting && !isLoading.value && !isLastPage.value && !isFirstLoading.value) {
      // console.log('Intersection triggered, fetching more...');
      fetchBooks();
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

onMounted(async () => {
  await fetchBooks();
});
</script>
