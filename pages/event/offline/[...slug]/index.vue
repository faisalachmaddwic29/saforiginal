<template>
  <div class="md:py-5 flex flex-col gap-4">
    <!-- Loading State -->
    <div v-if="pending" class="px-4 py-8 text-center">
      <CardMerchandiseDetailLoading />
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="px-4 py-8 text-center">
      <p class="text-red-500 mb-4">{{ error.message || 'Failed to load product' }}</p>
      <Button @click="refresh">Retry</Button>
    </div>

    <!-- Success State -->
    <template v-else-if="product">
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
          <Button class="w-full" type="button" :disabled="isLoading" @click="handleBuy">
            {{ isLoading ? 'Loading...' : product.btn_label }}
          </Button>
        </AppContainer>
      </div>

      <DrawerCustom v-model:open="showDrawer" title="Buying Offline Event" description="Buying Offline Event" :show-indicator="false" classes="pb-0 !mb-0">
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
                        @click="increaseTicket(item.id, item.available_stock)"
                      >
                        <Icon name="mdi:plus" class="text-base text-primary" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Error message -->
              <p v-if="formError" class="text-red-500 text-sm mt-2">{{ formError }}</p>
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

              <Button type="submit" variant="default" class="w-fit text-sm md:text-lg" :disabled="isSubmitDisabled"> Lanjutkan Pembayaran </Button>
            </div>
          </form>
        </AppContainer>
      </DrawerCustom>
    </template>
  </div>
</template>

<script setup lang="ts">
import { urlApiProducts } from '~/constants';
import type { ProductResponse } from '~/types/api';
import type { TicketWithUsers } from '~/types/data';

definePageMeta({
  layout: 'detail',
  isShadow: true,
  isPaddingTop: true,
  isPaddingBottom: true,
});

const route = useRoute();
const router = useRouter();

// Fetch product dengan useAsyncData
const {
  data: productData,
  pending,
  error,
  refresh,
} = await useAsyncData(
  `product-offline-${route.params.slug}`,
  async () => {
    try {
      const response = await apiSaforiginal.get<ProductResponse>(`${urlApiProducts}/${route.params.slug}`);
      return response.data.product;
    } catch (err) {
      console.error(`Failed to fetch product details: ${route.params.slug}`, err);
      throw err;
    }
  },
  {
    server: true,
    lazy: false,
    default: () => null,
  }
);

const product = computed(() => productData.value);

// SEO Meta
watchEffect(() => {
  if (product.value) {
    useSeoMeta({
      title: product.value.title,
      description: product.value.title?.substring(0, 150),
      ogTitle: product.value.title,
      ogDescription: product.value.title?.substring(0, 150),
      ogImage: product.value.cover,
      twitterTitle: product.value.title,
      twitterDescription: product.value.title?.substring(0, 150),
      twitterImage: product.value.cover,
    });
  }
});

const isLoading = ref(false);
const showDrawer = ref(false);
const selectedTickets = ref<Record<number, TicketWithUsers>>({});
const formError = ref('');

// Zod schema - hanya diinisialisasi di client
let ticketSchema: any;
let formSchema: any;

// Initialize Zod hanya di client-side
if (import.meta.client) {
  const { z } = await import('zod');

  ticketSchema = z.object({
    id: z.number(),
    qty: z.number().min(1, 'Minimal 1 tiket'),
    unitPrice: z.number().min(0, 'Harga tiket tidak valid'),
    price: z.number().min(0, 'Total harga tidak valid'),
    name: z.string(),
    users: z.array(z.any()).optional(),
  });

  formSchema = z.object({
    selectedTickets: z.record(z.string(), ticketSchema).refine(
      (tickets) => {
        const values = Object.values(tickets);
        if (values.length === 0) return false;
        const total = values.reduce((sum: number, t: any) => sum + t.price, 0);
        return total > 0;
      },
      { message: 'Pilih minimal 1 tiket' }
    ),
  });
}

const handleBuy = () => {
  showDrawer.value = true;
  formError.value = '';
};

function addTicket(item: any) {
  selectedTickets.value[item.id] = {
    id: item.id,
    qty: 1,
    unitPrice: item.price,
    price: item.price,
    name: item?.name,
    users: [],
  };
  formError.value = '';
}

function increaseTicket(id: number, maxQty?: number) {
  const ticket = selectedTickets.value[id];
  if (ticket) {
    if (maxQty && ticket.qty >= maxQty) return;
    ticket.qty++;
    ticket.price = ticket.qty * ticket.unitPrice;
  }
}

function decreaseTicket(id: number) {
  const ticket = selectedTickets.value[id];
  if (!ticket) return;

  if (ticket.qty > 1) {
    ticket.qty--;
    ticket.price = ticket.qty * ticket.unitPrice;
  } else {
    const { [id]: _, ...rest } = selectedTickets.value;
    selectedTickets.value = rest;
  }
}

const totalAmount = computed(() => Object.values(selectedTickets.value).reduce((sum: number, t: any) => sum + t.price, 0));

const isSubmitDisabled = computed(() => totalAmount.value <= 0);

const onSubmit = async () => {
  try {
    formError.value = '';

    // Validate dengan Zod (hanya di client)
    if (import.meta.client && formSchema) {
      const result = formSchema.safeParse({
        selectedTickets: selectedTickets.value,
      });

      if (!result.success) {
        const firstError = result.error.errors[0];
        formError.value = firstError.message;
        return;
      }
    }

    // Manual validation fallback
    if (Object.keys(selectedTickets.value).length === 0) {
      formError.value = 'Pilih minimal 1 tiket';
      return;
    }

    if (totalAmount.value <= 0) {
      formError.value = 'Total harus lebih dari 0';
      return;
    }

    // Navigate to checkout
    router.push({
      path: `/event/offline/${route.params.slug}/checkout`,
      query: {
        selectedTickets: JSON.stringify(selectedTickets.value),
      },
    });
  } catch (err) {
    console.error('Submit error:', err);
    formError.value = 'Terjadi kesalahan, silakan coba lagi';
  }
};
</script>
