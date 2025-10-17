<template>
  <table class="w-full text-sm">
    <tbody>
      <tr>
        <td class="py-1.5">ID Transaksi</td>
        <th class="text-right">{{ transaction.id }}</th>
      </tr>
      <tr>
        <td class="py-1.5">No Referensi</td>
        <th class="text-right">{{ transaction.invoice_no ?? '-' }}</th>
      </tr>
      <tr>
        <td class="py-1.5">Nominal Transaksi</td>
        <th class="text-right">Rp{{ currency(transaction?.total ?? 0) }}</th>
      </tr>
      <tr v-if="transaction?.discount != null && parseFloat(transaction?.discount?.toString()) > 0">
        <td class="py-1.5">Diskon</td>
        <th class="text-right">- Rp{{ currency(transaction?.discount ?? 0) }}</th>
      </tr>
      <tr v-if="transaction?.dpp != null && parseFloat(transaction?.dpp?.toString()) > 0 && transaction?.discount != null && parseFloat(transaction?.discount?.toString()) > 0">
        <td class="py-1.5">DPP</td>
        <th class="text-right">Rp{{ currency(transaction?.dpp ?? 0) }}</th>
      </tr>
      <tr v-if="transaction?.tax != null && parseFloat(transaction?.tax?.toString()) > 0">
        <td class="py-1.5">Pajak</td>
        <th class="text-right">Rp{{ currency(transaction?.tax ?? 0) }}</th>
      </tr>
      <tr v-if="transaction?.admin_fee != null && parseFloat(transaction?.admin_fee?.toString()) > 0">
        <td class="py-1.5">Admin Fee</td>
        <th class="text-right">Rp{{ currency(transaction?.admin_fee ?? 0) }}</th>
      </tr>
      <tr>
        <th class="text-lg text-left pt-3">Total</th>
        <th class="text-lg pt-3 text-right">Rp{{ currency(transaction?.grand_total ?? 0) }}</th>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { Transaction } from '~/types/api';

defineProps({
  transaction: {
    type: Object as PropType<Transaction>,
    required: true,
  },
});
</script>
