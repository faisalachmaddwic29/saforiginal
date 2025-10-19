<template>
  <div class="md:py-5 flex flex-col gap-4">
    <div class="px-4">
      <CardProductDetail
        :id="product?.id"
        :title="product?.title"
        :thumbnail="product?.cover"
        :type="product?.address + ', ' + product?.location?.text"
        :date="product.event_at"
        :author="product?.store?.name"
        :description="product?.description"
      />
    </div>
    <ContentHtml class="px-4 pb-4" :content="product.description" />

    <div class="fixed w-full z-10 bottom-0 left-0 bg-footer shadow-[0px_-2px_4px_rgba(0,0,0,0.05)]">
      <AppContainer class="p-4">
        <Button class="w-full" type="button" :disabled="isLoading" @click="handleBuy">{{ isLoading ? 'Loading...' : product.btn_label }}</Button>
      </AppContainer>
    </div>

    <DrawerCustom v-model:open="showDrawer" title="Buying Offline Event" description="Buying Offline Event" :show-indicator="false" classes=" pb-0 !mb-0">
      <AppContainer>
        <form class="flex flex-col justify-between h-full bg-background rounded-t-2xl overflow-auto" @submit.prevent="onSubmit">
          <div class="flex flex-col shrink text-title dark:text-menu font-normal p-4">
            <div class="flex justify-between items-start">
              <h4 class="font-extrabold">Pilih Tiket</h4>
              <Icon name="ion:close-outline" class="text-2xl size-6 cursor-pointer" @click="() => (showDrawer = false)" />
            </div>

            <!-- value inves -->
            <div class="flex flex-col gap-4 my-4">
              <div v-for="item in product.offline_tickets" :key="item.id" class="flex items-center justify-between w-full gap-4 p-3 border rounded-lg">
                <div class="w-full flex gap-2 font-bold">
                  <div class="flex flex-col">
                    <p class="font-extrabold">{{ item.name }}</p>
                    <div class="flex items-start gap-1 text-primary">
                      <span class="text-xs">Rp</span>
                      <p class="text-sm">{{ currency(item.price) }}</p>
                    </div>
                  </div>
                </div>

                <div class="w-50 text-sm">
                  <!-- kalau qty 0 -> tampil tombol Beli -->
                  <Button v-if="!selectedTickets[item.id]" type="button" variant="default" class="w-full font-bold" size="sm" @click="addTicket(item)"> Beli </Button>

                  <!-- kalau qty > 0 -> tampil counter -->
                  <div v-else class="flex items-center justify-between border rounded overflow-hidden w-full h-8">
                    <button
                      type="button"
                      class="flex items-center justify-center h-full cursor-pointer px-2 active:bg-red-300 transition-colors duration-150 rounded-l"
                      @click="decreaseTicket(item.id)"
                    >
                      <Icon name="mdi:minus" class="text-base text-primary" />
                    </button>

                    <div class="flex-1 bg-footer text-center w-10 h-full font-semibold text-sm flex items-center justify-center border-x-1">
                      {{ selectedTickets[item.id].qty }}
                    </div>

                    <button
                      type="button"
                      class="flex items-center justify-center h-full cursor-pointer px-2 active:bg-sky-300 transition-colors duration-150 rounded-r"
                      @click="increaseTicket(item.id)"
                    >
                      <Icon name="mdi:plus" class="text-base text-primary" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-footer p-4 flex justify-between gap-2 items-center">
            <div class="w-full flex gap-2 font-bold">
              <div class="flex flex-col">
                <p class="font-extrabold text-sm md:text-lg">Subtotal</p>
                <div class="flex items-start gap-1 text-primary">
                  <span class="text-sm md:text-lg">Rp</span>
                  <p class="text-base md:text-2xl font-bold">{{ currency(totalAmount) }}</p>
                </div>
              </div>
            </div>

            <Button type="submit" variant="default" class="w-fit text-sm md:text-lg" :disabled="isSubmitDisabled">Lanjutkan Pembayaran</Button>
          </div>
        </form>
      </AppContainer>
    </DrawerCustom>
  </div>
</template>

