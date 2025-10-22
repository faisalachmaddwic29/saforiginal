<template>
  <div v-if="items.length" class="w-full mx-auto">
    <div ref="carouselContainer" class="relative w-full overflow-hidden rounded-md">
      <!-- Tombol Geser Kiri -->
      <!-- <button
				class="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-60 hover:bg-opacity-90 rounded-full p-2 shadow-md"
				@click="prevSlide"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
				</svg>
			</button> -->

      <!-- Tombol Geser Kanan -->
      <!-- <button
				class="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-60 hover:bg-opacity-90 rounded-full p-2 shadow-md"
				@click="nextSlide"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
			</button> -->

      <!-- transform: `translateX(calc(-${currentIndex * (slideWidth + gap)}px + ${
            peekLeft
          }px))`,
          transitionProperty: transitioning ? 'transform' : 'none', -->

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
        <div
          v-for="(item, index) in slides"
          :key="index"
          class="flex-shrink-0"
          :style="{ width: slideWidth + 'px', marginRight: gap + 'px' }"
          :class="{ 'pl-4': !hasStarted && item?.file_path === slides[1].file_path }"
        >
          <div class="w-full h-36 md:h-48 bg-primary/40 my-2 shadow-[0px_0px_4px_2px_rgba(0,0,0,0.09)] rounded-xl overflow-hidden flex items-center">
            <NuxtImg :src="item?.file_path" class="size-full object-cover m-auto" alt="carousel image" loading="lazy" draggable="false" @click="item?.url ? linkNewTab(item.url) : null" />
          </div>
        </div>
      </div>
    </div>
    <div class="flex pl-5 gap-2 mt-2.5 justify-start">
      <span v-for="(image, index) in items" :key="index" class="w-2 h-2 rounded-full cursor-pointer" :class="currentSlide === index ? 'bg-primary' : 'bg-[#c6c9d5]'" @click="goToSlide(index)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import type { Banner } from '~/types/api';

const props = defineProps<{
  items: Array<Banner>;
}>();

// Gap dan peek kiri kanan (dalam px)
const gap = 10;
const peekLeft = 20;
const peekRight = 20;
const time = 5000;

const carouselContainer = ref<HTMLElement | null>(null);

// Final base images yang digunakan (prioritaskan props)
const baseImages = computed(() => {
  return props.items && props.items.length > 0 ? props.items : [];
});

// Clone last dan first supaya loop mulus
// const slides = computed(() => [images[images.length - 1], ...images, images[0]]);
// Slides dengan clone untuk looping
const slides = computed(() => {
  const base = baseImages.value;
  return [base[base.length - 1], ...base, base[0]];
});

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
    carouselContainer.value.addEventListener('touchstart', handleTouchStart, {
      passive: true,
    });
    carouselContainer.value.addEventListener('touchmove', preventScroll, {
      passive: false,
    });
    carouselContainer.value.addEventListener('touchend', handleTouchEnd, {
      passive: true,
    });
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
// const currentSlide = computed(() => {
//   let idx = currentIndex.value - 1;
//   if (idx < 0) idx = images.length - 1;
//   if (idx >= images.length) idx = 0;
//   return idx;
// });

// dan juga ini:
const currentSlide = computed(() => {
  let idx = currentIndex.value - 1;
  if (idx < 0) idx = props.items.length - 1;
  if (idx >= props.items.length) idx = 0;
  return idx;
});

// Reset interval auto-slide saat user interaksi
const resetInterval = () => {
  clearInterval(interval);
  interval = setInterval(nextSlide, time);
};

const linkNewTab = (url: string) => {
  window.open(url, '_blank');
};
let debouncedUpdate: () => void;

onMounted(() => {
  // Hitung slideWidth awal
  updateSlideWidth();

  // Pasang debounce resize listener
  debouncedUpdate = debounce(updateSlideWidth, 300);
  window.addEventListener('resize', debouncedUpdate);

  // Mulai interval auto-slide
  interval = setInterval(nextSlide, time);
});

onBeforeUnmount(() => {
  clearInterval(interval);
  if (debouncedUpdate) {
    window.removeEventListener('resize', debouncedUpdate);
  }
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
