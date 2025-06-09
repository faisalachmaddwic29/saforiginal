<template>
	<div :class="computedClasses">
		<slot />
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
  type: 'success' | 'info' | 'warning' | 'danger',
}>()

const baseClasses =
  "p-3 w-full border rounded-lg text-xs md:text-sm text-[#1E293B] dark:text-[#94A3B8]";

const computedClasses = computed(() => {
  const classes = [
    baseClasses,
    props.type === "success" ? "bg-[rgba(45,213,91,0.2))] border-[#2DD55B]" : "",
    props.type === "info" ? "bg-[rgba(14,165,233,0.2)] border-[#0EA5E9]" : "",
    props.type === "warning" ? "bg-[rgba(255,196,9,0.2)] border-[#FFC409]" : "",
    props.type === "danger" ? "bg-[rgba(220,76,100,0.2)] border-[#DC4C64]" : "",
  ];
  return classes.filter(Boolean).join(" ");
});



</script>
