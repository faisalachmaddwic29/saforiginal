<template>
  <!-- <div class="bg-secondary p-3.5 text-white">
    <p class="font-normal text-xs">{{ props.title }}</p>
    <div v-if="props.datetime" class="flex items-center justify-between">
      <p class="font-bold text-base">{{ props.datetime }}</p>
      <div class="flex items-center gap-1.5">
        <Icon name="material-symbols:timer-outline-rounded" class="text-lg" />
        <p class="font-bold text-sm w-[60px]">{{ countdown }}</p>
      </div>
    </div>
  </div> -->
  <div class="bg-footer p-3 flex flex-col gap-3 items-center justify-center rounded-t">
    <p class="font-bold text-sm">{{ props.invoiceId }}</p>
    <div v-if="props.datetime" class="flex flex-col gap-3 items-center">
      <p class="text-base">Selsaikan pembayaran anda dalam</p>
      <p v-if="props.paymentStatus == 'paid'" class="font-bold text-3xl text-green-400">Sukses</p>
      <p v-if="props.paymentStatus == 'failed'" class="font-bold text-3xl text-red-400">Kadaluarsa</p>
      <p v-else class="font-bold text-3xl">{{ countdown }}</p>
      <p class="text-base">Sebelum {{ props.datetime }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, computed } from 'vue';

const props = defineProps({
  paymentStatus: {
    type: String,
    default: '',
  },
  invoiceId: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  datetime: {
    type: String,
    default: '',
  },
  time: {
    type: [String, Date, null],
    default: '', // contoh format: "2025-08-18 12:30:00"
  },
});

const timeStore = useTimeStore();
const timezone = computed(() => timeStore.detectTimezone());
const now = ref(timeStore.getTimeWithTimezone(timezone.value));

const countdown = ref<string>('00:00:00');
let interval: ReturnType<typeof setInterval> | null = null;

function formatDuration(ms: number): string {
  if (ms <= 0) return '00:00:00';
  const totalSeconds = Math.floor(ms / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

onMounted(() => {
  let target: number;
  if (!props.time) {
    target = new Date().getTime();
  } else {
    target = new Date(props.time).getTime();
  }

  interval = setInterval(() => {
    // timezone.value -> ambil string, bukan ComputedRef
    now.value = timeStore.getTimeWithTimezone(timezone.value);
    const diff = target - new Date(now.value).getTime();
    countdown.value = formatDuration(diff);
  }, 1000);
});

onUnmounted(() => {
  if (interval) clearInterval(interval);
});
</script>
