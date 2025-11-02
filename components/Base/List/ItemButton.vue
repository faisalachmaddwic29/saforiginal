<template>
	<div :class="computedClasses" class="w-full border rounded-xl p-3">
		<div class="flex items-center gap-3 w-full justify-between">
			<div class="flex items-center w-full gap-3">
				<slot name="icon" />
				<div class="flex flex-col flex-1 gap-0 w-full">
					<h3 class="font-bold text-base line-clamp-1">{{ props?.title ?? '-' }}</h3>
					<p class="text-sm text-[#1E293B] dark:text-white line-clamp-2">
						{{ props?.subtitle ?? '-' }}
					</p>
				</div>
			</div>
			<slot name="actions" />
		</div>
	</div>
</template>


<script lang="ts" setup>


const props = defineProps<{
	title: string,
	subtitle: string | undefined,
	type: 'success' | 'info' | 'warning' | 'danger' | 'default'
}>();


const baseClasses =
  "border-[rgba(148,163,184,0.1)] bg-[rgba(148,163,184,0.05)]";

const computedClasses = computed(() => {
  const classes = [
    baseClasses,
		props.type === "success" ? "bg-[rgba(45,213,91,0.2))] border-[#2DD55B]" : "",
		props.type === "info" ? "bg-[rgba(14,165,233,0.2)] border-[#0EA5E9]" : "",
		props.type === "warning" ? "bg-[rgba(255,196,9,0.2)] border-[#FFC409]" : "",
		props.type === "danger" ? "bg-[rgba(220,76,100,0.05)] border-[rgba(220,76,100,0.1)]" : "",
		props.type === "default" ? "!bg-background border-[#F1F1F1]" : "",
  ];
  return classes.filter(Boolean).join(" ");
});
</script>