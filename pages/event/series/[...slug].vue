<!-- eslint-disable vue/no-v-html -->
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
          <div class="text-sm md:text-base font-normal text-justify px-4" v-html="product.description" />
        </TabsContent>
        <TabsContent value="episode">
          <div class="flex flex-col gap-4 px-4 py-2">
            <NuxtLink v-for="item in product.videos" :key="item.id" :to="product.is_free ? `/event/series/video/${product.slug}` : undefined" class="w-full block">
              <ListItem
                :label="item.title"
                :is-icon="false"
                :right-icon="!product.is_free ? 'heroicons:lock-closed' : 'ion:chevron-forward-outline'"
                :class-name="'border rounded-md px-4 ' + (product.is_free ? '!cursor-not-allowed' : '')"
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

    <div class="fixed w-full z-10 bottom-0 left-0 bg-white dark:bg-[#0F172A] shadow-[0px_-2px_4px_rgba(0,0,0,0.05)]">
      <AppContainer class="p-4">
        <Button class="w-full" type="button" :disabled="isLoading" @click="handleBuy">{{ isLoading ? 'Loading...' : product.btn_label }}</Button>
      </AppContainer>
    </div>
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

const isLoading = ref(false);

const handleBuy = () => {
  isLoading.value = true;
  alert('Maaf ini masih tahap development');
  isLoading.value = false;
};
</script>
