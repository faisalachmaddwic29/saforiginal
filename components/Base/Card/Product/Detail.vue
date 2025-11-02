<template>
  <div class="flex gap-6 -mx-4 md:mx-0 overflow-hidden md:rounded-xl relative z-[1] p-4 md:p-6 backdrop-blur-lg shadow-md">
    <!-- BACKDROP -->
    <NuxtImg v-if="props.thumbnail" :src="props.thumbnail" :alt="props?.title + '-backdrop'" class="absolute inset-x-0 -z-[1] opacity-10 w-full top-1/2 filter blur-xs transform -translate-y-1/2" />

    <!-- THUMBNAIL -->
    <div class="size-[130px] md:size-[180px] flex-shrink-0 aspect-[5/6]">
      <NuxtImg :src="props?.thumbnail ?? ''" :alt="props?.title + '-thumbnail'" class="w-full rounded object-fill aspect-[5/6]" />
    </div>

    <!-- CONTENT -->
    <div class="flex flex-col flex-1 min-w-0 gap-1.5 md:gap-2.5">
      <!-- TITLE -->
      <h3 class="text-lg md:text-2xl font-bold uppercase line-clamp-2">
        {{ props.title }}
      </h3>

      <!-- AUTHOR -->
      <div class="flex items-start text-xs md:text-lg gap-1 md:gap-2 text-menu">
        <Icon name="heroicons-outline:user" class="size-6 text-2xl shrink-0" />
        <span class="text-sm md:text-base">{{ props.author }}</span>
      </div>

      <!-- DATE -->
      <div v-if="props.date" class="flex items-start text-xs md:text-lg gap-1 md:gap-2 text-menu">
        <Icon name="heroicons-outline:calendar" class="size-6 text-2xl shrink-0" />
        <span class="text-sm md:text-base">{{ formatDate(props.date) }}</span>
      </div>

      <!-- TYPE -->
      <div class="flex items-start text-xs md:text-lg gap-1 md:gap-2 text-menu">
        <Icon name="mingcute:grid-line" class="size-6 text-2xl shrink-0" />
        <span class="text-sm md:text-base">{{ props.type }}</span>
      </div>

      <!-- SHARE BUTTON -->
      <ShareSocmed ref="share" :title="props?.title ?? ''" class="mt-3 self-end" @click="shareSocmed">
        <button class="border border-secondary rounded-md py-1 px-3 flex justify-center items-center gap-1 cursor-pointer" @click="shareSocmed">
          <Icon name="heroicons-outline:share" class="w-4 h-4 text-xl shrink-0" />
          <span class="text-sm md:text-base font-medium">Bagikan</span>
        </button>
      </ShareSocmed>
    </div>
  </div>
</template>

<script setup lang="ts">
const share = ref();

const shareSocmed = () => {
  if (share.value) {
    share.value.handleShare();
  }
};

// Props interface
interface EventCardProps {
  title?: string | undefined | null;
  rating?: number | string | null;
  author?: string | null;
  date?: string | null;
  type?: number | string | null;
  thumbnail?: string | undefined | null;
  isFull?: boolean;
}

// Define props
const props = defineProps<EventCardProps>();

// Share alert

// Date formatter
const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('id-ID', options);
};
</script>
