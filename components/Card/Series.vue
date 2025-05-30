<template>
  <div
    class="group w-[180px] overflow-hidden cursor-pointer transition duration-200"
    @click="handleClick"
  >
    <div class="relative overflow-hidden rounded-lg h-[240px]">
      <NuxtImg
        :src="props?.thumbnail"
        :alt="altText"
        class="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-125"
      />
    </div>
    <div class="pt-1">
      <h3 class="font-bold text-sm line-clamp-1 uppercase">
        {{ props?.title }}
      </h3>

      <div
        v-if="props?.rating"
        class="w-max flex items-center text-xs gap-[3px] my-1.5 bg-rating/10 px-1 py-0.5 rounded border border-rating"
      >
        <Icon name="material-symbols:star-rounded" class="w-4 h-4 text-rating" />
        <span class="text-xs font-medium">{{ rating }}</span>
      </div>

      <div
        v-if="props?.category"
        class="w-max flex items-center text-xs gap-1 text-[#627086] dark:text-[#94A3B8]"
      >
        <Icon name="mingcute:grid-line" class="w-4 h-4" />
        <span class="text-xs">{{ props?.category }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'click', id: string): void
}>()

const props = defineProps<{
	id: string
	slug: string
  thumbnail: string
  altText?: string
  title: string
  rating?: number | string
  category?: string
}>()

function handleClick() {
  emit('click', props.slug) // emit id ke parent
}
</script>
