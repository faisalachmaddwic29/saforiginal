<template>
  <div ref="home">
    <AppToolbar>
      <div class="flex items-center px-5 h-full gap-5 justify-between">
        <AppLogoToHome />
        <NuxtLink to="/" class="w-6 h-6">
          <Icon name="iconamoon:search" class="text-2xl text-[#627086]" />
        </NuxtLink>
      </div>
    </AppToolbar>

    <div class="flex flex-col gap-5 py-5">
      <ContentCarouselBanner />

      <!-- Category -->
      <div class="py-5">
        <LabelTitle label="Kategori" class="px-4" />

        <div class="overflow-x-auto flex whitespace-nowrap gap-4 pt-2.5 px-4">
          <Skeleton v-for="i in 5" v-show="!appStore.isCategoriesLoaded" :key="i" class="min-w-24 min-h-24 md:min-w-32 md:min-h-32 rounded-xl" />
          <CardCategory v-for="category in appStore.categories" :key="category.id" :image="category.image" :name="category.name" :color="category.color" />
          <!-- <CardCategory image="/images/category.png" name="Shirah" color="bg-[#8E5D34]" />
          <CardCategory image="/images/category2.png" name="Ustadz Salim A Fillah" color="bg-[#0E5278]" /> -->
        </div>
      </div>

      <!-- Rekomendasi -->
      <div class="">
        <LabelTitle label="Event dan Series Rekomendasi" class="px-4" />

        <div class="overflow-x-auto flex whitespace-nowrap gap-4 pt-4 px-4">
          <CardProductLoading v-if="!appStore.isProductsEventSeriesLoaded" :length="5" />

          <CardProduct
            v-for="product in appStore.productsEventSeries"
            :id="product.id + '-newest'"
            :key="product.id + '-newest'"
            :thumbnail="product.cover"
            :title="product.title"
            :slug="product.slug"
            :type="product.type"
            @click="goToDetail"
          />
        </div>
      </div>

      <!-- Newest -->
      <div class="bg-[#B7B7B71A]/50 py-5">
        <LabelWithOthers label="Event Terbaru" class="px-4" />

        <div class="overflow-x-auto flex whitespace-nowrap gap-4 pt-2.5 px-4">
          <CardProductLoading v-if="!appStore.isProductsEventNewestLoaded" :length="5" />
          <CardProduct
            v-for="product in appStore.productsEventNewest"
            :id="product.id + '-newest'"
            :key="product.id + '-newest'"
            :thumbnail="product.cover"
            :title="product.title"
            :slug="product.slug"
            :type="product.type"
            @click="goToDetail"
          />
        </div>
      </div>

      <!-- Series Terbaik -->
      <div class="">
        <LabelWithOthers label="Series Terbaik" class="px-4" />

        <div class="overflow-x-auto flex whitespace-nowrap gap-4 pt-4 px-4">
          <CardProductLoading v-if="!appStore.isProductsSeriesLoaded" :length="5" />

          <CardProduct
            v-for="product in appStore.productsSeries"
            :id="product.id + '-newest'"
            :key="product.id + '-newest'"
            :thumbnail="product.cover"
            :title="product.title"
            :slug="product.slug"
            :type="product.type"
            @click="goToDetail"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CardProduct, LabelWithOthers } from '#components';
import Skeleton from '~/components/ui/skeleton/Skeleton.vue';
import { ProductType } from '~/types/api';

const title = 'Home';

definePageMeta({
  layout: 'home',
  isShadow: true,
  isPaddingTop: true,
  isPaddingBottom: true,
});

useSeoMeta({
  title: title,
});

const router = useRouter();

const appStore = useAppStore();

onMounted(async () => {
  await appStore.fetchCategories();
  await appStore.fetchProductsEventSeries();
  await appStore.fetchProductsEventNewest([ProductType.ONLINE_EVENT, ProductType.OFFLINE_EVENT]);
  await appStore.fetchProductsSeries(ProductType.VIDEO_SERIES);
});

function goToDetail(id: string) {
  router.push(`/event/${id}`);
}
</script>
