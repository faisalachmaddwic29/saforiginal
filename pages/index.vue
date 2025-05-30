<template>
	<div class="p-4">
		<CardSeries
			id="1"
			thumbnail="/images/sample.png"
			title="Series Ramadhan Perempuan Peradaban"
			rating="4.8"
			category="Web series"
			@click="goToDetail"
		/>
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
  router.push(`/series/${id}`)
}
</script>