<template>
  <AppWrapper>
		<AppToolbarDetail />

		<AppMain :clean="true" class="pt-[70px] pb-[76px]">
			<slot />
		</AppMain>
  </AppWrapper>
</template>