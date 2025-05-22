<template>
  <div class="mx-auto max-w-container px-4 py-6">
    <header class="flex items-center mb-6">
      <img src="/logo.png" alt="Logo" class="h-10 mr-3" />
      <h1 class="text-2xl font-bold text-primary">Produk Unggulan</h1>
    </header>

    <div class="grid gap-4">
      <NuxtLink
        v-for="product in products"
        :key="product.id"
        :to="`/product/${product.id}`"
        class="border rounded-lg p-4 shadow hover:shadow-md transition bg-white"
      >
        <img :src="product.image" alt="Product Image" class="h-40 object-contain w-full mb-3" />
        <h2 class="text-lg font-semibold">{{ product.title }}</h2>
        <p class="text-sm text-gray-600">{{ product.description.substring(0, 100) }}...</p>
      </NuxtLink>
    </div>

    <button
      class="mt-10 bg-primary hover:bg-primaryHover text-white px-6 py-2 rounded-lg w-full"
    >
      Lihat Semua Produk
    </button>
  </div>
</template>
<script setup lang="ts">
const { data: products } = await useFetch('https://fakestoreapi.com/products');
</script>
