<template>
  <div
    class="box-border bg-white text-[#1E293B] dark:bg-[#0F172A] dark:text-white min-h-dvh w-screen antialiased flex flex-col"
  >

		<PageMain :clean="true">
			<slot />
		</PageMain>


		<PageMenus />
  </div>
</template>
