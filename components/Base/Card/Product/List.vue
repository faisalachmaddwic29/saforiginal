<template>
  <div class="flex gap-x-4 items-center cursor-pointer" @click="goToDetail">
    <div class="shrink-0 size-15 bg-primary/40 rounded-xl shadow overflow-hidden">
      <NuxtImg class="w-full h-full object-cover" :src="props?.thumbnail" :alt="props?.title" />
    </div>
    <h4 class="font-bold text-sm text-ellipsis line-clamp-2 md:line-clamp-3 text-title">{{ props.title }}</h4>
  </div>
</template>

<script setup lang="ts">
import { ProductType } from '~/types/api';

interface EventCardProps {
  id: string | number | undefined;
  slug: string;
  thumbnail: string | undefined;
  title: string;
  type: ProductType | null;
}

// Define props
const props = defineProps<EventCardProps>();
const router = useRouter();

function goToDetail() {
  if (props.type === ProductType.OFFLINE_EVENT) {
    router.push(`/event/offline/${props.slug}`);
  } else if (props.type === ProductType.ONLINE_EVENT) {
    router.push(`/event/online/${props.slug}`);
  } else {
    router.push(`/event/series/${props.slug}`);
  }
}
</script>
