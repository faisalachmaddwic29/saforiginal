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
      <div class="px-4">
        <!-- <CardMerchandiseDetail :product="product" /> -->
        <CardMerchandiseDetail :product="product" />
      </div>

      <!-- Description / Kategori / Spesifikasi -->
      <div class="md:px-4">
        <Tabs default-value="description" class="w-full">
          <TabsList class="grid w-full grid-cols-2">
            <TabsTrigger value="description"> Deskripsi </TabsTrigger>
            <TabsTrigger value="spesifiction"> Spesifikasi </TabsTrigger>
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
        </Tabs>
      </div>

      <div class="fixed w-full z-10 bottom-0 left-0 bg-footer shadow-[0px_-2px_4px_rgba(0,0,0,0.05)]">
        <AppContainer class="p-4">
          <Button class="w-full" type="button" :disabled="isLoading" @click="handleBuy">
            {{ isLoading ? 'Loading...' : product.btn_label }}
          </Button>
        </AppContainer>
      </div>

      <DrawerCustom v-model:open="showDrawer" title="Buying Offline Event" description="Buying Offline Event" :show-indicator="false" classes="pb-0 !mb-0">
        <AppContainer>
          <form class="flex flex-col justify-between h-full bg-background rounded-t-2xl overflow-auto" @submit.prevent="onSubmit">
            <div class="flex flex-col shrink text-title dark:text-menu font-normal p-4">
              <div class="flex justify-between items-start">
                <h4 class="font-extrabold">Berapa jumlah yang ingin anda beli?</h4>
                <Icon name="ion:close-outline" class="text-2xl size-6 cursor-pointer" @click="() => (showDrawer = false)" />
              </div>

              <!-- value inves -->
              <div class="flex flex-col gap-4 my-4">
                <div class="flex items-center justify-between w-full gap-4 p-3 border rounded-lg">
                  <div class="w-full flex gap-2 font-bold">
                    <div class="flex flex-col">
                      <p class="font-extrabold">{{ product.title }}</p>
                      <div class="flex items-start gap-1 text-primary">
                        <span class="text-xs">Rp</span>
                        <p class="text-sm">{{ currency(product.price) }}</p>
                      </div>
                    </div>
                  </div>

                  <div class="w-50 text-sm">
                    <!-- kalau qty 0 -> tampil tombol Beli -->
                    <Button v-if="!selectedItems" type="button" variant="default" class="w-full font-bold" size="sm" @click="addItems(product.price)"> Beli </Button>

                    <!-- kalau qty > 0 -> tampil counter -->
                    <div v-else class="flex items-center justify-between border rounded overflow-hidden w-full h-8">
                      <button type="button" class="flex items-center justify-center h-full cursor-pointer px-2 active:bg-red-300 transition-colors duration-150 rounded-l" @click="decreaseItems()">
                        <Icon name="mdi:minus" class="text-base text-primary" />
                      </button>

                      <div class="flex-1 bg-footer text-center w-10 h-full font-semibold text-sm flex items-center justify-center border-x-1">{{ selectedItems?.qty }}</div>

                      <button
                        type="button"
                        class="flex items-center justify-center h-full cursor-pointer px-2 active:bg-sky-300 transition-colors duration-150 rounded-r"
                        @click="increaseItems(product?.stock ?? 1)"
                      >
                        <Icon name="mdi:plus" class="text-base text-primary" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Error message -->
              <p v-if="formError" class="text-red-500 text-sm mt-2">{{ formError }}</p>
            </div>

            <div class="bg-footer p-4 flex justify-between gap-2 items-center">
              <div class="w-full flex gap-2 font-bold">
                <div class="flex flex-col">
                  <p class="font-extrabold text-sm md:text-lg">Subtotal</p>
                  <div class="flex items-start gap-1 text-primary">
                    <span class="text-sm md:text-lg">Rp</span>
                    <p class="text-base md:text-2xl font-bold">{{ currency(totalAmount) }}</p>
                  </div>
                </div>
              </div>

              <Button type="submit" variant="default" class="w-fit text-sm md:text-lg" :disabled="isSubmitDisabled"> Lanjutkan Pembayaran </Button>
            </div>
          </form>
        </AppContainer>
      </DrawerCustom>
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
const router = useRouter();

// Gunakan useAsyncData untuk handle SSR dengan baik
const {
  data: productData,
  pending,
  error,
  refresh,
} = await useAsyncData(
  `product-book-${route.params.slug}`, // unique key untuk caching
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
const selectedItems = ref<{ qty: number; unitPrice: number } | null>(null);
const formError = ref('');

const handleBuy = () => {
  showDrawer.value = true;
};

function addItems(price: string) {
  selectedItems.value = {
    qty: 1,
    unitPrice: parseFloat(price),
  };

  formError.value = '';
}

function increaseItems(maxQty?: number) {
  const items = selectedItems.value;
  if (!items) return;

  if (maxQty && items.qty >= maxQty) return;

  items.qty++;
}

function decreaseItems() {
  const items = selectedItems.value;
  if (!items) return;

  if (items.qty > 1) {
    items.qty--;
  } else {
    selectedItems.value = null;
  }
}

const totalAmount = computed(() => {
  if (!selectedItems.value) return 0;
  return selectedItems.value.qty * selectedItems.value.unitPrice;
});

const isSubmitDisabled = computed(() => totalAmount.value <= 0);

const onSubmit = async () => {
  try {
    formError.value = '';

    console.log(selectedItems.value);

    // // Manual validation fallback
    if (selectedItems.value?.qty === 0) {
      formError.value = 'Pilih minimal 1 tiket';
      return;
    }

    if (totalAmount.value <= 0) {
      formError.value = 'Total harus lebih dari 0';
      return;
    }

    // // Navigate to checkout
    router.push({
      path: `/merchandise/book/${route.params.slug}/checkout`,
      query: {
        selectedItems: JSON.stringify(selectedItems.value),
      },
    });
  } catch (err) {
    console.error('Submit error:', err);
    formError.value = 'Terjadi kesalahan, silakan coba lagi';
  }
};
</script>
