export default defineNuxtPlugin(() => {
  useHead({
    titleTemplate: (titleChunk) => { // ✅ Function bisa di plugin
      return titleChunk ? `SAF Original - ${titleChunk}` : 'SAF Original';
    }
  });
});