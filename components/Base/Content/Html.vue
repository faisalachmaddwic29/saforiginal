<!-- eslint-disable vue/no-v-html -->
<template>
  <client-only>
    <article class="html-viewer prose prose-slate dark:prose-invert max-w-none text-sm md:text-base" v-html="safeHtml"></article>
  </client-only>
</template>

<script setup lang="ts">
import DOMPurify from 'dompurify';

const props = defineProps<{ content: string }>();
const safeHtml = computed(() => DOMPurify.sanitize(props.content));
</script>

<style>
/* Reset umum tapi tidak merusak list & heading */
.html-viewer {
  /* all: revert; */
  /* font: inherit; */
  color: inherit;
  line-height: inherit;
}

/* Pastikan semua elemen ikut font & warna global */
.html-viewer * {
  font-family: inherit !important;
  font-size: inherit !important;
  color: inherit !important;
  line-height: inherit !important;
}

/* Biarkan <strong> dan <b> tetap bold */
.html-viewer strong,
.html-viewer b {
  font-weight: 700 !important;
}

/* Heading tetap bold dan sedikit jarak */
.html-viewer h1,
.html-viewer h2,
.html-viewer h3,
.html-viewer h4,
.html-viewer h5,
.html-viewer h6 {
  font-weight: 700 !important;
  /* margin-top: 1rem; */
  margin-bottom: 0.5rem;
}

/* Paragraf rapi */
.html-viewer p + p {
  margin-top: 0.75em;
}

/* List tetap tampil */
.html-viewer ul {
  list-style: disc;
  margin-left: 1rem;
  padding-left: 0.5rem;
}

.html-viewer ol {
  list-style: decimal;
  margin-left: 1rem;
  padding-left: 0.5rem;
}

.prose ul li::marker,
.prose ol li::marker {
  color: inherit;
}

/* Jarak antar blok */
.html-viewer > * + * {
  margin-top: 0.75rem;
}
</style>
