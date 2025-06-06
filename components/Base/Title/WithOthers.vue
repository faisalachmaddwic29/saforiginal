<template>
	<button class="w-full flex items-center justify-between" @click="handleClick">
		<p class="text-base md:text-lg font-semibold font-poppins">{{ props?.label }}</p>
		<Icon :name="props?.icon" class="w-4 h-4 text-base md:w-6 md:h-6 text-primary" />
	</button>
</template>
<script setup lang="ts">

interface Props {
  label?: string,
	icon?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
	icon: 'material-symbols:arrow-forward-ios-rounded'
});

interface Emits {
	(e: 'click', payload?: unknown): void
}

const emit = defineEmits<Emits>();

const handleClick = () => {
	emit('click');
}

</script>