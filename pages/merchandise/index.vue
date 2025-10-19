<template>
  <div>
    <!-- Toolbar -->
    <AppToolbar>
      <div class="flex items-center px-4 h-full gap-4 justify-between">
        <NuxtLink to="/event/search" class="flex items-center cursor-pointer flex-1 rounded-full border border-[rgba(151,151,151,0.2)] text-[rgba(77,77,77,0.03)] h-[48px] px-4">
          <Icon name="iconamoon:search" class="text-2xl text-[#627086] mr-2" />
          <input type="text" placeholder="Masukan pencarian kamu" class="!cursor-pointer font-manrope bg-transparent placeholder-menu/30 text-menu text-base focus:outline-none w-full" readonly />
        </NuxtLink>
        <NuxtImg src="/images/icons/filter.svg" alt="filter" class="h-6 w-6 cursor-pointer" />
      </div>
    </AppToolbar>

    <div class="p-4">
      <h1>Merchandise</h1>
      <p>Halaman ini masih tahap development</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const title = 'Merchandise';

definePageMeta({
  layout: 'home',
  isShadow: true,
  isPaddingTop: true,
  middleware: 'auth',
  title: title,
});

useSeoMeta({
  title: title,
});
</script>
