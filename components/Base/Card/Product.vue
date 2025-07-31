<template>
  <div class="group bg-transparent overflow-hidden cursor-pointer transition duration-200 flex-shrink-0" :class="{ 'w-full': isFull, 'w-[180px] md:w-[210px]': !isFull }" @click="goToDetail">
    <div class="relative overflow-hidden rounded-lg aspect-[3/3.5]">
      <NuxtImg :src="props.thumbnail" :alt="props.id + '-thumbnail'" class="aspect-[3/4] w-full h-full object-fill transition-transform duration-500 ease-in-out group-hover:scale-110" />
    </div>
    <div class="w-full pt-2.5">
      <h3 class="font-bold text-sm uppercase truncate">
        {{ props.title }}
      </h3>

      <div v-if="props.rating" class="w-max flex items-center text-xs gap-[3px] mt-0.5 mb-1 md:mb-2 md:mt-1 bg-rating/10 px-1 py-0.5 rounded border border-rating">
        <Icon name="material-symbols:star-rounded" class="w-4 h-4 text-lg text-rating" />
        <span class="text-xs font-medium">{{ rating }}</span>
      </div>

      <div v-if="props.type" class="w-max flex items-center text-xs gap-1 text-menu py-1.5">
        <Icon :name="getIconName(props.type)" class="w-4 h-4 text-lg" />
        <span class="text-xs capitalize">{{ formatType(props.type) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ProductType } from '~/types/api';

const router = useRouter();

interface CardProductProp {
  id: string | number | undefined;
  slug: string;
  thumbnail: string | undefined;
  altText?: string;
  title: string;
  rating?: number | string;
  type: ProductType | null;
  isFull?: boolean;
}

// Define props
const props = defineProps<CardProductProp>();

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

function formatType(type: ProductType): string {
  return type.replace(/_/g, ' ');
}

function goToDetail() {
  if (props.type === ProductType.OFFLINE_EVENT) {
    router.push(`/event/offline/${props.slug}`);
  } else if (props.type === ProductType.ONLINE_EVENT) {
    router.push(`/event/online/${props.slug}`);
  } else {
    router.push(`/event/series/${props.slug}`);
  }
}

// const emit = defineEmits<{
//   (e: 'click', slug: string): void;
// }>();
// function handleClick() {
//   emit('click', props.slug); // emit id ke parent
// }
</script>
