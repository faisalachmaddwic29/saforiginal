<template>
  <div class="flex flex-col items-center gap-2">
    <ClientOnly>
      <!-- Toggle Switch -->
      <div
        class="relative w-16 h-8 rounded-full border-2 cursor-pointer transition-all duration-300 ease-in-out"
        :class="[isDark ? 'bg-slate-800 border-slate-600' : 'bg-white border-[#EAEAEA]', 'hover:shadow-lg']"
        @click="toggleTheme"
      >
        <!-- Toggle Button -->
        <div
          class="absolute top-[2px] w-6 h-6 rounded-full transition-all duration-300 ease-in-out flex items-center justify-center shadow-md"
          :class="[isDark ? 'bg-slate-700 translate-x-8' : 'bg-[#A8F2FF] translate-x-0.5', 'hover:scale-110']"
        >
          <!-- Icon -->
          <Icon :name="isDark ? 'material-symbols:dark-mode' : 'material-symbols:light-mode'" :class="['text-sm transition-all duration-300', isDark ? 'text-slate-300' : 'text-[#FF9600]']" />
        </div>

        <!-- Background Icons (Optional decorative) -->
        <div class="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
          <!-- Sun Icon (Left side) -->
          <Icon name="material-symbols:light-mode" class="text-xs transition-all duration-300" :class="isDark ? 'text-slate-600 opacity-50' : 'text-[#FF9600] opacity-80'" />
          <!-- Moon Icon (Right side) -->
          <Icon name="material-symbols:dark-mode" class="text-sm transition-all duration-300 mr-[1px]" :class="isDark ? 'text-slate-300 opacity-80' : 'text-slate-400 opacity-50'" />
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
// interface Props {
//   showLabel?: boolean
//   showSizeInfo?: boolean
//   size?: 'sm' | 'md' | 'lg'
// }

// const props = withDefaults(defineProps<Props>(), {
//   showLabel: false,
//   showSizeInfo: false,
//   size: 'md'
// })

const colorMode = useColorMode();

// Computed untuk status dark mode
const isDark = computed(() => colorMode.value === 'dark');

// Watch perubahan color mode untuk debugging
watch(colorMode, (val) => {
  console.log('Current mode:', val.value);
});

// Function untuk toggle theme
const toggleTheme = () => {
  colorMode.preference = isDark.value ? 'light' : 'dark';
};

// Emit event jika dibutuhkan parent component
const emit = defineEmits<{
  change: [mode: string];
}>();

watch(isDark, (newValue) => {
  emit('change', newValue ? 'dark' : 'light');
});
</script>
