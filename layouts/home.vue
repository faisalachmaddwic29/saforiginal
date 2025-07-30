<template>
  <AppWrapper>
    <AppMain :top="layoutData?.isPaddingTop ?? false" :bottom="layoutData?.isPaddingBottom ?? false" :shadow="layoutData?.isShadow ?? false">
      <slot />
    </AppMain>

    <AppToolbarBottomBars />
  </AppWrapper>
</template>

<script setup lang="ts">
const layoutData = useState('layoutData', (): { isPaddingTop: boolean; isPaddingBottom: boolean; title?: string; isShadow?: boolean } => ({
  isPaddingTop: false,
  isPaddingBottom: false,
  isShadow: true,
  title: '',
}));
</script>
