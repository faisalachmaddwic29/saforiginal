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
    label: "Ubah password",
    to: "/event",
    icon: "/images/items/lock-open.svg",
  },
  {
    label: "Preferensi Anda",
    to: "/merchandise",
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
		<div class="px-4 pt-[38px] pb-5">

			<!-- profile -->
			<div class="flex items-center gap-3">
				<!--profile -->
				<div class="flex-1 flex items-center gap-3">
					<ProfilePhoto :name="user?.name ?? ''" />

					<div class="flex flex-col flex-1 gap-0">
						<h3 class="font-bold text-lg">{{ user?.name }}</h3>
						<p class="text-sm text-[#94A3B8]">{{ user?.email }}</p>
					</div>
				</div>
				<AppToggleDarkMode size="lg" />

			</div>


			<!-- list -->
			<div class="mt-5">
				<TitleSection>Data Pribadi</TitleSection>


				<div class="mt-6 mb-12">
					<ul class="flex flex-col justify-between items-center gap-10">
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
					<DialogContent class="sm:max-w-[425px] p-4">
						<DialogHeader>
							<DialogTitle class="mb-5">
									<div class="inline-flex p-3.5 items-center justify-center shrink-0 size-15 rounded-full text-danger bg-danger-foreground">
										<Icon name="solar:danger-triangle-outline" class="text-4xl" />
									</div>
							</DialogTitle>
							<DialogDescription>
								<p class="font-inter text-lg md:text-2xl font-bold mb-2 text-[#171717] dark:text-white">Keluar dari SAF Original</p>
								<p class="font-inter text-sm md:text-base text-[#737373]">Apakah Kamu yakin ingin keluar?</p>
							</DialogDescription>
						</DialogHeader>
					<DialogFooter class="mt-8">
						<div class="flex items-center justify-between gap-4 max-w-full overflow-hidden">
							<DialogClose as-child class="flex-1 shrink-0 w-full">
								<Button variant="outline" class="w-full">Batal</Button>
							</DialogClose>
							<Button class="flex-1 w-full" @click="handleLogout">Keluar</Button>
						</div>
					</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>

		</div>
		<AppToolbarMenus />
			<!-- <div class="flex gap-3 flex-col">
				<Button @click="() => {notify.success('Data berhasil disimpan!')}" >Toast Success</Button>
				<Button @click="() => {notify.info('Data berhasil disimpan!')}" >Toast Info</Button>
				<Button @click="() => {notify.warning('Data berhasil disimpan!')}" >Toast Warning</Button>
				<Button @click="() => {notify.error('Data berhasil disimpan!')}" >Toast Error</Button>
			</div> -->
	</div>
</template>
