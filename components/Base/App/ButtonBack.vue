<template>
  <button class="h-6 w-6 inline-block cursor-pointer" @click="handleBack">
    <Icon name="material-symbols:arrow-back-rounded" class="text-2xl" :class="{ 'text-white': isWhite, 'text-primary': isPrimary, 'text-black': isBlack }" />
  </button>
</template>

<script lang="ts" setup>
defineProps({
  isWhite: {
    type: Boolean,
    default: false,
  },
  isPrimary: {
    type: Boolean,
    default: false,
  },
  isBlack: {
    type: Boolean,
    default: false,
  },
});

const router = useRouter();

// Handle back navigation dengan reset state
const handleBack = () => {
  // Kalau history panjang (bisa balik), jalanin back()
  if (window.history.length > 1) {
    router.back();
  } else {
    // Kalau nggak ada history sebelumnya, ke homepage
    router.replace('/');
  }
};
</script>
