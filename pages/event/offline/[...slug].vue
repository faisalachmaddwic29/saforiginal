<template>
  <div class="md:py-5 flex flex-col gap-4">
    <div class="px-4">
      <CardProductDetail
        :id="product?.id"
        :title="product?.title"
        :thumbnail="product?.cover"
        :type="product?.address + ', ' + product?.location?.text"
        :date="product.event_at"
        :author="product?.store?.name"
        :description="product?.description"
      />
    </div>
    <ContentHtml class="text-menu text-sm md:text-base font-normal text-justify px-4" :content="product.description" />

    <div class="fixed w-full z-10 bottom-0 left-0 bg-footer shadow-[0px_-2px_4px_rgba(0,0,0,0.05)]">
      <AppContainer class="p-4">
        <Button class="w-full" type="button" :disabled="isLoading" @click="handleBuy">{{ isLoading ? 'Loading...' : product.btn_label }}</Button>
      </AppContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { urlApiProducts } from '~/constants';
import type { Product, ProductResponse } from '~/types/api';

definePageMeta({
  layout: 'detail',
  isShadow: true,
  isPaddingTop: true,
  isPaddingBottom: true,
});

const route = useRoute();

const { data } = await apiSaforiginal.get<ProductResponse>(urlApiProducts + '/' + route.params.slug);
const product: Product = data.product ?? {};
// Pasang SEO langsung (server-rendered)

// Pasang SEO langsung (server-rendered)
useSeoMeta({
  title: () => product.title,
  description: () => product.title?.substring(0, 150),
  ogTitle: () => product.title,
  ogDescription: () => product.title?.substring(0, 150),
  ogImage: () => product.cover,
  twitterTitle: () => product.title,
  twitterDescription: () => product.title?.substring(0, 150),
  twitterImage: () => product.cover,
});

const isLoading = ref(false);

const handleBuy = () => {
  isLoading.value = true;
  alert('Maaf ini masih tahap development');
  isLoading.value = false;
};
</script>
