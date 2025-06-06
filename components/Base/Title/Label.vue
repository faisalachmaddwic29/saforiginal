<template>
	<h3 class="font-bold font-poppins text-sm	md:text-base">{{ props?.label }}</h3>
</template>
<script setup lang="ts">

interface Props {
  label?: string,
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
});

</script>