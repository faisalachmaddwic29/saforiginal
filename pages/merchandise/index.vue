<template>
  <div class="relative w-full">
    <!-- Toolbar -->

    <div class="relative h-34 overflow-hidden">
      <!-- Background -->
      <NuxtImg src="/images/merchandise/background.png" alt="merchandise" class="absolute inset-0 w-full h-full object-cover object-bottom" />

      <!-- Overlay Title -->
      <div class="h-[60px] absolute top-0 left-0 right-0 flex items-center justify-center">
        <h3 class="text-2xl font-extrabold text-white drop-shadow-lg inline-block">Merchandise</h3>
      </div>
    </div>

    <div class="-mt-[45px] relative z-[999]">
      <Tabs default-value="ekslusif" class="w-full !px-0">
        <TabsList class="grid w-full grid-cols-2 !p-0 !bg-transparent rounded-none !shadow-none">
          <TabsTrigger value="ekslusif" class="!bg-transparent !text-white rounded-none !font-lato"> Ekslusif</TabsTrigger>
          <TabsTrigger value="buku" class="!bg-transparent !text-white rounded-none !font-lato"> Buku </TabsTrigger>
        </TabsList>
        <TabsContent value="ekslusif">
          <div class="flex flex-col gap-5 px-4 py-1">
            <!-- Filter -->
            <div class="mt-2">
              <div class="flex items-center flex-1 rounded-full border border-[rgba(151,151,151,0.2)] text-[rgba(77,77,77,0.03)] h-[48px] px-4 shadow-md">
                <Icon name="iconamoon:search" class="text-2xl text-[#627086] mr-2" />
                <input type="text" placeholder="Cari Baju, Kain, Peci . . ." class="font-manrope bg-transparent placeholder-menu/30 text-menu text-base focus:outline-none w-full" />
              </div>
            </div>

            <!-- Banner -->
            <div class="w-full h-[100px] relative rounded-2xl overflow-hidden p-4">
              <NuxtImg src="/images/merchandise/background.png" alt="merchandise" class="absolute inset-0 w-full h-full object-fill -z-1" />
              <div class="w-full flex items-center gap-4">
                <div class="w-[120px] text-end aspect-auto">
                  <NuxtImg src="/images/merchandise/logo.png" alt="logos" class="w-fit h-fit" />
                </div>
                <div class="flex flex-col gap-[2px] font-lato">
                  <h3 class="text-xl md:text-2xl font-extrabold text-white drop-shadow-lg inline-block">Merchandise</h3>
                  <p class="text-sm md:text-base text-white font-semibold">Merch Eksklusif untuk Para Pecinta Kebaikan</p>
                </div>
              </div>
            </div>

            <div class="flex justify-between items-center">
              <LabelTitle label="Merchandise Pilihan" />
              <NuxtImg src="/images/icons/filter-primary.svg" alt="filter-primary" class="h-6 w-6 cursor-pointer" />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <CardMerchandise />
              <CardMerchandise />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="buku">
          <div class="flex flex-col gap-5 px-4 py-1">
            <!-- Filter -->
            <div class="mt-2">
              <div class="flex items-center flex-1 rounded-full border border-[rgba(151,151,151,0.2)] text-[rgba(77,77,77,0.03)] h-[48px] px-4 shadow-md">
                <Icon name="iconamoon:search" class="text-2xl text-[#627086] mr-2" />
                <input type="text" placeholder="Cari Buku . . ." class="font-manrope bg-transparent placeholder-menu/30 text-menu text-base focus:outline-none w-full" />
              </div>
            </div>

            <!-- Banner -->
            <div class="w-full h-[100px] relative rounded-2xl overflow-hidden p-4">
              <NuxtImg src="/images/merchandise/background.png" alt="merchandise" class="absolute inset-0 w-full h-full object-fill -z-1" />
              <div class="w-full flex items-center gap-4">
                <div class="w-[120px] text-end aspect-auto">
                  <NuxtImg src="/images/books/logo.png" alt="logos" class="w-fit h-fit" />
                </div>
                <div class="flex flex-col gap-[2px] font-lato">
                  <h3 class="text-xl md:text-2xl font-extrabold text-white drop-shadow-lg inline-block">Buku</h3>
                  <p class="text-sm md:text-base text-white font-semibold">Buku-Buku Penuh Cinta, Ilmu, dan Teladan Islami</p>
                </div>
              </div>
            </div>

            <div class="flex justify-between items-center">
              <LabelTitle label="Buku Pilihan" />
              <NuxtImg src="/images/icons/filter-primary.svg" alt="filter-primary" class="h-6 w-6 cursor-pointer" />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
const title = 'Merchandise';

definePageMeta({
  layout: 'home',
  isShadow: true,
  title: title,
});

useSeoMeta({
  title: title,
});
</script>
