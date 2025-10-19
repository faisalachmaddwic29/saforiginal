<template>
  <div class="mx-4 md:py-5 flex flex-col gap-4">
    <!-- Video -->
    <div class="rounded overflow-hidden border">
      <iframe :key="playVideo" :src="getEmbedUrl(playVideo)" class="aspect-video w-full h-full" frameborder="0" allowfullscreen allow="autoplay; fullscreen; encrypted-media" />
    </div>

    <!-- cannot play video -->
    <div class="border border-[#EDEDED]/20 flex items-center justify-between gap-3 rounded-md p-2 shadow">
      <div class="flex gap-3 items-center">
        <Icon name="famicons:information-circle-outline" class="text-2xl size-6 text-info" />
        <p class="text-menu text-xs md:text-sm">Tidak dapat memainkan video?</p>
      </div>
      <a target="_blank" class="border border-danger text-danger text-xs md:text-sm px-2 py-1 rounded cursor-pointer" :href="getYoutubeWatchUrl(playVideo)">Saksikan di Youtube</a>
    </div>

    <!-- Detail  -->
    <div class="flex items-center gap-4">
      <!-- THUMBNAIL -->
      <div class="size-20 bg-white rounded shrink-0 overflow-hidden">
        <NuxtImg :src="product?.cover ?? ''" :alt="product?.title + '-thumbnail'" class="w-full h-full object-fill" />
      </div>

      <!-- CONTENT -->
      <div class="flex flex-col shrink-0 flex-1 min-w-0 gap-1 self-start">
        <!-- TITLE -->
        <h3 class="text-sm md:text-base font-bold uppercase">
          {{ product.title }}
        </h3>

        <!-- TYPE -->
        <div class="flex items-start text-xs md:text-lg gap-1 md:gap-2 text-menu">
          <Icon name="mingcute:grid-line" class="size-6 text-xl shrink-0" />
          <span class="text-sm md:text-base">Event Online</span>
        </div>

        <div v-if="product?.event_at" class="flex items-start text-xs md:text-lg gap-1 md:gap-2 text-menu">
          <Icon name="uil:calender" class="size-6 text-xl shrink-0" />
          <span class="text-sm md:text-base">{{ product?.event_at ? formatDate(product?.event_at).full_long_date_time : '-' }}</span>
        </div>
      </div>

      <!-- SHARE BUTTON -->
      <ShareSocmed ref="share" :title="product?.title ?? ''" @click="shareSocmed">
        <button class="border border-secondary rounded-md py-1 px-3 flex justify-center items-center gap-1 cursor-pointer">
          <Icon name="heroicons-outline:share" class="size-6 text-xl shrink-0" />
          <span class="text-xs md:text-base font-medium hidden md:block">Bagikan</span>
        </button>
      </ShareSocmed>
    </div>

    <!-- Ringkasan AND Episode AND Investasi -->
    <div class="">
      <Tabs default-value="ringkasan" class="w-full">
        <TabsList class="grid w-full grid-cols-2">
          <TabsTrigger value="ringkasan"> Ringkasan </TabsTrigger>
          <TabsTrigger value="investasi"> Investasi </TabsTrigger>
        </TabsList>
        <TabsContent value="ringkasan">
          <ContentHtml class="px-4 pt-2 pb-4" :content="product.description" />
        </TabsContent>
        <TabsContent value="investasi">
          <div class="px-4 pt-2 pb-4">
            <div class="flex flex-col text-sm md:text-base space-y-2 divide-y-2 border-y-2 py-1">
              <div class="flex justify-between pb-1">
                <p>Tanggal Pembayaran</p>
                <p>{{ transaction?.expired_at ? formatDate(transaction?.expired_at).full_long_date_time : '-' }}</p>
              </div>
              <div class="flex justify-between pb-1">
                <p>Nomor Invoice</p>
                <p>{{ transaction?.invoice_no ?? '-' }}</p>
              </div>
              <div class="flex flex-col pb-1">
                <div class="flex justify-between pb-1">
                  <p>Metode Pembayaran</p>
                  <p class="uppercase">{{ transaction?.payment?.payment_method ?? '-' }}</p>
                </div>
                <div class="flex justify-between pb-1">
                  <p>Nominal Transaksi</p>
                  <p>{{ currency(transaction?.total ?? 0) }}</p>
                </div>
                <div v-if="transaction?.discount != null && parseFloat(transaction?.discount?.toString()) > 0" class="flex justify-between pb-1">
                  <p>Diskon</p>
                  <p>{{ currency(transaction?.discount ?? 0) }}</p>
                </div>
                <div
                  v-if="transaction?.dpp != null && parseFloat(transaction?.dpp?.toString()) > 0 && transaction?.discount != null && parseFloat(transaction?.discount?.toString()) > 0"
                  class="flex justify-between pb-1"
                >
                  <p>DPP</p>
                  <p>{{ currency(transaction?.dpp ?? 0) }}</p>
                </div>
                <div v-if="transaction?.tax != null && parseFloat(transaction?.tax?.toString()) > 0" class="flex justify-between pb-1">
                  <p>Pajak</p>
                  <p>{{ currency(transaction?.tax ?? 0) }}</p>
                </div>
                <div v-if="transaction?.admin_fee != null && parseFloat(transaction?.admin_fee?.toString()) > 0" class="flex justify-between pb-1">
                  <p>Biaya Admin</p>
                  <p>{{ currency(transaction?.admin_fee ?? 0) }}</p>
                </div>
              </div>
            </div>
            <div class="flex justify-between pt-1 text-base md:text-lg font-bold">
              <p>Total</p>
              <p>{{ currency(transaction?.grand_total ?? 0) }}</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
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

const playVideo = ref<string>('');

// Set default di onMounted
onMounted(() => {
  if (product.event_url) {
    playVideo.value = product.event_url;
  }
});
</script>
