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
          <ContentMerchandiseEksklusif />
        </TabsContent>
        <TabsContent value="buku">
          <ContentMerchandiseBuku />
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
  isPaddingBottom: true,
});

useSeoMeta({
  title: title,
});
</script>
