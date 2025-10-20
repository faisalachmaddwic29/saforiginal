<template>
  <div v-for="item in props.data" :key="item.id" class="relative flex flex-col gap-5 mb-4">
    <div v-for="(attendee, index) in item?.attendees" :key="attendee.id" class="relative bg-background w-full p-4 rounded-[20px] flex flex-col gap-5 shadow-xl overflow-hidden">
      <NuxtImg src="/images/tickets/bg-text.png" alt="bg-text" class="absolute inset-0 w-full" />
      <div class="flex flex-col gap-5 justify-center items-center">
        <NuxtImg src="/images/logos/logo.svg" alt="logo" class="w-[160px] h-auto" />

        <div class="border border-primary rounded w-[190px] md:w-[250px] aspect-[1/1] p-3">
          <NuxtImg :src="attendee?.ticket_qrcode_url" alt="barcode" class="size-full" />
        </div>
      </div>

      <hr class="border border-dashed w-full border-primary" style="border-radius: 5px" />

      <h3 class="font-bold text-base md:text-xl">{{ item?.name }}</h3>

      <!-- Product -->
      <div class="flex flex-start gap-3">
        <Icon name="uil:calender" class="text-2xl mt-0.5" />
        <div class="flex flex-col gap-[1px] font-bold text-base">
          <p>{{ item?.product?.event_at ? formatDate(item?.product?.event_at).full_date : '' }}</p>
          <p><span class="font-normal text-menu">Pukul</span> {{ item?.product?.event_at ? formatDate(item?.product?.event_at).time_only : '' }} - Selesai</p>
        </div>
      </div>

      <div class="flex flex-start gap-3">
        <Icon name="material-symbols:location-on-outline-rounded" class="text-2xl mt-0.5" />
        <div class="flex flex-col gap-[1px] text-base">
          <p class="font-bold">{{ item?.product?.address }}</p>
          <p class="text-menu">{{ item?.product?.location?.text }}</p>
        </div>
      </div>

      <!-- Attendees -->
      <div class="flex flex-col gap-5 divide-y-1 divide-dashed divide-primary">
        <div class="pb-5">
          <div class="grid grid-cols-2 gap-5">
            <div class="flex flex-col gap-1">
              <p class="text-menu">Nama</p>
              <p class="font-bold text-sm">{{ attendee?.name }}</p>
            </div>
            <div class="flex flex-col gap-1">
              <p class="text-menu">Invoice</p>
              <p class="font-bold text-sm">{{ props?.invoice }}</p>
            </div>
            <div class="flex flex-col gap-1">
              <p class="text-menu">Waktu Pemesanan</p>
              <p class="font-bold text-sm">{{ attendee?.created_at ? formatDate(attendee?.created_at).full_long_date_time : '' }}</p>
            </div>
            <div class="flex flex-col gap-1">
              <p class="text-menu">No Tiket</p>
              <p class="font-bold text-sm">{{ attendee?.ticket_code }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TransactionDetail } from '~/types/api';

const props = defineProps({
  data: {
    type: Array as PropType<TransactionDetail[]>,
    required: true,
  },
  invoice: {
    type: String,
    required: true,
  },
});
</script>
