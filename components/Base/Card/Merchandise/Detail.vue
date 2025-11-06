<template>
  <div class="flex flex-col items-center -mx-4 md:mx-0 overflow-hidden md:rounded-xl relative z-[1] p-4 md:p-6 backdrop-blur-lg shadow-md">
    <!-- BACKDROP -->
    <NuxtImg
      v-if="props.product?.cover"
      :src="props.product?.cover"
      :alt="props?.product?.title + '-backdrop'"
      class="absolute inset-x-0 -z-[1] opacity-10 w-full top-1/2 filter blur-xs transform -translate-y-1/2"
    />
    <div class="w-full flex gap-6">
      <!-- THUMBNAIL -->
      <div v-if="props?.product?.cover" class="aspect-square flex-2">
        <NuxtImg :src="props?.product?.cover ?? ''" :alt="props?.product?.title + '-thumbnail'" class="aspect-square rounded object-fill" />
      </div>

      <!-- CONTENT -->
      <div class="flex flex-col flex-3 gap-1 md:gap-2 justify-between">
        <!-- TITLE -->
        <div class="flex flex-col gap-1 md:gap-2">
          <h3 class="text-lg md:text-2xl font-bold uppercase line-clamp-2">
            {{ props.product?.title }}
          </h3>

          <!-- Category + Sold -->
          <div class="flex items-center gap-4 text-sm md:text-base">
            <div class="flex items-center gap-1">
              <Icon :name="getIconName(toProductType(props.product.type) as ProductType)" class="w-5 h-5 text-secondary" />
              <span class="capitalize">{{ formatType(toProductType(props.product.type) as ProductType) }}</span>
            </div>

            <div class="flex items-center gap-1">
              <Icon name="heroicons-outline:fire" class="w-5 h-5 text-danger" />
              <span>{{ props.product?.sold ?? 0 }} terjual</span>
            </div>
          </div>
        </div>

        <!-- PRICE -->
        <div class="text-2xl md:text-4xl font-extrabold text-primary mt-1">Rp {{ currency(props.product?.price ?? 0) }}</div>
      </div>
    </div>
    <!-- STORE CARD -->
    <div class="w-full flex items-center justify-between mt-4 bg-background/40 p-3 rounded-xl shadow-sm border">
      <!-- Store -->
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-secondary/40 rounded-full overflow-hidden flex items-center justify-center">
          <Icon name="ic:baseline-store-mall-directory" class="text-3xl" />
          <!-- <NuxtImg v-if="props.product?.store?.logo" :src="props.product?.store?.logo" class="w-full h-full object-cover" /> -->
        </div>

        <div class="flex flex-col">
          <span class="font-semibold text-sm md:text-base">
            {{ props.product?.store?.name }}
          </span>

          <div class="flex items-center gap-1 text-xs text-gray-500">
            <Icon name="heroicons-outline:map-pin" class="w-4 h-4" />
            <span>{{ props.product?.store?.address ?? 'Lokasi tidak tersedia' }}</span>
          </div>
        </div>
      </div>
      <!-- SHARE BUTTON -->

      <ShareSocmed ref="share" :title="props?.product?.title ?? ''" @click="shareSocmed">
        <button class="border border-secondary rounded-md py-1 px-3 flex justify-center items-center gap-1 cursor-pointer" @click="shareSocmed">
          <Icon name="heroicons-outline:share" class="w-4 h-4 text-xl shrink-0" />
          <span class="text-xs md:text-sm font-medium">Bagikan</span>
        </button>
      </ShareSocmed>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { ProductType, toProductType, type Product } from '~/types/api';

const props = defineProps({
  product: {
    type: Object as PropType<Product> | null | undefined,
    required: true,
  },
});

const share = ref();

const shareSocmed = () => {
  if (share.value) {
    share.value.handleShare();
  }
};

function formatType(type: ProductType): string {
  return type.replace(/_/g, ' ');
}

function getIconName(type: ProductType): string {
  switch (type) {
    case ProductType.ONLINE_EVENT:
      return 'material-symbols:public';
    case ProductType.OFFLINE_EVENT:
      return 'material-symbols:location-on-outline-rounded';
    case ProductType.VIDEO_SERIES:
      return 'mingcute:grid-line';
    case ProductType.BOOK:
      return 'mdi:book-open-page-variant-outline';
    case ProductType.MERCHANDISE:
      return 'mdi:tshirt-crew-outline';
    default:
      return 'mdi:tag-outline'; // fallback
  }
}
</script>
