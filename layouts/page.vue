<template>
  <div
    class="bg-white text-[#1E293B] dark:bg-[#0F172A] dark:text-white min-h-dvh w-screen antialiased flex flex-col"
  >
    <header
      class="fixed z-10 w-full top-0 bg-white/80 dark:bg-[#0F172A]/80 shadow-[0px_2px_4px_rgba(0,0,0,0.1)] h-[70px] max-h-[70px] backdrop-filter backdrop-blur"
    >
      <PageContainer class="flex items-center justify-between px-4 py-5">
        <NuxtLink to="/">
          <NuxtImg src="/images/logos/logo.svg" alt="Logo" class="h-[30px]" />
        </NuxtLink>
        <NuxtLink to="/search" class="w-6 h-6">
          <Icon name="iconamoon:search" class="text-2xl text-[#627086]" />
        </NuxtLink>
      </PageContainer>
    </header>

		<PageMain>
			<slot />
		</PageMain>


		<PageMenus />
  </div>
</template>
