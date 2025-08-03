<template>
  <div class="flex items-center justify-between w-full gap-7 cursor-pointer" :class="className" @click="$emit('click')">
    <Icon v-if="isIcon" :name="leftIcon" class="text-3xl size-6" :class="isRed ? 'text-danger' : 'text-list-item'" />
    <slot v-else name="icon" />

    <div class="flex justify-between items-center w-full py-3.5">
      <p class="text-sm md:text-base" :class="isRed ? 'text-danger' : ''">{{ label }}</p>
      <!-- Right Arrow -->
      <Icon :name="rightIcon" class="text-2xl size-6" :class="isRed ? 'text-danger' : ''" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: 'Label',
  },
  isRed: {
    type: Boolean,
    default: false,
  },
  isIcon: {
    type: Boolean,
    default: false,
  },
  leftIcon: {
    type: String,
    default: 'famicons:information-circle-outline', // Default icon
  },
  rightIcon: {
    type: String,
    default: 'ion:chevron-forward-outline', // Default icon
  },
  className: {
    type: String,
    default: '',
  },
});

defineEmits(['click']);
</script>
