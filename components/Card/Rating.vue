<template>
	<div class="bg-white rounded-2xl p-4 shadow-sm mt-4">
		<div class="flex items-center gap-2">
			<div class="w-6 h-6 rounded-full bg-orange-200 flex items-center justify-center font-bold text-xs">S</div>
			<div class="text-sm font-medium">Seseorang</div>
		</div>
		<div class="flex items-center space-x-1 mt-2">
			<template v-for="i in 5">
				<svg class="w-4 h-4 fill-yellow-500" viewBox="0 0 20 20"><path d="..." /></svg>
			</template>
		</div>
		<p class="text-sm mt-1">series bagus dan sangat bermanfaat 👍</p>
	</div>
</template>