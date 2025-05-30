
<script setup lang="ts">

definePageMeta({
	layout: 'page'
});
const colorMode = useColorMode()

watch(colorMode, (val) => {
  console.log('Current mode:', val) // debug
})

const toggleColor = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <button @click="toggleColor">
    <Icon
      :name="colorMode.value === 'dark' ? 'material-symbols:dark-mode' : 'material-symbols:light-mode'"
      class="text-xl"
    />
  </button>
</template>