<template>
  <div
    class="flex gap-4 -mx-4 md:mx-0 overflow-hidden md:rounded relative z-[1] p-4 md:p-6 backdrop-blur-lg shadow-md"
    :class="{ 'pointer-events-none': props.isShowEvent, 'cursor-pointer': !props.isShowEvent }"
    @click="goToDetail"
  >
    <!-- BACKDROP -->
    <NuxtImg v-if="props.thumbnail" :src="props.thumbnail" :alt="props?.title + '-backdrop'" class="absolute inset-x-0 -z-[1] opacity-10 w-full top-1/2 filter blur-xs transform -translate-y-1/2" />

    <!-- THUMBNAIL -->
    <div class="size-[130px] md:size-[180px] flex-shrink-0 aspect-[1/1]">
      <NuxtImg :src="props?.thumbnail ?? ''" :alt="props?.title + '-thumbnail'" class="w-full rounded object-fill aspect-[1/1]" />
    </div>

    <!-- CONTENT -->
    <div class="flex flex-col flex-1 min-w-0 gap-1.5 md:gap-2.5">
      <!-- TITLE -->
      <h3 class="text-sm md:text-base font-bold uppercase line-clamp-2">
        {{ props.title }}
      </h3>

      <!-- AUTHOR -->
      <div class="w-max flex items-center text-xs gap-1 text-menu">
        <Icon name="heroicons-outline:user" class="size-6 text-xl md:text-2xl shrink-0" />
        <span class="text-sm md:text-base">{{ props.author }}</span>
      </div>

      <!-- DATE -->
      <div v-if="props.date" class="w-max flex items-center text-xs gap-1 text-menu">
        <Icon name="heroicons-outline:calendar" class="size-6 text-xl md:text-2xl shrink-0" />
        <span class="text-sm md:text-base">{{ formatDate(props.date) }}</span>
      </div>

      <!-- TYPE -->
      <div v-if="props.type" class="w-max flex items-center text-xs gap-1 text-menu">
        <Icon :name="getIconName(props.type)" class="size-6 text-xl md:text-2xl shrink-0" />
        <span class="text-sm md:text-base capitalize">{{ formatType(props.type) }}</span>
      </div>

      <!-- Show Event -->
      <button v-if="props.isShowEvent" class="border border-secondary rounded-md w-fit ml-auto py-1 px-3 flex justify-center items-center gap-1 cursor-pointer" @click="goToDetail()">
        <span class="text-sm md:text-base font-medium">Lihat Event</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ProductType } from '~/types/api';

const router = useRouter();
// Props interface
interface EventCardProps {
  title?: string | undefined | null;
  rating?: number | string | null;
  author?: string | null;
  date?: string | null;
  type: ProductType | null;
  thumbnail?: string | undefined | null;
  isFull?: boolean;
  isShowEvent?: boolean;
  slug?: string | null;
}

// Define props
const props = defineProps<EventCardProps>();

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

// Date formatter
const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('id-ID', options);
};
</script>
