<template>
  <div class="md:py-5 flex flex-col gap-4">
    <div class="px-4">
      <CardProductDetail
        :id="product?.id"
        :title="product?.title"
        :thumbnail="product?.cover"
        :type="product?.videos.length + ' Episode'"
        :date="product.event_at"
        :author="product?.store?.name"
        :description="product?.description"
      />
    </div>

    <!-- Ringkasan AND Episode -->
    <div class="md:px-4">
      <Tabs default-value="ringkasan" class="w-full text-menu">
        <TabsList class="grid w-full grid-cols-2">
          <TabsTrigger value="ringkasan"> Ringkasan </TabsTrigger>
          <TabsTrigger value="episode"> Episode </TabsTrigger>
        </TabsList>
        <TabsContent value="ringkasan">
          <ContentHtml class="text-sm md:text-base font-normal text-justify px-4" :content="product.description" />
        </TabsContent>
        <TabsContent value="episode">
          <div class="flex flex-col gap-4 px-4 py-2">
            <NuxtLink v-for="item in product.videos" :key="item.id" :to="product.is_free ? `/event/series/video/${product.slug}` : undefined" class="w-full block">
              <ListItem
                :label="item.title"
                :is-icon="false"
                :right-icon="!product.is_free ? 'heroicons:lock-closed' : 'ion:chevron-forward-outline'"
                :class-name="'border rounded-md px-4 ' + (!product.is_free ? '!cursor-not-allowed' : '')"
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
        <Button class="w-full" type="button" :disabled="isLoading" @click="handleBuy">{{ isLoading ? 'Loading...' : product.btn_label }}</Button>
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
            <p class="">Yuk pilih nominal investasi terbaik Anda</p>

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
                  <p class="">{{ currency(item.value) }}</p>
                </div>
                <Icon name="ion:chevron-forward-outline" class="text-2xl size-6 text-title" />
              </div>
            </div>

            <p class="mb-4">Atau masukkan investasi terbaik anda</p>

            <FormInput v-model="amount" class-name="text-right !font-extrabold" :is-number="true" :is-icon="true" :is-currency="true" :is-selected="true" :error="errors.amount">
              <template #icon>
                <p class="!font-extrabold pb-1">Rp</p>
              </template>
            </FormInput>
          </div>

          <div class="bg-footer p-4">
            <Button type="submit" variant="default" class="w-full" :disabled="isSubmitDisabled">Lanjutkan Pembayaran</Button>
          </div>
        </form>
      </AppContainer>
    </DrawerCustom>
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
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

const isLoading = ref(false);
const showDrawer = ref(false);
const chooseValueInvestasi = ref();
const router = useRouter();

const handleBuy = () => {
  showDrawer.value = true;
};

const handleChooseValueInvestasi = (id: number) => {
  chooseValueInvestasi.value = id;
  amount.value = String(dataInvestasi.find((item) => item.id === id)?.value);
};

const dataInvestasi = [
  {
    id: 1,
    value: 1000000,
  },
  {
    id: 2,
    value: 500000,
  },
  {
    id: 3,
    value: 250000,
  },
  {
    id: 4,
    value: 100000,
  },
  {
    id: 5,
    value: 50000,
  },
  {
    id: 6,
    value: 25000,
  },
];

// Schema validasi Zod - hanya required
const schema = z.object({
  amount: z.preprocess((val) => {
    // Pastikan val selalu string dan hapus tanda titik/koma
    const numStr = String(val).replace(/[.,\s]/g, '');
    const num = Number(numStr);
    return isNaN(num) ? 0 : num;
  }, z.number({ required_error: 'Jumlah wajib diisi' }).min(10000, 'Minimal nominal adalah 10.000')),
});

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    amount: '0',
  },
});

const isSubmitDisabled = computed(() => {
  // ambil nilai numeriknya (hapus titik, koma, spasi)
  const num = Number(String(amount.value).replace(/[.,\s]/g, ''));
  return !!errors.amount || num < 10000 || isNaN(num);
});

const [amount] = defineField('amount');

const onSubmit = handleSubmit(async (values) => {
  // router.push('/event/series/checkout?amount=' + values.amount);
  // router.push('/event/series/' + route.params.slug + '/checkout', { query: { amount: values.amount } });
  router.push({
    path: '/event/series/' + route.params.slug + '/checkout',
    query: { amount: values.amount },
  });
});
</script>
