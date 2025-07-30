<template>
  <div>
    <AppToolbar>
      <div class="flex items-center px-4 h-full gap-4 justify-between">
        <!-- Search input -->
        <div class="flex items-center flex-1 rounded-full border border-[rgba(151,151,151,0.2)] text-[rgba(77,77,77,0.03)] h-[48px] px-4">
          <Icon name="iconamoon:search" class="text-2xl text-[#627086] mr-2" />

          <input
            type="text"
            placeholder="Masukan pencarian kamu"
            class="font-manrope bg-transparent placeholder-[#B0B4C0] text-[#4B5563] dark:placeholder-[#4B5563] dark:text-[#B0B4C0] text-base focus:outline-none w-full"
          />
        </div>

        <NuxtImg src="/images/icons/filter.svg" alt="filter" class="h-6 w-6" />
      </div>
    </AppToolbar>
    <div class="p-4 flex flex-col gap-4">
      <CardReview
        :thumbnail="'https://storage.googleapis.com/gweb-cloudblog-publish/images/0_next25_wrap.max-2000x2000.jpg'"
        :title="'Google Cloud Next 25'"
        :author="'Faisal Achmad Dwi Cahyono'"
        :episode="5"
        :rating="4.3"
        date="2023-01-01"
        review=""
      />
      <CardReview
        :thumbnail="'https://awsimages.detik.net.id/community/media/visual/2023/01/23/pasar-musik-festival.jpeg?w=1200&q=90'"
        :title="'Pasar Musik Festival'"
        :author="'Faisal Achmad Dwi Cahyono'"
        :episode="5"
        :rating="4.8"
        date=""
        review="keren banget"
      />
      <CardReview />
    </div>
  </div>
</template>

<script setup lang="ts">
const title = 'My Event';
definePageMeta({
  layout: 'home',
  isShadow: true,
  isPaddingTop: true,
  isPaddingBottom: true,
  title: title,
});

useSeoMeta({
  title: title,
});

// const goToOtherPage = (id: string) => {
// 	console.log('Go to other page' + id);
// }
</script>
