<template>
  <div class="md:pb-5 flex flex-col gap-4">
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
      <div class="md:px-4">
        <!-- <CardMerchandiseDetail :product="product" /> -->
        <CardMerchandiseDetail :product="product" />
      </div>

      <!-- Description / Kategori / Spesifikasi -->
      <div class="md:px-4">
        <Tabs default-value="description" class="w-full">
          <TabsList class="grid w-full grid-cols-3">
            <TabsTrigger value="description"> Ringkasan </TabsTrigger>
            <TabsTrigger value="spesifiction"> Spesifikasi </TabsTrigger>
            <TabsTrigger value="investasi"> Pembayaran </TabsTrigger>
          </TabsList>
          <TabsContent value="description">
            <ContentHtml class="px-4 pb-4" :content="product.description" />
          </TabsContent>
          <TabsContent value="spesifiction">
            <!-- BOOK DETAILS -->
            <div class="px-4 md:px-6 pt-2 pb-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="flex justify-between border-b pb-2">
                  <span class="text-menu">Penulis</span>
                  <span class="font-medium">{{ product?.book?.author }}</span>
                </div>

                <div class="flex justify-between border-b pb-2">
                  <span class="text-menu">Penerbit</span>
                  <span class="font-medium">{{ product?.book?.publisher }}</span>
                </div>

                <div class="flex justify-between border-b pb-2">
                  <span class="text-menu">Tahun Terbit</span>
                  <span class="font-medium">{{ product?.book?.publish_year }}</span>
                </div>

                <div class="flex justify-between border-b pb-2">
                  <span class="text-menu">Bahasa</span>
                  <span class="font-medium">{{ product?.book?.language }}</span>
                </div>

                <div class="flex justify-between border-b pb-2">
                  <span class="text-menu">ISBN</span>
                  <span class="font-medium">{{ product?.book?.isbn }}</span>
                </div>

                <div class="flex justify-between border-b pb-2">
                  <span class="text-menu">Halaman</span>
                  <span class="font-medium">{{ product?.book?.pages }}</span>
                </div>

                <div class="flex justify-between border-b pb-2">
                  <span class="text-menu">Panjang</span>
                  <span class="font-medium">{{ product?.book?.length }} mm</span>
                </div>

                <div class="flex justify-between border-b pb-2">
                  <span class="text-menu">Lebar</span>
                  <span class="font-medium">{{ product?.book?.width }} mm</span>
                </div>

                <div class="flex justify-between border-b pb-2">
                  <span class="text-menu">Berat</span>
                  <span class="font-medium">{{ product?.book?.weight }} gram</span>
                </div>

                <div class="flex justify-between border-b pb-2">
                  <span class="text-menu">Terupdate</span>
                  <span class="font-medium">{{ product?.book?.book_updated_at }}</span>
                </div>
              </div>
            </div>
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
    </template>
  </div>
</template>

<script setup lang="ts">
import { urlApiTransactions } from '~/constants';
import type { Product, TransactionResponse } from '~/types/api';

definePageMeta({
  layout: 'detail',
  isShadow: true,
  isPaddingTop: true,
});

const route = useRoute();

// Gunakan useAsyncData untuk handle SSR dengan baik
// Gunakan useAsyncData untuk handle SSR dengan baik
const {
  data: transactionData,
  pending,
  error,
  refresh,
} = await useAsyncData(
  `product-transaction-book-${route.params.id}`, // unique key untuk caching
  async () => {
    try {
      const response = await apiSaforiginal.get<TransactionResponse>(urlApiTransactions + '/' + route.params.id);
      return response.data.transaction;
    } catch (err) {
      console.error(`Failed to fetch transaction details: ${route.params.id}`, err);
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
const transaction = computed(() => transactionData.value);
const product = computed<Product | null>(() => {
  return transaction.value?.details?.[0]?.product ?? null;
});
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
</script>
