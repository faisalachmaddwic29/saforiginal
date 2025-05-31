<template>
	<div class="flex gap-6 mb-8 -mx-4 md:mx-0 overflow-hidden md:rounded-xl relative z-[1] p-4 md:p-6 backdrop-blur-sm shadow-md">
		<NuxtImg
        src="/images/sample.png"
        alt="backdrop"
        class="absolute inset-x-0 -z-[1] opacity-20 w-full top-1/2 filter blur-lg transform -translate-y-1/2"
      />
		<div class="w-[130px] md:w-[180px] flex-shrink-0 aspect-[3/4]">
			<NuxtImg
        src="/images/sample.png"
        alt="altText"
        class="w-full rounded object-cover"
      />
		</div>
		<!-- content -->
		<div class="flex flex-col flex-1 min-w-0 gap-1 md:gap-2.5">
			<h3 class="text-base md:text-2xl font-bold uppercase line-clamp-2">
				Series Ramadhan Perempuan Peradaban
			</h3>
			<div
        class="w-max flex items-center text-xs md:text-lg gap-[3px] my-1.5 md:my-2 bg-rating/10 px-1 py-0.5 rounded border border-rating"
      >
        <Icon name="material-symbols:star-rounded" class="w-4 h-4 md:w-6 md:h-6 text-rating" />
        <span class="text-sm md:text-base font-medium">4.8</span>
      </div>


			<!-- User -->
			<div
        class="w-max flex items-start text-xs md:text-lg gap-1 md:gap-2 text-[#627086] dark:text-[#94A3B8]"
      >
        <Icon name="heroicons-outline:user" class="w-4 h-4 md:w-6 md:h-6" />
        <span class="text-sm md:text-base">SAF Original</span>
      </div>
			<!-- Date -->
			<div
        class="w-max flex items-start text-xs md:text-lg gap-1 md:gap-2 text-[#627086] dark:text-[#94A3B8]"
      >
        <Icon name="heroicons-outline:calendar" class="w-4 h-4 md:w-6 md:h-6" />
        <span class="text-sm md:text-base">11 Maret 2024</span>
      </div>
			<!-- Episode -->
			<div
        class="w-max flex items-start text-xs md:text-lg gap-1 md:gap-2 text-[#627086] dark:text-[#94A3B8]"
      >
        <Icon name="mingcute:grid-line" class="w-4 h-4 md:w-6 md:h-6" />
        <span class="text-sm md:text-base">29 Episode</span>
      </div>

			<!-- Bagikan -->
			<button
				class="mt-auto self-end border border-secondary rounded-md py-1 px-3 flex justify-center items-center gap-1 cursor-pointer"
				@click="showAlert"
				>
				<Icon name="heroicons-outline:share" class="w-4 h-4" />
				<span class="text-sm md:text-base font-medium">Bagikan</span>
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
function showAlert () {
  alert('Bagikan');
}
</script>