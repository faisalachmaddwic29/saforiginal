
<script setup lang="ts">

definePageMeta({
	layout: 'akun',
});

</script>

<template>
	<div class="px-4 pt-[38px] pb-5">

		<div class="flex items-center gap-3">
			<!--profile -->
			<div class="flex-1 flex items-center gap-3">
				<NuxtImg
					src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80"
					alt="User profile"
					width="80"
					height="80"
					class="rounded-full object-cover"
				/>

				<div class="flex flex-col flex-1 gap-0">
					<h3 class="font-bold text-lg">Faisal Achmad Dwi Cahyono</h3>
					<p class="text-sm text-[#94A3B8]">faisalachmaddwic@gmail.com</p>
				</div>
			</div>
			<ToggleDarkMode size="lg" />

		</div>
	</div>
</template>