<template>
  <div class="flex items-center justify-between cursor-pointer h-full w-full" @click="handleClick">
    <!-- Left Section: Icon and Text -->
    <div class="flex items-center gap-3 h-full">
      <!-- Icon -->
			<Icon v-if="isIcon" :name="leftIcon" class="w-6 h-6 text-2xl text-[#94A3B8]" />
			<slot v-else name="icon" />

      <!-- Text -->
      <span class="text-sm md:text-base font-medium font-manrope"
			:class="{ '!text-[#ED2D2A]': isRed }">{{ label }}</span>
    </div>

    <!-- Right Section: Arrow Icon -->
    <Icon :name="rightIcon" class="w-6 h-6 text-lg text-[#94A3B8]"
			:class="{ '!text-[#ED2D2A]': isRed }" />
  </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  leftIcon: {
    type: String,
    default: "ic:baseline-account-circle", // Default icon
  },
	isIcon: {
		type: Boolean,
		default: false
	},
	isRed: {
		type: Boolean,
		default: false
	},
  rightIcon: {
    type: String,
    default: "material-symbols-light:arrow-forward-ios-rounded", // Default icon
  },
});

// Emits
const emit = defineEmits<{
  (e: "click", label: string): void;
}>();

// Click handler
function handleClick() {
  emit("click", props?.label); // emit id ke parent
}
</script>
