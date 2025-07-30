<template>
  <AppWrapper>
    <AppToolbarDetail :title="layoutData?.title" :no-toolbar="layoutData?.noToolbar ?? false" />

    <AppMain :clean="layoutData?.noPadding ?? false" :top="layoutData?.isPaddingTop ?? false" :bottom="layoutData?.isPaddingBottom ?? false" :shadow="layoutData?.isShadow ?? false">
      <slot />
    </AppMain>
  </AppWrapper>
</template>

<script setup lang="ts">
import type { LayoutData } from '~/types/component';

const layoutData = useState(
  'layoutData',
  (): LayoutData => ({
    isPaddingTop: false,
    isPaddingBottom: false,
    noPadding: false,
    isShadow: true,
    title: null,
    noToolbar: false,
  })
);
</script>
