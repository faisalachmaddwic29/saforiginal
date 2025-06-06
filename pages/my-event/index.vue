<template>
		<div>
		<AppToolbarSearch />
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
definePageMeta({
	layout: 'home-no-toolbar',
});


// const goToOtherPage = (id: string) => {
// 	console.log('Go to other page' + id);
// }
</script>