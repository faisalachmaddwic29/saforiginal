<template>
  <div class="px-4 py-6">
    <header class="flex items-center mb-6">
      <h1 class="text-2xl font-bold text-primary">Produk Unggulan</h1>
    </header>

    <p class="font-sans">Ini pakai Lato (default)</p>
		<p class="font-poppins">Ini pakai Poppins</p>
		<p class="font-manrope">Ini pakai Manrope</p>

    <div class="grid gap-4">
      <NuxtLink
        v-for="product in products"
        :key="product.id"
        :to="`/product/${product.id}`"
        class="border rounded-lg p-4 shadow hover:shadow-md transition"
      >
        <NuxtImg :src="product.image" alt="Product Image" class="h-40 object-contain w-full mb-3" />
        <h2 class="text-lg font-semibold">{{ product.title }}</h2>
        <p class="text-sm text-gray-600">{{ product.description.substring(0, 100) }}...</p>
      </NuxtLink>
    </div>

    <button
      class="mt-10 px-6 py-2 rounded-lg w-full"
    >
      Lihat Semua Produk
    </button>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
	layout: 'search'
});

const { data: products } = await useFetch('https://fakestoreapi.com/products');
</script>
