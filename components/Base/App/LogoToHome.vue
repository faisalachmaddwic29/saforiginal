<template>
  <NuxtImg src="/images/logos/logo.svg" alt="logo" class="h-[32px] w-[180px] cursor-pointer" @click="handleHome" />
</template>

<script lang="ts" setup>
const router = useRouter();

const handleHome = () => {
  router.push('/');
};
</script>
