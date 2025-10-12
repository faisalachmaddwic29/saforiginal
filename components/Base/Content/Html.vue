<!-- eslint-disable vue/no-v-html -->
<template>
  <client-only>
    <article class="html-viewer prose prose-neutral max-w-none" v-html="safeHtml"></article>
  </client-only>
</template>

<script setup lang="ts">
import DOMPurify from 'dompurify';

const props = defineProps<{ content: string }>();

const safeHtml = computed(() => DOMPurify.sanitize(props.content));
</script>

<style>
/* Pastikan list-nya muncul */
.html-viewer ul {
  list-style-type: disc;
  margin-left: 1.5rem;
  padding-left: 1.5rem;
}

.html-viewer ol {
  list-style-type: decimal;
  margin-left: 1.5rem;
  padding-left: 1.5rem;
}

/* Override jika ShadCN menonaktifkan bullet-nya */
.prose ul li::marker {
  color: inherit;
}
</style>
