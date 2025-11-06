<template>
  <div class="flex gap-6 -mx-4 md:mx-0 overflow-hidden md:rounded-xl relative z-[1] p-4 md:p-6 backdrop-blur-lg shadow-md">
    <!-- BACKDROP -->
    <NuxtImg
      v-if="props.product?.cover"
      :src="props.product?.cover"
      :alt="props?.product?.title + '-backdrop'"
      class="absolute inset-x-0 -z-[1] opacity-10 w-full top-1/2 filter blur-xs transform -translate-y-1/2"
    />

    <!-- THUMBNAIL -->
    <div v-if="props?.product?.cover" class="size-[130px] md:size-[180px] flex-shrink-0 aspect-[1/1]">
      <NuxtImg :src="props?.product?.cover ?? ''" :alt="props?.product?.title + '-thumbnail'" class="w-full rounded object-fill aspect-[1/1]" />
    </div>

    <!-- CONTENT -->
    <div class="flex flex-col flex-1 min-w-0 gap-1.5 md:gap-2.5">
      <!-- TITLE -->
      <h3 class="text-lg md:text-2xl font-bold uppercase line-clamp-2">
        {{ props.product?.title }}
      </h3>

      <!-- AUTHOR -->
      <div class="flex items-start text-xs md:text-lg gap-1 md:gap-2 text-menu">
        <Icon name="heroicons-outline:user" class="size-6 text-2xl shrink-0" />
        <span class="text-sm md:text-base">{{ props.product?.store?.name }}</span>
      </div>

      <!-- TYPE -->
      <div v-if="props.product?.type" class="flex items-start text-xs md:text-lg gap-1 md:gap-2 text-menu">
        <Icon :name="getIconName(toProductType(props.product.type) as ProductType)" class="size-6 text-2xl shrink-0" />
        <span class="text-sm md:text-base capitalize">{{ formatType(toProductType(props.product.type) as ProductType) }}</span>
      </div>

      <!-- SHARE BUTTON -->
      <ShareSocmed ref="share" :title="props?.product?.title ?? ''" class="mt-3 self-end" @click="shareSocmed">
        <button class="border border-secondary rounded-md py-1 px-3 flex justify-center items-center gap-1 cursor-pointer" @click="shareSocmed">
          <Icon name="heroicons-outline:share" class="w-4 h-4 text-xl shrink-0" />
          <span class="text-sm md:text-base font-medium">Bagikan</span>
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
