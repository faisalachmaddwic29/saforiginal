<template>
  <div>
    <AppToolbar>
      <div class="flex items-center px-4 h-full gap-4 justify-between">
        <!-- Search input -->
        <div class="flex items-center flex-1 rounded-full border border-[rgba(151,151,151,0.2)] text-[rgba(77,77,77,0.03)] h-[48px] px-4">
          <Icon name="iconamoon:search" class="text-2xl text-[#627086] mr-2" />

          <input
            type="text"
            placeholder="Masukan pencarian kamu"
            class="font-manrope bg-transparent placeholder-[#B0B4C0] text-[#4B5563] dark:placeholder-[#4B5563] dark:text-[#B0B4C0] text-base focus:outline-none w-full"
          />
        </div>

        <NuxtImg src="/images/icons/filter.svg" alt="filter" class="h-6 w-6" />
      </div>
    </AppToolbar>
    <div class="p-4">
      <LabelTitle label="Temukan Event yang kamu cari" />

      <!-- Shimmer loading state -->
      <div class="py-4">
        <CardLoading v-if="isFirstLoading" :rows="2" :length="5" />

        <div v-else class="grid grid-cols-2 gap-4">
          <CardProduct
            v-for="product in events"
            :id="product.id + '-events'"
            :key="product.id + '-events'"
            :is-full="true"
            :thumbnail="product.cover"
            :title="product.title"
            :slug="product.slug"
            :type="product.type"
            @click="goToDetail(product.slug, product.type)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CardProduct } from '#components';
import { useIntersectionObserver } from '@vueuse/core';
import { ProductType, type Product, type ProductsResponse } from '~/types/api';

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

const router = useRouter();
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
    const { data } = await apiSaforiginal.get<ProductsResponse>(`/v1/products?page=${page.value}&per_page=10&sort=-created_at`);

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

onMounted(async () => {
  await fetchEvents();
});

function goToDetail(slug: string, type: string) {
  if (type === ProductType.OFFLINE_EVENT) {
    router.push(`/event/offline/${slug}`);
  } else if (type === ProductType.ONLINE_EVENT) {
    router.push(`/event/online/${slug}`);
  } else {
    router.push(`/event/series/${slug}`);
  }
}
</script>
