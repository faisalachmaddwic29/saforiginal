<template>
  <AppToolbar>
    <div class="flex items-center px-4 h-full gap-5" :class="title ? 'justify-start' : 'justify-between'">
      <button class="h-6 w-6 inline-block cursor-pointer" @click="handleBack">
        <Icon name="material-symbols:arrow-back-rounded" class="text-2xl text-title" />
      </button>

      <!-- Logo tengah -->
      <div class="flex justify-center" v-if="!title">
        <NuxtImg src="/images/logos/logo.svg" alt="Logo" class="h-[30px]" />
      </div>

      <h2 v-else class="flex text-2xl font-manrope font-extrabold text-title">{{ title }}</h2>

      <!-- Kolom kanan kosong (buat balance) -->
      <div />
    </div>
  </AppToolbar>
</template>

<script setup>
const router = useRouter()

// Define props
const props = defineProps({
  title: {
    type: String,
    default: null
  }
})

// Handle back navigation dengan reset state
const handleBack = () => {
  // Reset layoutData sebelum navigasi back
  const layoutData = useState('layoutData')
  layoutData.value = null

  // Kemudian lakukan navigasi back
  router.back()
}
</script>