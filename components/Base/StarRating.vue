<template>
  <div class="flex items-center space-x-0" @click="handleClick">
    <template v-for="i in max" :key="i">
      <!-- Hitung index 0-based -->
      <div class="relative w-5 h-5 text-lg md:text-xl flex items-center">
        <!-- FULL / HALF / EMPTY warna -->
        <Icon
          name="material-symbols:star-rounded"
          class="absolute top-0 left-0 w-5 h-5 text-lg md:text-xl text-[rgba(128,128,128,0.55)]"
        />
        <Icon
          v-if="getFill(i - 1) > 0"
          name="material-symbols:star-rounded"
          class="w-5 h-5 text-lg md:text-xl text-rating absolute top-0 left-0"
          :style="{
            clipPath: getClipPath(getFill(i - 1)),
          }"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
interface Props {
  rating: number;
  max?: number;
}

interface Emits {
  (e: 'click', payload?: unknown): void;
}

const props = withDefaults(defineProps<Props>(), {
  max: 5,
});

const emit = defineEmits<Emits>();

const handleClick = () => {
  emit('click');
};

/**
 * Mengembalikan 0, 0.5, atau 1 tergantung seberapa penuh star-nya
 */
const getFill = (index: number): number => {
  if (props.rating >= index + 1) return 1;
  if (props.rating > index) return +(props.rating - index).toFixed(2);
  return 0;
};

/**
 * Membuat clip path dari kiri sesuai persentase fill
 */
const getClipPath = (fill: number): string => {
  const percent = Math.round(fill * 100);
  return `inset(0 ${100 - percent}% 0 0)`;
};
</script>
