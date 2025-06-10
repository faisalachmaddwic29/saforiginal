<template>
  <AppWrapper>
		<AppToolbarDetail :title="layoutData?.title" />

		<AppMain :clean="true" class="pt-[70px] pb-[76px]">
			<slot />
		</AppMain>
  </AppWrapper>
</template>
<script setup>
const layoutData = useState('layoutData', () => null)
</script>
