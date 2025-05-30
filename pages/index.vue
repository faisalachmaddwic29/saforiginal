<template>
	<div class="home">
		<div class="pt-3">
			<CarouselBanner />
		</div>
		<div class="px-4 py-4">
		<CardSeries
			id="1"
			thumbnail="/images/sample.png"
			title="Series Ramadhan Perempuan Peradaban"
			slug="series-ramadhan-perempuan-peradaban"
			rating="4.8"
			category="Web series"
			@click="goToDetail"
		/>
		</div>

		<!-- <CardItemsSeries /> -->
		<!-- <CardKomisi /> -->
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'page'
});


const router = useRouter()

function goToDetail(id: string) {
  router.push(`/event/${id}`)
}
</script>