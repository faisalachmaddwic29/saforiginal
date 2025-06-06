<template>
	<div class="px-4 md:py-5">
		<CardSeriesDetail
			:id="event?.id"
			:title="event?.title"
			:thumbnail="event?.images[0]"
			rating="4.8"
			episode="29"
			date="2023-01-01"
			author="Faisal Achmad Dwi Cahyono"
			:description="event?.description"
		/>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "detail",
});


interface EventDetail {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
    slug: string;
  };
  images: string[];
}

const route = useRoute();

const { data: event } = await useFetch<EventDetail>(
  `https://api.escuelajs.co/api/v1/products/slug/${route.params.slug}`
);



// Build full image URL (wajib absolut!)
const imageURL = computed(() => {
  const url = event.value?.images?.[0]
  if (!url) return undefined
  // Kalau url udah https, biarin
  if (url.startsWith("http")) return url
  // Kalau relatif, tambahin origin
  return `${useRequestURL().origin}${url}`
})

// Pasang SEO langsung (server-rendered)
useSeoMeta({
  title: () => event.value?.title,
  description: () => event.value?.description?.substring(0, 150),
  ogTitle: () => event.value?.title,
  ogDescription: () => event.value?.description?.substring(0, 150),
  ogImage: () => imageURL.value,
  twitterTitle: () => event.value?.title,
  twitterDescription: () => event.value?.description?.substring(0, 150),
  twitterImage: () => imageURL.value,
});




</script>
