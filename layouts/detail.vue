<template>
  <AppWrapper :key="layoutKey">
    <AppToolbarDetail :title="layoutData?.title" />

    <AppMain :clean="true" class="pt-[70px] pb-[76px]">
      <slot />
    </AppMain>
  </AppWrapper>
</template>

<script setup>
import { computed } from 'vue';

const layoutData = useState('layoutData', () => null);
const layoutKey = computed(() => (layoutData.value ? layoutData.value.id : 'default'));
</script>
