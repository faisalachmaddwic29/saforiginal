<template>
  <div class="relative pb-[60px]">
    <div class="px-4 pt-[38px] pb-5 w-full">
      <ClientOnly>
        <div class="flex items-center gap-3 w-full">
          <!--profile -->
          <div class="flex-1 flex items-center gap-3" w-full>
            <PhotoProfile :name="user?.name ?? ''" :image-url="user?.avatar_url" />

            <div class="flex flex-col flex-1 gap-0 w-full">
              <h3 class="font-bold text-base md:text-lg line-clamp-2">
                {{ user?.name }}
              </h3>
              <p class="text-xs md:text-sm text-[#94A3B8] line-clamp-1">
                {{ user?.email }}
              </p>
            </div>
          </div>
          <AppToggleDarkMode size="lg" />
        </div>

        <!-- Verified Email And Phone-->
        <div v-if="user?.email_verified_at == null || user?.phone_verified_at == null" class="my-5 flex flex-col gap-4">
          <ListItemButton v-if="!user?.email_verified_at" title="Email" :subtitle="user?.email" type="danger">
            <template #icon>
              <NuxtImg src="/images/icons/info-circle.svg" class="w-8 h-8 text-danger" />
            </template>
            <template #actions>
              <Button variant="outline" class="text-xs h-full border !border-danger bg-transparent whitespace-nowrap py-1 px-3" size="sm" @click="verifyEmail">Verifikasi</Button>
            </template>
          </ListItemButton>

          <ListItemButton v-if="!user?.phone_verified_at" title="Phone" :subtitle="user?.phone" type="danger">
            <template #icon>
              <NuxtImg src="/images/icons/info-circle.svg" class="w-8 h-8 text-danger" />
            </template>
            <template #actions>
              <Button variant="outline" class="text-xs h-full border !border-danger bg-transparent whitespace-nowrap py-1 px-3" size="sm">Verifikasi</Button>
            </template>
          </ListItemButton>
        </div>
      </ClientOnly>

      <!-- list -->
      <div class="list_items mb-5 mt-10">
        <LabelTitle>Data Pribadi</LabelTitle>

        <div class="mt-6 md:mt-8 mb-15">
          <ul class="flex flex-col justify-between items-center gap-4 md:gap-6">
            <NuxtLink v-for="item in items" :key="item.label" :to="item.to" class="w-full">
              <ListItem :label="item.label" :is-icon="false">
                <template #icon>
                  <NuxtImg :src="item.icon" class="w-6 h-6" />
                </template>
              </ListItem>
            </NuxtLink>
          </ul>
        </div>

        <Dialog>
          <DialogTrigger as-child>
            <ListItem label="Keluar akun" :is-icon="false" :is-red="true">
              <template #icon>
                <NuxtImg src="/images/items/logout.svg" class="w-6 h-6" />
              </template>
            </ListItem>
          </DialogTrigger>
          <DialogContent class="sm:max-w-[425px] p-4 text-center">
            <DialogHeader>
              <DialogTitle class="mb-5 m-auto">
                <div class="text-center inline-flex p-3.5 items-center justify-center shrink-0 size-15 rounded-full text-danger bg-danger-foreground">
                  <Icon name="solar:danger-triangle-outline" class="text-4xl" />
                </div>
              </DialogTitle>
              <DialogDescription>
                <p class="text-center font-inter text-lg md:text-2xl font-bold mb-2 text-[#171717] dark:text-white">Keluar dari SAF Original</p>
                <p class="text-center font-inter text-sm md:text-base text-[#737373]">Apakah Kamu yakin ingin keluar?</p>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter class="mt-8">
              <div class="flex items-center justify-between gap-4 w-full overflow-hidden !ring-none">
                <DialogClose as-child class="flex-1 w-full focus-visible:ring-0 focus-visible:outline-none">
                  <Button variant="outline" class="w-full">Batal</Button>
                </DialogClose>
                <Button class="flex-1 w-full focus-visible:ring-0 focus-visible:outline-none" @click="handleLogout">Keluar</Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <InstallApps  />

      <p class="font-inter text-menu mt-[85px] text-xs md:text-sm m-auto text-center mb-5">Copyright © 2025 saf-original, All rights reserved</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PhotoProfile } from '#components';

const title = 'Akun';
definePageMeta({
  layout: 'home',
  middleware: 'auth', // Middleware untuk memastikan user login
  isPaddingBottom: true,
  title: title,
});

useSeoMeta({
  title: title,
});

// Ambil instance authStore
const authStore = useAuthStore();

// Ambil data user dari store
const user = computed(() => authStore.user);

// Jalankan logika untuk memuat data pengguna
onMounted(() => {
  if (!authStore.user) {
    // Pulihkan user dari cookie jika hilang
    authStore.getUser();
  }
});

// Menu untuk halaman akun
const items = ref([
  {
    label: 'Ubah data akun',
    to: '/account/change-account',
    icon: '/images/items/user.svg',
  },
  {
    label: 'Keamanan & Akun',
    to: '/account/security',
    icon: '/images/items/shield-tick.svg',
  },
  {
    label: 'Riwayat Transaksi',
    to: '/account/transactions',
    icon: '/images/items/transaksi.svg',
  },
  {
    label: 'Preferensi Anda',
    to: '/account/change-preferences',
    icon: '/images/items/bookmark-square.svg',
  },
  {
    label: 'Rekening Bank',
    to: '/account/rekening',
    icon: '/images/items/building-library.svg',
  },
  {
    label: 'Affiliate',
    to: '/account',
    icon: '/images/items/presentation-chart-bar.svg',
  },
]);

// Fungsi logout
const handleLogout = () => {
  authStore.logout({ redirectTo: '/login', callApi: true });
};

const verifyEmail = () => {
  navigateTo('/account/verify-email');
};
</script>
