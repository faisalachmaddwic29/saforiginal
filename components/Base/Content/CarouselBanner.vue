<template>
  <div class="w-full mx-auto">
    <div ref="carouselContainer" class="relative w-full overflow-hidden rounded-md">
      <div
        class="flex transition-transform duration-500 ease-in-out cursor-grabbing"
        :style="{
          transform: `translateX(calc(-${currentIndex * (slideWidth + gap)}px + ${hasStarted ? peekLeft : 0}px))`,
          transitionProperty: transitioning ? 'transform' : 'none',
        }"
        @transitionend="handleTransitionEnd"
        @mousedown="handleTouchStart"
        @mousemove="handleTouchMove"
        @mouseup="handleTouchEnd"
        @mouseleave="handleTouchEnd"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
      >
        <div v-for="(image, index) in slides" :key="index" class="flex-shrink-0" :style="{ width: slideWidth + 'px', marginRight: gap + 'px' }" :class="{ 'pl-4': !hasStarted && image === slides[1] }">
          <NuxtImg :src="image" class="w-full h-36 md:h-48 object-cover rounded-xl shadow-[0px_0px_4px_2px_rgba(0,0,0,0.09)] my-2" alt="carousel image" loading="lazy" draggable="false" />
        </div>
      </div>
    </div>
    <div class="flex pl-4 gap-2 mt-2.5 justify-start">
      <span v-for="(image, index) in images" :key="index" class="w-2 h-2 rounded-full cursor-pointer" :class="currentSlide === index ? 'bg-primary' : 'bg-[#92949C]'" @click="goToSlide(index)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

// Data gambar
const images = [
  'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1495567720989-cebdbdd97913?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80',
];

// Gap dan peek kiri kanan (dalam px)
const gap = 10;
const peekLeft = 20;
const peekRight = 20;
const time = 5000;

const carouselContainer = ref<HTMLElement | null>(null);

// Clone last dan first supaya loop mulus
const slides = computed(() => [images[images.length - 1], ...images, images[0]]);

// Index mulai dari 1 (karena clone pertama di index 0)
const currentIndex = ref(1);

// Status animasi transisi
const transitioning = ref(true);

// Flag apakah carousel sudah mulai jalan (untuk peek kiri)
const hasStarted = ref(false);

// Lebar slide yang dihitung responsif
const slideWidth = ref(0);

// handle drag
const startX = ref(0);
const currentX = ref(0);
const isDragging = ref(false);

const preventScroll = (e: TouchEvent) => {
  if (isDragging.value) {
    e.preventDefault(); // Tetap diperlukan untuk drag
  }
};

const handleTouchStart = (e: TouchEvent | MouseEvent) => {
  isDragging.value = true;
  startX.value = 'touches' in e ? e.touches[0].clientX : e.clientX;
};

const handleTouchMove = (e: TouchEvent | MouseEvent) => {
  if (!isDragging.value) return;
  currentX.value = 'touches' in e ? e.touches[0].clientX : e.clientX;
};

const handleTouchEnd = () => {
  if (!isDragging.value) return;
  const diffX = currentX.value - startX.value;

  const threshold = 50; // Minimal jarak untuk dianggap swipe
  if (diffX > threshold) {
    prevSlide();
  } else if (diffX < -threshold) {
    nextSlide();
  }

  isDragging.value = false;
  startX.value = 0;
  currentX.value = 0;
  resetInterval();
};

onMounted(() => {
  if (carouselContainer.value) {
    // Hanya tambahkan listener jika benar-benar diperlukan
    carouselContainer.value.addEventListener('touchstart', handleTouchStart, { passive: true });
    carouselContainer.value.addEventListener('touchmove', preventScroll, { passive: false });
    carouselContainer.value.addEventListener('touchend', handleTouchEnd, { passive: true });
  }
});

onBeforeUnmount(() => {
  if (carouselContainer.value) {
    carouselContainer.value.removeEventListener('touchstart', handleTouchStart);
    carouselContainer.value.removeEventListener('touchmove', preventScroll);
    carouselContainer.value.removeEventListener('touchend', handleTouchEnd);
  }
});

// end handle drag

// Interval tipe sesuai NodeJS untuk TS (NodeJS.Timeout)
let interval: ReturnType<typeof setInterval>;

// Fungsi debounce sederhana
function debounce(fn: () => void, delay: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(fn, delay);
  };
}

// Update slideWidth berdasarkan container, dikurangi peek kiri kanan
const updateSlideWidth = () => {
  if (carouselContainer.value) {
    slideWidth.value = carouselContainer.value.clientWidth - peekLeft - peekRight;
  }
};

const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    transitioning.value = true;
    hasStarted.value = true;
    resetInterval();
  }
};

// Pindah slide ke kanan
const nextSlide = () => {
  if (currentIndex.value < slides.value.length - 1) {
    currentIndex.value++;
    transitioning.value = true;
    hasStarted.value = true;
  }
};

// Pindah ke slide tertentu (klik indikator)
const goToSlide = (index: number) => {
  currentIndex.value = index + 1;
  transitioning.value = true;
  hasStarted.value = true;
  resetInterval();
};

// Setelah animasi transisi selesai
const handleTransitionEnd = () => {
  // Kalau sudah di clone terakhir, langsung reset ke slide asli tanpa transisi
  if (currentIndex.value === slides.value.length - 1) {
    transitioning.value = false;
    currentIndex.value = 1;
  }
  // Kalau sudah di clone pertama, reset ke slide asli terakhir tanpa transisi
  if (currentIndex.value === 0) {
    transitioning.value = false;
    currentIndex.value = slides.value.length - 2;
  }
};

// Hitung index slide asli (0..length-1)
const currentSlide = computed(() => {
  let idx = currentIndex.value - 1;
  if (idx < 0) idx = images.length - 1;
  if (idx >= images.length) idx = 0;
  return idx;
});

// Reset interval auto-slide saat user interaksi
const resetInterval = () => {
  clearInterval(interval);
  interval = setInterval(nextSlide, time);
};

onMounted(() => {
  // Hitung slideWidth awal dan pasang debounce resize listener
  updateSlideWidth();
  const debouncedUpdate = debounce(updateSlideWidth, 300);
  window.addEventListener('resize', debouncedUpdate);

  // Mulai interval auto-slide
  interval = setInterval(nextSlide, time);

  onBeforeUnmount(() => {
    clearInterval(interval);
    window.removeEventListener('resize', debouncedUpdate);
  });
});
</script>

<style scoped>
.carousel {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
