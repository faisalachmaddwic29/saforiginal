<template>
  <AppWrapper>
		<AppToolbarDetail :title="props.title" />

		<AppMain :clean="true" class="pt-[70px] pb-[76px]">
			<slot />
		</AppMain>
  </AppWrapper>
</template>
<script setup>
// Define props
const props = defineProps({
	title: {
		type: String,
		default: null
	}
})
</script>
