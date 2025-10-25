<template>
  <div
    class="flex gap-4 -mx-4 md:mx-0 overflow-hidden md:rounded relative z-[1] p-4 md:p-3 backdrop-blur-lg shadow-md"
    :class="{ 'cursor-pointer': !props.isShowEvent && props.transactionId }"
    @click="!props.isShowEvent && props.transactionId ? goToDetail() : null"
  >
    <!-- BACKDROP -->
    <NuxtImg
      v-if="props.product?.cover"
      :src="props.product?.cover"
      :alt="props?.product?.title + '-backdrop'"
      class="absolute inset-x-0 -z-[1] opacity-10 w-full top-1/2 filter blur-xs transform -translate-y-1/2"
    />

    <!-- THUMBNAIL -->
    <div class="size-[130px] mdaspect-180px] flex-shrink-0 aspect-[1/1]">
      <NuxtImg :src="props.product?.cover ?? ''" :alt="props?.product?.title + '-thumbnail'" class="w-full rounded object-fill aspect-[1/1]" />
    </div>

    <!-- CONTENT -->
    <div class="flex flex-col flex-1 min-w-0 gap-1.5 md:gap-2.5">
      <!-- TITLE -->
      <h3 class="text-sm md:text-base font-bold uppercase line-clamp-2">
        {{ props?.product?.title }}
      </h3>

      <!-- AUTHOR -->
      <div class="flex items-start text-xs gap-1 text-menu">
        <Icon name="heroicons-outline:user" class="size-6 text-xl md:text-2xl shrink-0" />
        <span class="text-sm md:text-base">{{ props?.product?.store?.name }}</span>
      </div>

      <!-- DATE -->
      <div v-if="props?.product?.event_at" class="flex items-start text-xs gap-1 text-menu">
        <Icon name="heroicons-outline:calendar" class="size-6 text-xl md:text-2xl shrink-0" />
        <span class="text-sm md:text-base">{{ props?.product?.event_at ? formatDate(props?.product?.event_at) : '' }}</span>
      </div>

      <!-- TYPE -->
      <div v-if="props?.product?.type" class="flex items-start text-xs gap-1 text-menu">
        <Icon :name="getIconName(props?.product?.type as ProductType)" class="size-6 text-xl md:text-2xl shrink-0" />
        <span class="text-sm md:text-base capitalize break-all">{{ finalType }}</span>
      </div>

      <!-- Show Event -->
      <button
        v-if="props.isShowEvent && props.transactionId"
        class="border border-secondary rounded-md w-fit ml-auto py-1 px-3 flex justify-center items-start gap-1 cursor-pointer"
        @click="goToDetail()"
      >
        <span class="text-sm md:text-base font-medium">Lihat Event</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ProductType, type Product } from '~/types/api';

const router = useRouter();
// Props interface
// Define props
const props = defineProps({
  product: {
    type: Object as PropType<Product> | null | undefined,
    required: true,
  },
  isFull: {
    type: Boolean,
    default: false,
  },
  isShowEvent: {
    type: Boolean,
    default: false,
  },
  transactionId: {
    type: String,
    default: null,
  },
  transactionStatus: {
    type: String,
    default: null,
  },
});

const finalType = computed(() => {
  switch (props.product?.type) {
    case ProductType.ONLINE_EVENT:
      return 'Online Event';
    case ProductType.OFFLINE_EVENT:
      return `${props?.product?.address}${props?.product?.location?.text ? `, ${props.product.location.text}` : ''}`;
    case ProductType.VIDEO_SERIES:
      return props?.product?.videos.length + ' Episode';
    case ProductType.BOOK:
      return 'mdi:book-open-page-variant-outline';
    case ProductType.MERCHANDISE:
      return 'mdi:tshirt-crew-outline';
    default:
      return 'mdi:tag-outline'; // fallback
  }
});

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

function goToDetail() {
  console.log(props?.transactionStatus);
  if (props?.product?.type === ProductType.OFFLINE_EVENT) {
    if (props?.transactionStatus == 'paid') {
      router.push(`/my-event/offline/${props.transactionId}`);
    } else {
      router.push(`/event/offline/${props?.product?.slug}`);
    }
  } else if (props?.product?.type === ProductType.ONLINE_EVENT) {
    if (props?.transactionStatus == 'paid') {
      router.push(`/my-event/online/${props.transactionId}`);
    } else {
      router.push(`/event/online/${props?.product?.slug}`);
    }
  } else {
    if (props?.transactionStatus == 'paid') {
      router.push(`/my-event/series/${props.transactionId}`);
    } else {
      router.push(`/event/series/${props?.product?.slug}`);
    }
  }
}
// Date formatter
const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString('id-ID', options);
};
</script>
