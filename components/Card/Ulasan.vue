<template>
	<div class="bg-white rounded-2xl shadow-md p-4 max-w-md">
  <h3 class="font-bold text-base leading-snug mb-1">SERIES RAMADHAN PEREMPUAN PERADABAN</h3>
  <p class="text-xs text-gray-400 mb-1">SAF Original</p>
  <p class="text-xs text-gray-400 mb-2">29 Episode</p>
  <p class="text-sm font-semibold mb-2">Beri ulasan pembelian ini</p>
  <div class="flex items-center space-x-1 mb-2">
    <template v-for="i in 5">
      <svg class="w-4 h-4 fill-gray-300" viewBox="0 0 20 20"><path d="..." /></svg>
    </template>
  </div>
  <p class="text-xs text-gray-500">Event bagus dan sangat bermanfaat 👍</p>
  <div class="flex gap-2 mt-3">
    <button class="text-xs px-3 py-1 bg-gray-200 rounded-lg">Beri Ulasan</button>
    <button class="text-xs px-3 py-1 bg-yellow-600 text-white rounded-lg">Perbarui</button>
  </div>
</div>
</template>
