<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import { Icon } from '@iconify/vue';

const props = defineProps<{
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
  duration?: number;
  onClose?: () => void;
}>();

const { onClose } = props;

const showBar = ref(false);

onMounted(() => {
  nextTick(() => {
    showBar.value = true;
  });
});

const handleClick = () => {
  if (onClose) {
    onClose();
  }
};

const typeClass = {
  success: {
    icon: 'material-symbols-light:check-circle-outline-rounded',
    iconColor: 'text-success bg-success-foreground',
    barColor: 'bg-success',
  },
  info: {
    icon: 'mdi-light:information',
    iconColor: 'text-info bg-info-foreground',
    barColor: 'bg-info',
  },
  warning: {
    icon: 'circum:warning',
    iconColor: 'text-warning bg-warning-foreground',
    barColor: 'bg-warning',
  },
  error: {
    icon: 'iconamoon:sign-times-circle-thin',
    iconColor: 'text-danger bg-danger-foreground',
    barColor: 'bg-danger',
  },
};
</script>

<template>
  <div class="relative flex items-center m-0 p-5 mb-4 pb-6 text-gray-500 bg-white rounded-lg shadow-sm border dark:text-gray-400 dark:bg-gray-800" role="alert">
    <!-- Icon -->
    <div class="inline-flex items-center justify-center shrink-0 w-10 h-10 rounded-full" :class="typeClass[type].iconColor">
      <Icon :icon="typeClass[type].icon" width="24" height="24" />
    </div>

    <!-- Message -->
    <div class="ms-3 text-sm font-normal">
      {{ message }}
    </div>

    <!-- Close Button -->
    <button type="button" class="absolute right-1 top-1 bg-white text-gray-400 hover:text-gray-900 rounded-full focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-6 w-6 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 cursor-pointer" aria-label="Close" @click="handleClick">
      <svg class="w-3 h-3" fill="none" viewBox="0 0 14 14">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
      </svg>
    </button>

    <!-- Progress Bar -->
    <div class="absolute bottom-0 left-0 h-1 w-full bg-gray-200 rounded-b-lg overflow-hidden">
      <div
        class="h-full origin-left transition-all ease-linear"
        :class="typeClass[type].barColor"
        :style="{
          width: showBar ? '100%' : '0%',
          transitionDuration: `${props.duration || 4000}ms`,
        }"
      />
    </div>
  </div>
</template>
