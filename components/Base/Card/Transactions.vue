<template>
  <div class="w-full flex gap-2.5 justify-between">
    <!-- Icon -->
    <div class="size-20 bg-[rgba(0,0,0,0.03)] flex items-center justify-center rounded">
      <NuxtImg :src="props.cover" :alt="props.cover + '-thumbnail'" class="w-full h-full object-fill rounded" />
    </div>

    <!-- Content -->
    <div class="flex flex-1 flex-col justify-between gap-[3px]">
      <p class="font-bold text-sm">{{ props.label }}</p>
      <div>
        <p class="font-semibold text-sm">{{ props.invoice }}</p>
        <p class="text-xs font-semibold">Rp. {{ currency(props.amount) }}</p>
      </div>
      <p class="text-xs text-[#808187]">{{ formatDate(props.date).full_long_date_time }}</p>
    </div>

    <!-- Status -->
    <div
      class="px-3 py-1 h-fit rounded-full"
      :class="{
        'bg-success/10': props.status === 'paid',
        'bg-danger/10': props.status === 'failed',
        'bg-orange-100': props.status === 'pending',
      }"
    >
      <p
        class="text-xs font-semibold capitalize"
        :class="{
          'text-green-600': props.status === 'paid',
          'text-danger': props.status === 'failed',
          'text-orange-500': props.status === 'pending',
        }"
      >
        {{ props.status }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  cover: {
    type: String,
    required: true,
  },
  invoice: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  amount: {
    type: [String, Number],
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});
</script>
