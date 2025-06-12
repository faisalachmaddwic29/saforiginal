<script setup lang="ts">
import { useRoute } from "vue-router";

definePageMeta({
  layout: 'default',
  middleware: 'auth', // Middleware untuk memastikan user login
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
    label: "Ubah data akun",
    to: "/account/change-account",
    icon: "/images/items/user.svg",
  },
  {
    label: "Keamaman & Akun",
    to: "/account/security",
    icon: "/images/items/shield-tick.svg",
  },
  {
    label: "Preferensi Anda",
    to: "/event",
    icon: "/images/items/bookmark-square.svg",
  },
  {
    label: "Rekening Bank",
    to: "/my-event",
    icon: "/images/items/building-library.svg",
  },
  {
    label: "Affiliate",
    to: "/account",
    icon: "/images/items/presentation-chart-bar.svg",
  },
]);

// Fungsi logout
const handleLogout = () => {
  authStore.logout({ redirectTo: '/login', callApi: true });
};
</script>


<template>
	<div class="relative pb-[60px]">
		<div class="px-4 pt-[38px] pb-5 w-full">

			<ClientOnly>
				<div class="flex items-center gap-3 w-full">
					<!--profile -->
					<div class="flex-1 flex items-center gap-3" w-full>
						<ProfilePhoto :name="user?.name ?? ''" :image-url="user?.avatar_url"/>

						<div class="flex flex-col flex-1 gap-0 w-full">
							<h3 class="font-bold text-base md:text-lg line-clamp-2">{{ user?.name }}</h3>
							<p class="text-xs md:text-sm text-[#94A3B8] line-clamp-1">{{ user?.email }}</p>
						</div>
					</div>
					<AppToggleDarkMode size="lg" />
				</div>

				<!-- Verified Email And Phone-->
				<div class="my-5 flex flex-col gap-4" v-if="user?.email_verified_at == null || user?.phone_verified_at == null">
					<div v-if="!user?.email_verified_at" class="w-full border border-[rgba(220,76,100,0.1)] bg-[rgba(220,76,100,0.05)] rounded-xl p-3 bg">
						<div class="flex items-center gap-3 w-full justify-between">
							<div class="flex items-center w-full gap-3 flex-grow">
								<NuxtImg src="/images/icons/info-circle.svg" class="w-8 h-8 text-[#DC4C64]" />
								<div class="flex flex-col flex-1 gap-0 w-full">
									<h3 class="font-bold text-base line-clamp-2">Email</h3>
									<p class="text-sm text-[#1E293B] dark:text-white line-clamp-1">{{ user?.email }}</p>
								</div>
							</div>
							<Button variant="outline" class="text-xs h-full border !border-[#DC4C64] bg-transparent whitespace-nowrap py-1 px-3" size="sm">Verifikasi</Button>
						</div>
					</div>

					<div v-if="!user?.phone_verified_at" class="w-full border border-[rgba(220,76,100,0.1)] bg-[rgba(220,76,100,0.05)] rounded-xl p-3 bg">
						<div class="flex items-center gap-3 w-full justify-between">
							<div class="flex items-center w-full gap-3 flex-grow">
								<NuxtImg src="/images/icons/info-circle.svg" class="w-8 h-8 text-[#DC4C64]" />
								<div class="flex flex-col flex-1 gap-0 w-full">
									<h3 class="font-bold text-base line-clamp-2">No Handphone</h3>
									<p class="text-sm text-[#1E293B] dark:text-white line-clamp-2">{{ user?.phone }}</p>
								</div>
							</div>
							<Button variant="outline" class="text-xs h-full border !border-[#DC4C64] bg-transparent whitespace-nowrap py-1 px-3" size="sm">Verifikasi</Button>
						</div>
					</div>
				</div>
			</ClientOnly>


			<!-- list -->
			<div class="list_items">
				<TitleSection>Data Pribadi</TitleSection>


				<div class="mt-6 md:mt-8 mb-15">
					<ul class="flex flex-col justify-between items-center gap-8 md:gap-10">
						<NuxtLink
							v-for="item in items"
							:key="item.label"
							:to="item.to"
							class="w-full">
							<ListItem :label="item.label" :isIcon="false">
								<template #icon>
									<NuxtImg :src="item.icon" class="w-6 h-6" />
								</template>
							</ListItem>
						</NuxtLink>
					</ul>
				</div>

				<Dialog>
					<DialogTrigger as-child>
						<ListItem label="Keluar akun" :isIcon="false" :isRed="true" >
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


			<InstallApps />


		</div>
			<p class="font-inter text-[#647294] text-xs md:text-sm m-auto text-center mb-5">Copyright © 2025 saf-original, All rights reserved</p>
		<AppToolbarMenus />
			<!-- <div class="flex gap-3 flex-col">
				<Button @click="() => {notify.success('Data berhasil disimpan!')}" >Toast Success</Button>
				<Button @click="() => {notify.info('Data berhasil disimpan!')}" >Toast Info</Button>
				<Button @click="() => {notify.warning('Data berhasil disimpan!')}" >Toast Warning</Button>
				<Button @click="() => {notify.error('Data berhasil disimpan!')}" >Toast Error</Button>
			</div> -->
	</div>
</template>
