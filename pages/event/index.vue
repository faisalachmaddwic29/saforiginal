<template>
	<div>
		<AppToolbarSearch />
		<div class="p-4">
			<TitleLabel label="Temukan Event yang kamu cari" />

			<!-- Shimmer loading state -->
			<div v-if="loading" class="py-4 grid grid-cols-2 gap-4">
				<template v-for="n in 4" :key="n">
					<!-- Placeholder for 4 cards -->
					<div class="group w-full overflow-hidden animate-pulse rounded-lg flex-shrink-0">
						<div
							class="relative overflow-hidden rounded-lg aspect-[3/3.5] bg-gray-200 dark:bg-gray-800"
						></div>
						<div class="w-full pt-2 space-y-2">
							<div class="h-4 bg-gray-200 dark:bg-gray-800 rounded"></div>
							<div class="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3"></div>
							<div class="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/3"></div>
						</div>
					</div>
				</template>
			</div>

			<div v-else class="py-4 grid grid-cols-2 gap-4">
				<template v-for="event in events" :key="event.id">
					<CardSeries
						:id="event.id"
						class="w-full sm:w-full md:w-full"
						:thumbnail="event.images[0]"
						:title="event.title"
						:slug="event.slug"
						:rating="4.8"
						:category="event.category.name"
						@click="goToDetail"
					/>
				</template>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "home-no-toolbar",
});

interface CardSeriesProps {
  id: number;
	images: string[];
	title: string;
  slug: string;
  rating: number;
  category: any;
}

const events = ref<CardSeriesProps[]>([]);
const loading = ref(true);
const router = useRouter();

onMounted(async () => {
  try {
    loading.value = true;
    const response = await fetch("https://api.escuelajs.co/api/v1/products");
    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }
    const data = await response.json();
    events.value = data;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
});

function goToDetail(slug: string) {
  router.push(`/event/${slug}`);
}
</script>
