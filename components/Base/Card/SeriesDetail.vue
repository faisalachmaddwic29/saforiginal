<template>
  <div
    class="flex gap-6 mb-8 -mx-4 md:mx-0 overflow-hidden md:rounded-xl relative z-[1] p-4 md:p-6 backdrop-blur-lg shadow-md"
  >
    <!-- BACKDROP -->
    <NuxtImg
      v-if="props.thumbnail"
      :src="props.thumbnail"
      :alt="props?.title + '-backdrop'"
      class="absolute inset-x-0 -z-[1] opacity-40 w-full top-1/2 filter blur-xl transform -translate-y-1/2"
    />

    <!-- THUMBNAIL -->
    <div class="w-[130px] md:w-[180px] flex-shrink-0 aspect-[1/1]">
      <NuxtImg
        :src="props.thumbnail"
        :alt="props?.title + '-thumbnail'"
        class="w-full rounded object-cover aspect-[1/1]"
      />
    </div>

    <!-- CONTENT -->
    <div class="flex flex-col flex-1 min-w-0 gap-1 md:gap-2.5">
      <!-- TITLE -->
      <h3 class="text-base md:text-2xl font-bold uppercase line-clamp-2">
        {{ props.title }}
      </h3>

      <!-- RATING -->
      <div
        class="w-max flex items-center text-xs md:text-lg gap-[3px] my-1.5 md:my-2 bg-rating/10 px-1 py-0.5 rounded border border-rating"
      >
        <Icon name="material-symbols:star-rounded" class="w-4 h-4 text-2xl md:w-6 md:h-6 text-rating" />
        <span class="text-sm md:text-base font-medium">{{ props.rating }}</span>
      </div>

      <!-- AUTHOR -->
      <div
        class="w-max flex items-start text-xs md:text-lg gap-1 md:gap-2 text-[#627086] dark:text-[#94A3B8]"
      >
        <Icon name="heroicons-outline:user" class="w-4 h-4 text-2xl md:w-6 md:h-6" />
        <span class="text-sm md:text-base">{{ props.author }}</span>
      </div>

      <!-- DATE -->
      <div
        v-if="props.date"
        class="w-max flex items-start text-xs md:text-lg gap-1 md:gap-2 text-[#627086] dark:text-[#94A3B8]"
      >
        <Icon name="heroicons-outline:calendar" class="w-4 h-4 text-2xl md:w-6 md:h-6" />
        <span class="text-sm md:text-base">{{ formatDate(props.date) }}</span>
      </div>

      <!-- EPISODE -->
      <div
        class="w-max flex items-start text-xs md:text-lg gap-1 md:gap-2 text-[#627086] dark:text-[#94A3B8]"
      >
        <Icon name="mingcute:grid-line" class="w-4 h-4 text-2xl md:w-6 md:h-6" />
        <span class="text-sm md:text-base">{{ props.episode }} Episode</span>
      </div>

      <!-- SHARE BUTTON -->
      <button
        class="mt-auto self-end border border-secondary rounded-md py-1 px-3 flex justify-center items-center gap-1 cursor-pointer"
        @click="showAlert"
      >
        <Icon name="heroicons-outline:share" class="w-4 h-4 text-2xl" />
        <span class="text-sm md:text-base font-medium">Bagikan</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// Props interface
interface EventCardProps {
  title: string | undefined
  rating: number | string
  author: string
  date: string | null
  episode: number | string
  thumbnail: string | undefined
}

// Define props
const props = defineProps<EventCardProps>()

// Share alert
const showAlert = () => {
  alert('Bagikan')
}

// Date formatter
const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(date).toLocaleDateString('id-ID', options)
}
</script>
