<template>
  <div class="flex items-center justify-between w-full gap-4 cursor-pointer" :class="className" @click="$emit('click')">
    <slot name="icon" />
    <slot name="label" />
    <slot name="label" />
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: 'Label',
  },
  className: {
    type: String,
    default: '',
  },
  rightIcon: {
    type: Boolean,
    default: false,
  },
  leftIcon: {
    type: String,
    default: '',
  },
});

defineEmits(['click']);
</script>
