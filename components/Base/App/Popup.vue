<template>
  <teleport v-if="appStore.showPopup" to="body">
    <div class="fixed inset-0 z-[99999999] bg-[rgba(0,0,0,0.6)] flex items-center justify-center">
      <div class="relative w-full max-w-sm mx-8">
        <!-- GAMBAR -->
        <NuxtImg :src="appStore.popup.file_path ?? ''" class="w-full h-auto rounded-[14px] cursor-pointer object-contain" @click="appStore.popup.url ? handleClick(appStore.popup.url) : null" />
        <!-- TOMBOL CLOSE -->
        <div class="absolute -top-3 -right-3 shadow-xl bg-background rounded-full size-8 flex items-center justify-center p-1 cursor-pointer" @click="closePopup">
          <Icon name="line-md:close" class="text-2xl cursor-pointer" />
        </div>
      </div>
    </div>
  </teleport>
</template>
<script setup lang="ts">
const appStore = useAppStore();
const closePopup = () => {
  appStore.showPopup = false;
};

const handleClick = (url: string) => {
  window.open(url, '_blank');
};

onMounted(async () => {
  await appStore.fetchPopup();
});
</script>
