<template>
  <div class="flex flex-col p-4">
    <div class="border-2 border-footer rounded-t">
      <LabelPayment
        v-if="props.data.expired_at"
        title="Batas waktu pembayaran"
        :datetime="formatDate(props.data.expired_at ?? new Date()).full_day_long_date_time"
        :time="props.data.expired_at ?? new Date().toString()"
        :invoice-id="props.data.invoice_no"
        :is-paid="props.data.payment_status"
      />

      <div class="p-4 flex flex-col gap-5">
        <div class="flex flex-col gap-4">
          <div v-if="props.data.payment_qr_url" class="border-2 border-primary rounded-lg w-full h-fit overflow-hidden">
            <NuxtImg :src="props.data.payment_qr_url ?? ''" alt="qris" class="w-full h-fit" />
          </div>
        </div>

        <div class="p-3 flex flex-col gap-3 border-2 border-footer rounded-lg">
          <p class="font-semibold text-base">Total Pembayaran</p>

          <div class="flex items-center justify-between rounded">
            <p class="font-bold text-2xl">Rp {{ currency(props.data.grand_total) }}</p>
            <Button variant="outline-primary" size="sm" class="h-fit px-3" @click="copyToClipboard(props.data.grand_total, 'Total Pembayaran berhasil disalin ✅')"> Salin </Button>
          </div>
        </div>

        <div class="p-3 flex flex-col gap-3 border-2 border-footer rounded-lg">
          <p class="font-semibold text-base">Metode Pembayaran</p>

          <div class="w-full flex items-center gap-4">
            <div class="bg-transparent p-2">
              <NuxtImg :src="props.data.payment?.image" :alt="props.data.payment?.name" class="w-20 h-auto" />
            </div>
            <div class="flex-1 flex justify-between">
              <p class="font-bold text-2xl">{{ props.data.payment?.name }}</p>
              <Button v-if="props.data.payment_qr_url" variant="outline-primary" size="sm" class="h-fit px-3" @click="downloadImage"> Unduh </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="fixed w-full z-10 bottom-0 left-0 bg-footer shadow-[0px_-2px_4px_rgba(0,0,0,0.05)]">
    <AppContainer class="p-4">
      <Button type="submit" class="w-full">Check Status Pembayaran</Button>
    </AppContainer>
  </div>
</template>

<script setup lang="ts">
import type { Transaction } from '~/types/api';

const props = defineProps({
  data: {
    type: Object as PropType<Transaction>,
    required: true,
  },
});

const downloadImage = async () => {
  try {
    const response = await fetch(props.data.payment_qr_url ?? '');
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = props.data.invoice_no + '-qris.png'; // nama file hasil download
    document.body.appendChild(a);
    a.click();

    // bersihkan
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (e) {
    console.error('Gagal mengunduh gambar:', e);
  }
};

/**
 * Copy text to clipboard
 */
const copyToClipboard = async (text: string | null, message?: string) => {
  try {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    notify.success(message ?? 'Nomor Virtual Account berhasil disalin ✅');
  } catch (err) {
    console.error('Gagal menyalin teks: ', err);
    notify.error('Gagal menyalin, coba lagi');
  }
};
</script>
