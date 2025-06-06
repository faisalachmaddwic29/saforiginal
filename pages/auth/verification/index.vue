<template>
	<div class="flex items-center justify-center min-h-screen">
		<FormOtp v-model="pin" :fields="6" />

	</div>

</template>

<script setup lang="ts">
definePageMeta({
	layout: 'detail',
});

const pin = ref('');
</script>