<script setup lang="ts">
import { urlApiProducts } from '~/constants';
import { z } from 'zod';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import type { Product, ProductResponse } from '~/types/api';
import type { TicketWithUsers } from '~/types/data';

definePageMeta({
  layout: 'detail',
  isShadow: true,
  isPaddingTop: true,
  isPaddingBottom: true,
});

const route = useRoute();

const { data } = await apiSaforiginal.get<ProductResponse>(urlApiProducts + '/' + route.params.slug);
const product: Product = data.product ?? {};
// Pasang SEO langsung (server-rendered)

// Pasang SEO langsung (server-rendered)
useSeoMeta({
  title: () => product.title,
  description: () => product.title?.substring(0, 150),
  ogTitle: () => product.title,
  ogDescription: () => product.title?.substring(0, 150),
  ogImage: () => product.cover,
  twitterTitle: () => product.title,
  twitterDescription: () => product.title?.substring(0, 150),
  twitterImage: () => product.cover,
});

const isLoading = ref(false);
const showDrawer = ref(false);
const router = useRouter();

const handleBuy = () => {
  showDrawer.value = true;
};

// reactive object untuk menyimpan jumlah tiap ticket
const selectedTickets = ref<Record<number, TicketWithUsers>>({});

function addTicket(item: any) {
  selectedTickets.value[item.id] = {
    id: item.id,
    qty: 1,
    unitPrice: item.price, // simpan harga asli per tiket
    price: item.price, // total harga awal = 1 * unitPrice
    name: item?.name,
    users: [], // ✅ tambahkan ini
  };
}

function increaseTicket(id: number) {
  const ticket = selectedTickets.value[id];
  if (ticket) {
    ticket.qty++;
    ticket.price = ticket.qty * ticket.unitPrice; // hitung ulang total harga
  }
  console.log(selectedTickets.value);
}

const totalAmount = computed(() => Object.values(selectedTickets.value).reduce((sum: number, t: any) => sum + t.price, 0));

function decreaseTicket(id: number) {
  const ticket = selectedTickets.value[id];
  if (!ticket) return;

  if (ticket.qty > 1) {
    ticket.qty--;
    ticket.price = ticket.qty * ticket.unitPrice; // hitung ulang total harga
  } else {
    // hapus aman tanpa delete
    const { [id]: _, ...rest } = selectedTickets.value;
    selectedTickets.value = rest;
  }
  console.log(selectedTickets.value);
}

// Schema validasi Zod - hanya required
const ticketSchema = z.object({
  id: z.number(),
  qty: z.number().min(1, 'Minimal 1 tiket'),
  unitPrice: z.number().min(0, 'Harga tiket tidak valid'),
  price: z.number().min(0, 'Total harga tidak valid'),
  name: z.string(),
});

const schema = z.object({
  amount: z
    .string()
    .min(1, 'Jumlah wajib diisi')
    .transform((val) => {
      const num = Number(val.replace(/[.,\s]/g, ''));
      if (isNaN(num)) throw new Error('Nominal tidak valid');
      return num;
    })
    .refine((val) => val > 0, 'Minimal nominal harus lebih dari 0'),
  selectedTickets: z.record(z.string(), ticketSchema).refine(
    (tickets) => {
      const total = Object.values(tickets).reduce((sum, t) => sum + t.price, 0);
      return total > 0;
    },
    { message: 'Pilih minimal 1 tiket' }
  ),
});

const { defineField, handleSubmit } = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    amount: '0',
    selectedTickets: {},
  },
});

const [amount] = defineField('amount');
const [selectedTicketsField] = defineField('selectedTickets');

watch(
  selectedTickets,
  (newVal) => {
    selectedTicketsField.value = newVal;
  },
  { deep: true }
);

watch(totalAmount, (newTotal) => {
  amount.value = newTotal.toString();
});

const isSubmitDisabled = computed(() => totalAmount.value <= 0);

const onSubmit = handleSubmit(async (values) => {
  router.push({
    path: '/event/offline/' + route.params.slug + '/checkout',
    query: {
      selectedTickets: JSON.stringify(values.selectedTickets as Record<number, { id: number; qty: number; unitPrice: number; price: number; name: string }>),
    },
  });
});
</script>
