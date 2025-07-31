<template>
  <div>
    <AppToolbar>
      <div class="flex items-center px-4 h-full gap-4 justify-between">
        <!-- Search input -->
        <div class="flex items-center flex-1 rounded-full border border-[rgba(151,151,151,0.2)] text-[rgba(77,77,77,0.03)] h-[48px] px-4">
          <Icon name="iconamoon:search" class="text-2xl text-[#627086] mr-2" />

          <input type="text" placeholder="Masukan pencarian kamu" class="font-manrope bg-transparent placeholder-menu/30 text-menu text-base focus:outline-none w-full" />
        </div>

        <NuxtImg src="/images/icons/filter.svg" alt="filter" class="h-6 w-6 cursor-pointer" @click="handleFilter" />
      </div>
    </AppToolbar>
    <div class="p-4">
      <LabelTitle label="Temukan Event yang kamu cari" />

      <!-- Shimmer loading state -->
      <div class="py-4">
        <CardLoading v-if="isFirstLoading" :rows="2" :length="4" />

        <div v-else class="grid grid-cols-2 gap-4">
          <CardProduct
            v-for="product in events"
            :id="product.id + '-events'"
            :key="product.id + '-events'"
            :is-full="true"
            :thumbnail="product.cover"
            :title="product.title"
            :slug="product.slug"
            :type="toProductType(product.type)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CardProduct } from '#components';
import { useIntersectionObserver } from '@vueuse/core';
import { toProductType, type Product, type ProductsResponse } from '~/types/api';

const title = 'Event';
definePageMeta({
  layout: 'home',
  isShadow: true,
  isPaddingTop: true,
  isPaddingBottom: true,
  title: title,
});

useSeoMeta({
  title: title,
});

const route = useRoute();
const type = computed(() => (route.query.type as string | undefined) ?? null);
const category = computed(() => (route.query.category as string | undefined) ?? null);

const events = ref<Product[]>([]);
const page = ref(1);
const isLoading = ref(false);
const isFirstLoading = ref(true);
const isLastPage = ref(false);
const loadMoreTrigger = ref<HTMLElement | null>(null);

const fetchEvents = async () => {
  if (isLoading.value || isLastPage.value) return;
  isLoading.value = true;

  try {
    // const { data } = await apiSaforiginal.get<ProductsResponse>(`/v1/products?type=${type}&page=${page.value}&per_page=10&sort=-created_at`);

    const { data } = await apiSaforiginal.get<ProductsResponse>(`/v1/products?${buildParams({ type: type.value, category: category.value })}`);

    if (data.products && data.products.length > 0) {
      events.value.push(...data.products);
      page.value++;
    } else {
      isLastPage.value = true;
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  } finally {
    isLoading.value = false;
    isFirstLoading.value = false;
  }
};

const buildParams = ({
  type = null,
  category = null,
}: {
  type?: string | null;
  category?: string | null;
} = {}) => {
  const params = new URLSearchParams();

  if (category) {
    params.append('category', category);
  }

  if (type) {
    params.append('type', type);
  }

  params.append('page', String(page.value));
  params.append('per_page', '10');
  params.append('sort', '-created_at');

  return params.toString();
};

// Watch type changes

watch(
  () => route.query.type,
  () => {
    // Reset data
    events.value = [];
    page.value = 1;
    isLastPage.value = false;
    isFirstLoading.value = true;

    fetchEvents();
  },
  { immediate: true, deep: true }
);

// Observer untuk infinite scroll
useIntersectionObserver(
  loadMoreTrigger,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      fetchEvents();
    }
  },
  { rootMargin: '0px', threshold: 1.0 }
);

const handleFilter = () => {
  console.log('handleFilter');
};
</script>
