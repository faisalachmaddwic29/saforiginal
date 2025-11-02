<template>
  <div
    class="group cursor-pointer w-full bg-background rounded overflow-hidden flex-shrink-0"
    @click="handleClick"
  >
    <div class="flex gap-2.5 p-4 border border-[rgba(148,163,184,0.12)] rounded-t">
      <!-- Image -->
      <div class="relative overflow-hidden rounded w-[130px] h-[130px] md:w-[180px] md:h-[180px]">
        <NuxtImg
          :src="props?.thumbnail"
          :alt="props?.id"
          class="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        />
      </div>

      <!-- Content -->
      <div class="flex flex-col flex-1 min-w-0 gap-1 md:gap-2.5">
        <h3 class="text-base md:text-2xl font-bold uppercase line-clamp-3">
          {{ props?.title }}
        </h3>

        <!-- author -->
        <div class="w-max flex items-start text-xs md:text-lg gap-1 md:gap-2 text-menu">
          <Icon name="heroicons-outline:user" class="w-4 h-4 text-2xl md:w-6 md:h-6" />
          <span class="text-sm md:text-base">{{ props?.author }}</span>
        </div>
        <!-- Date -->
        <div
          v-if="props?.date"
          class="w-max flex items-start text-xs md:text-lg gap-1 md:gap-2 text-menu"
        >
          <Icon name="heroicons-outline:calendar" class="w-4 h-4 text-2xl md:w-6 md:h-6" />
          <span class="text-sm md:text-base">{{ dateFormat(props?.date) }}</span>
        </div>
        <!-- Episode -->
        <div class="w-max flex items-start text-xs md:text-lg gap-1 md:gap-2 text-menu">
          <Icon name="mingcute:grid-line" class="w-4 h-4 text-2xl md:w-6 md:h-6" />
          <span class="text-sm md:text-base">{{ props?.episode }} Episode</span>
        </div>
      </div>
    </div>

    <div class="flex justify-between items-center gap-2.5 px-4 py-2 bg-[#F4F4F4] dark:bg-[#091122]">
      <div class="flex flex-col">
        <p class="text-xs md:text-base font-normal text-menu">Beri ulasan pembelian ini</p>
        <StarRating :rating="props.rating" class="my-[5px]" />
        <p class="font-manrope text-xs md:text-base font-normal">{{ props.review }}</p>
      </div>

      <div class="flex gap-2.5 h-7">
        <button v-if="!props.review" class="text-sm md:text-base btn-secondary">Beri Ulasan</button>
        <button v-if="props.review" class="text-sm md:text-base btn-secondary-outline">
          Perbarui
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const dateFormat = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString('id-ID', options);
};

const emit = defineEmits<{
  (e: 'click', id: string): void;
}>();

const props = defineProps({
  thumbnail: {
    type: String,
    default: '/images/sample.png',
  },
  id: {
    type: String,
    default: '1',
  },
  date: {
    type: String,
    default: null,
  },
  title: {
    type: String,
    default: 'Series Ramadhan Perempuan Peradaban',
  },
  rating: {
    type: Number,
    default: 4.8,
  },
  episode: {
    type: Number,
    default: 29,
  },
  author: {
    type: String,
    default: 'SAF Original',
  },
  review: {
    type: String,
    default: null,
  },
});

function handleClick() {
  emit('click', props.id); // emit id ke parent
}
</script>
