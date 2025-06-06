<template>
	<div class="home">
		<div class="py-4">
			<CarouselBanner />
		</div>

		<div class="px-4">
			<TitleWithOthers label="Rekomendasi Untukmu" @click="goToOtherPage('1')" />
		</div>

		<div class="overflow-x-auto flex whitespace-nowrap gap-4 py-4 px-4">
			<CardCategory image="/images/category.png" name="Shirah" color="bg-[#8E5D34]" />
			<CardCategory image="/images/category2.png" name="Ustadz Salim A Fillah" color="bg-[#0E5278]" />
		</div>

		<div class="overflow-x-auto flex whitespace-nowrap gap-4 py-4 px-4">
			<CardSeries
				id="1"
				thumbnail="/images/sample.png"
				title="Series Ramadhan Perempuan Peradaban"
				slug="series-ramadhan-perempuan-peradaban"
				rating="4.8"
				category="Web series"
				@click="goToDetail"
			/>
				<CardSeries
				id="2"
				thumbnail="/images/sample.png"
				title="Series Ramadhan Perempuan Peradaban"
				slug="series-ramadhan-perempuan-peradaban"
				rating="4.8"
				category="Web series"
				@click="goToDetail"
			/>
				<CardSeries
				id="3"
				thumbnail="/images/sample.png"
				title="Series Ramadhan Perempuan Peradaban"
				slug="series-ramadhan-perempuan-peradaban"
				rating="4.8"
				category="Web series"
				@click="goToDetail"
			/>
				<CardSeries
				id="4"
				thumbnail="/images/sample.png"
				title="Series Ramadhan Perempuan Peradaban"
				slug="series-ramadhan-perempuan-peradaban"
				rating="4.8"
				category="Web series"
				@click="goToDetail"
			/>
		</div>

		<div class="overflow-x-auto flex whitespace-nowrap gap-4 py-4 px-4">
			<CardSeries
				id="1"
				thumbnail="/images/sample.png"
				title="Series Ramadhan Perempuan Peradaban"
				slug="series-ramadhan-perempuan-peradaban"
				rating="4.8"
				category="Web series"
				@click="goToDetail"
			/>
				<CardSeries
				id="2"
				thumbnail="/images/sample.png"
				title="Series Ramadhan Perempuan Peradaban"
				slug="series-ramadhan-perempuan-peradaban"
				rating="4.8"
				category="Web series"
				@click="goToDetail"
			/>
				<CardSeries
				id="3"
				thumbnail="/images/sample.png"
				title="Series Ramadhan Perempuan Peradaban"
				slug="series-ramadhan-perempuan-peradaban"
				rating="4.8"
				category="Web series"
				@click="goToDetail"
			/>
				<CardSeries
				id="4"
				thumbnail="/images/sample.png"
				title="Series Ramadhan Perempuan Peradaban"
				slug="series-ramadhan-perempuan-peradaban"
				rating="4.8"
				category="Web series"
				@click="goToDetail"
			/>
		</div>

		<div class="overflow-x-auto flex whitespace-nowrap gap-4 py-4 px-4">
			<CardSeries
				id="1"
				thumbnail="/images/sample.png"
				title="Series Ramadhan Perempuan Peradaban"
				slug="series-ramadhan-perempuan-peradaban"
				rating="4.8"
				category="Web series"
				@click="goToDetail"
			/>
				<CardSeries
				id="2"
				thumbnail="/images/sample.png"
				title="Series Ramadhan Perempuan Peradaban"
				slug="series-ramadhan-perempuan-peradaban"
				rating="4.8"
				category="Web series"
				@click="goToDetail"
			/>
				<CardSeries
				id="3"
				thumbnail="/images/sample.png"
				title="Series Ramadhan Perempuan Peradaban"
				slug="series-ramadhan-perempuan-peradaban"
				rating="4.8"
				category="Web series"
				@click="goToDetail"
			/>
				<CardSeries
				id="4"
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
	layout: 'home'
});


const router = useRouter()

function goToDetail(id: string) {
  router.push(`/event/${id}`)
}

const goToOtherPage = (id: string) => {
	console.log('Go to other page' + id);
}
</script>