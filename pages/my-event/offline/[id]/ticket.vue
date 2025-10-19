<template>
  <div class="relative flex flex-col bg-[#FFF1DE]">
    <!-- Image -->
    <div class="relative aspect-2/1">
      <NuxtImg src="/images/tickets/bg-header.png" alt="background" class="absolute inset-0 w-full h-full object-fill" />

      <AppToolbar :custom="true">
        <div class="flex justify-between px-4 items-center h-full">
          <button class="h-6 w-6 inline-block cursor-pointer" @click="$router.back()">
            <Icon name="material-symbols:arrow-back-rounded" class="text-2xl text-white" />
          </button>
          <!-- SHARE BUTTON -->
          <ShareSocmed ref="share" :title="transaction?.invoice_no ?? ''" class="text-white" @click="shareSocmed">
            <button class="border border-secondary rounded-md py-1 px-3 flex justify-center items-center gap-1 cursor-pointer" @click="shareSocmed">
              <Icon name="heroicons-outline:share" class="w-4 h-4 text-xl shrink-0" />
            </button>
          </ShareSocmed>

          <!-- <button class="h-6 w-6 inline-block cursor-pointer" @click="router.back()">
            <Icon name="material-symbols:share" class="text-2xl text-white" />
          </button> -->
        </div>
      </AppToolbar>
    </div>

    <div class="px-4 -mt-30 md:-mt-50 flex-1">
      <ContentTicketData :data="transaction?.details ?? []" :invoice="transaction?.invoice_no ?? ''" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { urlApiTransactions } from '~/constants';
import type { Product, Transaction, TransactionResponse } from '~/types/api';

definePageMeta({
  layout: 'default',
  isShadow: true,
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

const share = ref();

const shareSocmed = () => {
  if (share.value) {
    share.value.handleShare();
  }
};
</script>
