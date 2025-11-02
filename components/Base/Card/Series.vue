<template>
  <!--  -->
  <div class="group w-[180px] md:w-[210px] bg-transparent overflow-hidden cursor-pointer transition duration-200 flex-shrink-0" @click="handleClick">
    <div class="relative overflow-hidden rounded-lg aspect-[3/3.5]">
      <NuxtImg :src="props.thumbnail" :alt="props.id + '-thumbnail'" class="aspect-[3/4] w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" />
    </div>
    <div class="w-full pt-2.5">
      <h3 class="font-bold text-sm uppercase truncate">
        {{ props.title }}
      </h3>

      <div v-if="props.rating" class="w-max flex items-center text-xs gap-[3px] mt-0.5 mb-1 md:mb-2 md:mt-1 bg-rating/10 px-1 py-0.5 rounded border border-rating">
        <Icon name="material-symbols:star-rounded" class="w-4 h-4 text-lg text-rating" />
        <span class="text-xs font-medium">{{ rating }}</span>
      </div>

      <div v-if="props.category" class="w-max flex items-center text-xs gap-1 text-menu py-1.5">
        <Icon name="mingcute:grid-line" class="w-4 h-4 text-lg" />
        <span class="text-xs capitalize">{{ props.category }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'click', slug: string): void;
}>();

interface SeriesCardProps {
  id: string | number | undefined;
  slug: string;
  thumbnail: string | undefined;
  altText?: string;
  title: string;
  rating?: number | string;
  category?: string;
}

// Define props
const props = defineProps<SeriesCardProps>();

function handleClick() {
  emit('click', props.slug); // emit id ke parent
}
</script>
