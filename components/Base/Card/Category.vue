<template>
  <div
    class="relative w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden cursor-pointer"
    @click="handleClick"
  >
    <!-- Background Image -->
    <NuxtImg
      :src="props.image"
      :alt="props.name"
      class="absolute inset-0 w-full h-full object-cover"
    />

    <!-- Overlay semi-transparan biar teks lebih terbaca -->
    <div class="absolute inset-0 opacity-60" :class="props?.color" />

    <!-- Text -->
    <div class="relative z-10 p-2.5 h-full">
      <p
        class="font-semibold font-poppins text-xs md:text-base text-white leading-tight break-words text-wrap"
        style="text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25)"
      >
        {{ props.name }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  name: string;
  image: string;
  color?: string;
}

interface Emits {
  (e: "click", payload?: unknown): void;
}

const props = withDefaults(defineProps<Props>(), {
  color: "bg-black",
});

const emit = defineEmits<Emits>();

const handleClick = () => {
  emit("click");
};
</script>
