<template>
	<!-- w-[240px] md:w-[210px] -->
	<div class="group cursor-pointer w-full bg-white rounded-sm border border-[rgba(148,163,184,0.2)] text-[#1E293B] dark:bg-[#0F172A] dark:text-white overflow-hidden flex-shrink-0">
		<div class="relative border-b border-[rgba(148,163,184,0.2)]  overflow-hidden aspect-[1/1] ">
      <NuxtImg
        :src="props?.thumbnail"
        :alt="props?.id"
        class="aspect-[1/1] w-full h-full object-fill transition-transform duration-500 ease-in-out group-hover:scale-110 rounded-t-xs"
      />
    </div>
		<div class="p-3 md:p-4">
			<h4 class="text-sm md:text-base font-bold leading-tight line-clamp-2 break-words text-wrap">{{ title }}</h4>
			<div class="flex items-center my-2 gap-1">
				<div class="flex items-center text-xs gap-[3px] bg-rating/10 px-1 py-0.5 rounded border border-rating">
					<Icon name="material-symbols:star-rounded" class="w-4 h-4 text-base text-rating" />
					<span class="text-xs md:text-sm font-medium">{{ rating }}</span>
				</div>
				<p class="text-xs md:text-sm text-[#627086] dark:text-[#94A3B8]">{{ sold }} terjual</p>
			</div>
			<p class="text-base md:text-lg font-bold text-secondary">{{ formatPrice(price) }}</p>
		</div>
	</div>
</template>

<script setup lang="ts">

const formatPrice = (price: number) => {
  // Format angka tanpa desimal
  const formatted = new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

  // Tambahkan "Rp." di depan dengan titik
  return `Rp ${formatted}`;
}


const props = defineProps({
	thumbnail: {
		type: String,
		default: '/images/merchandise.png'
	},
	id: {
		type: String,
		default: '1'
	},
	title: {
		type: String,
		default: 'Buku Lapis Lapis Keberkahan'
	},
	rating: {
		type: Number,
		default: 4.8
	},
	price: {
		type: Number,
		default: 70000
	},
	sold: {
		type: Number,
		default: 12
	}
});



</script>