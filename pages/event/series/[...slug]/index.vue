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
        <CardProductDetail
          :id="product?.id"
          :title="product?.title"
          :thumbnail="product?.cover"
          :type="product?.videos?.length + ' Episode'"
          :date="product.event_at"
          :author="product?.store?.name"
          :description="product?.description"
        />
      </div>

      <!-- Ringkasan AND Episode -->
      <div class="md:px-4">
        <Tabs default-value="ringkasan" class="w-full">
          <TabsList class="grid w-full grid-cols-2">
            <TabsTrigger value="ringkasan"> Ringkasan </TabsTrigger>
            <TabsTrigger value="episode"> Episode </TabsTrigger>
          </TabsList>
          <TabsContent value="ringkasan">
            <ContentHtml class="px-4 pt-2 pb-4" :content="product.description" />
          </TabsContent>
          <TabsContent value="episode">
            <div class="flex flex-col gap-4 px-4 pt-2 pb-4">
              <NuxtLink v-for="item in product.videos" :key="item.id" :to="item?.url ? `/event/series/video/${product.slug}` : undefined" class="w-full block">
                <ListItem
                  :label="item.title"
                  :is-icon="false"
                  :right-icon="!item?.url ? 'heroicons:lock-closed' : 'ion:chevron-forward-outline'"
                  :class-name="'border rounded-md px-4 ' + (!item?.url ? '!cursor-not-allowed' : '')"
                >
                  <template #icon>
                    <Icon name="heroicons:video-camera" class="text-2xl size-6" />
                  </template>
                </ListItem>
              </NuxtLink>
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

      <DrawerCustom v-model:open="showDrawer" title="Buying Product Video" description="Buying Product Video" :show-indicator="false" classes="h-full pb-0 !mb-0">
        <AppContainer>
          <form class="flex flex-col justify-between h-full bg-background rounded-t-2xl overflow-auto" @submit.prevent="onSubmit">
            <div class="flex flex-col shrink text-title dark:text-menu font-normal p-4">
              <div class="flex justify-between items-start">
                <h4 class="font-extrabold">Investasi Seiklasnya</h4>
                <Icon name="ion:close-outline" class="text-2xl size-6 cursor-pointer" @click="() => (showDrawer = false)" />
              </div>
              <p>Yuk pilih nominal investasi terbaik Anda</p>

              <!-- value inves -->
              <div class="flex flex-col gap-4 my-4">
                <div
                  v-for="item in dataInvestasi"
                  :key="item.id"
                  class="flex items-center justify-between w-full gap-4 p-3 cursor-pointer border rounded-lg"
                  :class="chooseValueInvestasi === item.id ? 'border-primary' : ''"
                  @click="handleChooseValueInvestasi(item.id)"
                >
                  <div class="w-full flex gap-2 font-bold">
                    <span class="text-sm">Rp</span>
                    <p>{{ currency(item.value) }}</p>
                  </div>
                  <Icon name="ion:chevron-forward-outline" class="text-2xl size-6 text-title" />
                </div>
              </div>

              <p class="mb-4">Atau masukkan investasi terbaik anda</p>

              <FormInput v-model="amount" class-name="text-right !font-extrabold" :is-number="true" :is-icon="true" :is-currency="true" :is-selected="true" :error="formErrors.amount">
                <template #icon>
                  <p class="!font-extrabold pb-1">Rp</p>
                </template>
              </FormInput>
            </div>

            <div class="bg-footer p-4">
              <Button type="submit" variant="default" class="w-full" :disabled="isSubmitDisabled"> Lanjutkan Pembayaran </Button>
            </div>
          </form>
        </AppContainer>
      </DrawerCustom>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { ProductResponse } from '~/types/api';

definePageMeta({
  layout: 'detail',
  isShadow: true,
  isPaddingTop: true,
  isPaddingBottom: true,
});

const route = useRoute();
const router = useRouter();

// ========================================
// FETCH PRODUCT WITH useAsyncData
// ========================================
const {
  data: productData,
  pending,
  error,
  refresh,
} = await useAsyncData(
  `product-series-${route.params.slug}`,
  async () => {
    try {
      const response = await apiSaforiginal.get<ProductResponse>(`/v1/products/${route.params.slug}`);
      return response.data.product;
    } catch (err) {
      console.error(`Failed to fetch product: ${route.params.slug}`, err);
      throw err;
    }
  },
  {
    server: true,
    lazy: false,
    default: () => null,
  }
);

const product = computed(() => productData.value);

// SEO Meta
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

// ========================================
// FORM STATE
// ========================================
const isLoading = ref(false);
const showDrawer = ref(false);
const chooseValueInvestasi = ref<number>();
const amount = ref('0');
const formErrors = ref<{ amount?: string }>({});

const handleBuy = () => {
  showDrawer.value = true;
};

const handleChooseValueInvestasi = (id: number) => {
  chooseValueInvestasi.value = id;
  amount.value = String(dataInvestasi.find((item) => item.id === id)?.value);
  // Clear error when selecting predefined amount
  formErrors.value.amount = undefined;
};

const dataInvestasi = [
  { id: 1, value: 1000000 },
  { id: 2, value: 500000 },
  { id: 3, value: 250000 },
  { id: 4, value: 100000 },
  { id: 5, value: 50000 },
  { id: 6, value: 25000 },
];

// Manual validation (tanpa Zod untuk avoid SSR issue)
const validateAmount = (value: string): string | undefined => {
  if (!value || value === '0') {
    return 'Jumlah wajib diisi';
  }

  const numStr = value.replace(/[.,\s]/g, '');
  const num = Number(numStr);

  if (isNaN(num)) {
    return 'Nominal tidak valid';
  }

  if (num < 10000) {
    return 'Minimal nominal adalah 10.000';
  }

  return undefined;
};

// Watch amount for validation
watch(amount, (newValue) => {
  const error = validateAmount(newValue);
  if (error) {
    formErrors.value.amount = error;
  } else {
    formErrors.value.amount = undefined;
  }
});

const isSubmitDisabled = computed(() => {
  const num = Number(String(amount.value).replace(/[.,\s]/g, ''));
  return !!formErrors.value.amount || num < 10000 || isNaN(num);
});

const onSubmit = () => {
  // Validate before submit
  const error = validateAmount(amount.value);
  if (error) {
    formErrors.value.amount = error;
    return;
  }

  const numStr = amount.value.replace(/[.,\s]/g, '');
  const num = Number(numStr);
  router.push({
    path: `/event/series/${route.params.slug}/checkout`,
    query: { amount: num },
  });
};
</script>
