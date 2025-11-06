<template>
  <div class="md:py-5 flex flex-col gap-4">
    <!-- Loading State -->
    <div v-if="pending" class="px-4 py-8 text-center">
      <CardMerchandiseDetailLoading />
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="px-4 py-8 text-center">
      <p class="text-red-500 mb-4">{{ error.message || 'Failed to load product' }}</p>
      <Button @click="refresh">Retry</Button>
    </div>

    <!-- Success State -->
    <template v-else-if="product">
      <div class="px-4">
        <CardMerchandiseDetail :product="product" />
      </div>
      <ContentHtml class="px-4 pb-4" :content="product.description" />

      <div class="fixed w-full z-10 bottom-0 left-0 bg-footer shadow-[0px_-2px_4px_rgba(0,0,0,0.05)]">
        <AppContainer class="p-4">
          <Button class="w-full" type="button" :disabled="isLoading" @click="handleBuy">
            {{ isLoading ? 'Loading...' : product.btn_label }}
          </Button>
        </AppContainer>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { urlApiProducts } from '~/constants';
import type { ProductResponse } from '~/types/api';

definePageMeta({
  layout: 'detail',
  isShadow: true,
  isPaddingTop: true,
  isPaddingBottom: true,
});

const route = useRoute();

// Gunakan useAsyncData untuk handle SSR dengan baik
const {
  data: productData,
  pending,
  error,
  refresh,
} = await useAsyncData(
  `product-ekslusif-${route.params.slug}`, // unique key untuk caching
  async () => {
    try {
      const response = await apiSaforiginal.get<ProductResponse>(`${urlApiProducts}/${route.params.slug}`);
      return response.data.product;
    } catch (err) {
      console.error(`Failed to fetch product details: ${route.params.slug}`, err);
      throw err; // Throw error agar useAsyncData bisa handle
    }
  },
  {
    // Options untuk optimasi
    server: true, // Fetch di server
    lazy: false, // Tidak lazy load
    default: () => null, // Default value
  }
);

// Computed untuk akses product dengan type safety
const product = computed(() => productData.value);

// SEO Meta dengan watch untuk reactive update
watchEffect(() => {
  if (product.value) {
    useSeoMeta({
      title: product.value.title,
      description: product.value.title?.substring(0, 150),
      ogTitle: product.value.title,
      ogDescription: product.value.title?.substring(0, 150),
      ogImage: product.value.cover,
      twitterTitle: product.value.title,
      twitterDescription: product.value.title?.substring(0, 150),
      twitterImage: product.value.cover,
    });
  }
});

const isLoading = ref(false);
const showDrawer = ref(false);

const handleBuy = () => {
  showDrawer.value = true;
};
</script>
