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
    <ContentHtml class="text-menu px-4 pb-4" :content="product.description" />

    <div class="pb-[110px]"></div>

    <div class="fixed w-full z-10 bottom-0 left-0 bg-footer shadow-[0px_-2px_4px_rgba(0,0,0,0.05)]">
      <AppContainer class="flex flex-col gap-3 p-4">
        <Button variant="outline" size="lg" class="w-full cursor-pointer" @click="$router.push('/my-event/offline/' + transaction.id + '/ticket')">Lihat Tiket</Button>
        <Button variant="default" size="lg" class="w-full cursor-pointer" @click="$router.push('/event/offline/' + product.slug)">Pesan Lagi</Button>
      </AppContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { urlApiTransactions } from '~/constants';
import type { Product, Transaction, TransactionResponse } from '~/types/api';

definePageMeta({
  layout: 'detail',
  isShadow: true,
  isPaddingTop: true,
});

const route = useRoute();

const { data } = await apiSaforiginal.get<TransactionResponse>(urlApiTransactions + '/' + route.params.id);
const product: Product = data.transaction?.details[0].product ?? {};
const transaction: Transaction = data.transaction ?? {};

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
