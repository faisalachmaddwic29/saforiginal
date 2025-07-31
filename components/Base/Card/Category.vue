<template>
  <div class="relative min-w-24 min-h-24 md:min-w-32 md:min-h-32 w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden cursor-pointer" @click="detailCategoryOthers(props.slug)">
    <!-- Background Image -->
    <NuxtImg v-if="props.image" :src="props.image" :alt="props.name" class="absolute inset-0 w-full h-full object-cover" />
    <div v-else class="absolute inset-0 w-full h-full bg-primary"></div>
    <!-- Background Color -->

    <!-- Overlay semi-transparan biar teks lebih terbaca -->
    <div class="absolute inset-0 opacity-60 w-full h-full" :style="{ backgroundColor: props.color ?? '#000000' }" />

    <!-- Text -->
    <div class="relative z-10 p-2.5 h-full">
      <p class="font-semibold font-poppins text-xs md:text-base text-white leading-tight break-words text-wrap" style="text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25)">
        {{ props.name }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  name: string;
  slug: string;
  image?: string | null;
  color?: string | null;
}

const props = withDefaults(defineProps<Props>(), {
  color: '#000000',
  image: null,
});

const detailCategoryOthers = (category: string) => {
  navigateTo({
    path: '/event/',
    query: {
      category,
    },
  });
};

// interface Emits {
//   (e: 'click', payload?: unknown): void;
// }

// const emit = defineEmits<Emits>();

// const handleClick = () => {
//   emit('click');
// };
</script>
