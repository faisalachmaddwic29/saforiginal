<template>
  <table class="w-full text-sm">
    <tbody>
      <!-- ID Transaksi -->
      <tr>
        <td class="py-1.5">ID Transaksi</td>
        <td class="text-right">
          <Skeleton class="h-4 w-24 ml-auto" />
        </td>
      </tr>

      <!-- Nomor -->
      <tr>
        <td class="py-1.5">No Referensi</td>
        <td class="text-right">
          <Skeleton class="h-4 w-28 ml-auto" />
        </td>
      </tr>

      <!-- Metode Pembayaran -->
      <tr>
        <td class="py-1.5">Metode Pembayaran</td>
        <td class="text-right">
          <Skeleton class="h-4 w-20 ml-auto" />
        </td>
      </tr>

      <!-- Nama Produk -->
      <tr>
        <td class="py-1.5">Nama Produk</td>
        <td class="text-right">
          <Skeleton class="h-4 w-32 ml-auto" />
        </td>
      </tr>

			<!-- Harga -->
      <tr>
        <td class="py-1.5">Harga</td>
        <td class="text-right">
          <Skeleton class="h-4 w-24 ml-auto" />
        </td>
      </tr>

			<!-- Total -->
      <tr>
        <td class="pt-3 text-lg">Total</td>
        <td class="pt-3 text-right">
          <Skeleton class="h-5 w-28 ml-auto" />
        </td>
      </tr>
    </tbody>
  </table>
</template>
