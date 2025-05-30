<template>
  <div class="px-4 py-6">
    <header class="flex items-center mb-4">
      <h1 class="text-xl font-bold text-primary">{{ product?.title }}</h1>
    </header>
    <NuxtImg :src="product?.image" class="h-60 object-contain w-full mb-4" />
    <p>{{ product?.description }}</p>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { data: product } = await useFetch(`https://fakestoreapi.com/products/${route.params.id}`);

definePageMeta({
	layout: 'detail'
});

useSeoMeta({
  title: product.value?.title || 'Produk Detail',
  meta: [
    {
      name: 'description',
      content: product.value?.description?.substring(0, 150) || 'Deskripsi produk'
    }
  ]
});
</script>
