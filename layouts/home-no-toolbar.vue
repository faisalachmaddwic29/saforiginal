<template>
  <AppWrapper>

		<AppMain :clean="false" class="pt-[70px] pb-[60px]">
			<slot />
		</AppMain>

		<AppToolbarMenus />
  </AppWrapper>
</template>