
<script setup lang="ts">
import { useRoute } from "vue-router";

definePageMeta({
	layout: 'default',
});


const route = useRoute();

const items = ref([
  {
    label: "Ubah data akun",
    to: "/",
		icon: "/images/items/user.svg",
  },
  {
    label: "Ubah password",
    to: "/event",
    icon: "/images/items/lock-open.svg",
  },
  {
    label: "Prefrensi anda",
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

</script>

<template>
	<div class="relative pb-[60px]">
		<div class="px-4 pt-[38px] pb-5">

			<!-- profile -->
			<div class="flex items-center gap-3">
				<!--profile -->
				<div class="flex-1 flex items-center gap-3">
					<NuxtImg
						src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80"
						alt="User profile"
						width="80"
						height="80"
						class="rounded-full object-cover"
					/>

					<div class="flex flex-col flex-1 gap-0">
						<h3 class="font-bold text-lg">Faisal Achmad Dwi Cahyono</h3>
						<p class="text-sm text-[#94A3B8]">faisalachmaddwic@gmail.com</p>
					</div>
				</div>
				<AppToggleDarkMode size="lg" />

			</div>


			<!-- list -->
			<div class="mt-5">
				<TitleSection>Account</TitleSection>


				<div class="mt-6 mb-12">
					<ul class="flex flex-col justify-between items-center gap-10">
						<NuxtLink
							v-for="item in items"
							:key="item.label"
							class="w-full">
							<ListItem :label="item.label" :isIcon="false">
								<template #icon>
									<NuxtImg :src="item.icon" class="w-6 h-6" />
								</template>
							</ListItem>
						</NuxtLink>
					</ul>
				</div>

				<NuxtLink to="/auth/login">
					<ListItem label="Keluar akun" :isIcon="false" :isRed="true" >
						<template #icon>
							<NuxtImg src="/images/items/logout.svg" class="w-6 h-6" />
						</template>
					</ListItem>
				</NuxtLink>
			</div>

		</div>

		<AppToolbarMenus />
	</div>
</template>
