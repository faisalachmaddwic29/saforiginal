<template>
  <div class="px-4 md:py-5">
    <CardProductDetail
      :id="product?.id"
      :title="product?.title"
      :thumbnail="product?.cover"
      :type="product?.type"
      :date="product.event_at"
      :author="product?.store?.name"
      :description="product?.description"
    />
  </div>
</template>

<script setup lang="ts">
import type { Product, ProductResponse } from '~/types/api';

definePageMeta({
  layout: 'detail',
  isShadow: true,
  isPaddingTop: true,
  isPaddingBottom: true,
});

const route = useRoute();

const { data } = await apiSaforiginal.get<ProductResponse>('/v1/products/' + route.params.slug);
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
</script>
