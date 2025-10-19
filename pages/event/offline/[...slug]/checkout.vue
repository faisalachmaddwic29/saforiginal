<template>
  <form class="p-4 flex flex-col gap-6 text-sm md:text-base" @submit.prevent="onSubmit">
    <div class="flex flex-col gap-2">
      <LabelSection>Data Pribadi</LabelSection>
      <div class="grid grid-cols-2 w-full gap-2">
        <div class="flex flex-col gap-[4px]">
          <p class="text-menu">Nama</p>
          <p class="font-bold text-wrap text-ellipsis line-clamp-1">{{ user?.name }}</p>
        </div>
        <div class="flex flex-col gap-[4px]">
          <p class="text-menu">Email</p>
          <p class="font-bold text-wrap text-ellipsis line-clamp-1">{{ user?.email }}</p>
        </div>
        <div class="flex flex-col gap-[4px]">
          <p class="text-menu">Phone</p>
          <p class="font-bold text-wrap text-ellipsis line-clamp-1">{{ user?.phone }}</p>
        </div>
        <div class="flex flex-col gap-[4px]">
          <p class="text-menu">Jenis Kelamin</p>
          <p class="font-bold text-wrap text-ellipsis line-clamp-1">{{ user?.gender ? (user?.gender == 'L' ? 'Laki-laki' : 'Perempuan') : '' }}</p>
        </div>
      </div>
      <div class="flex flex-col gap-[4px]">
        <p class="text-menu">Domisili</p>
        <p class="font-bold">{{ user?.location?.text }}</p>
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <LabelSection>Investasi Anda</LabelSection>
      <ClientOnly>
        <FormInput v-if="cart" v-model="cart.total" class-name="text-right !font-extrabold" :is-number="true" :is-icon="true" :is-currency="true" :read-only="true">
          <template #icon>
            <p class="!font-extrabold text-xl pb-1">Rp</p>
          </template>
        </FormInput>
      </ClientOnly>
    </div>

    <div class="flex flex-col gap-2">
      <LabelSection>Masukan Kode Voucher</LabelSection>
      <div class="flex gap-2 w-full justify-between">
        <FormInput v-model="voucher_code" class-name="!font-medium" class="w-full flex-1" placeholder="Masukan Kode Voucher" :error="errors.voucher_code" />
        <div class="flex items-start">
          <Button type="button" variant="default" class="w-full h-[44px] md:h-[48px] rounded-md" :disabled="!voucher_code" @click="applyVoucher">Pakai</Button>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <LabelSection>Metode Pembayaran</LabelSection>
      <div class="flex flex-col gap-2">
        <div>
          <Combobox v-model="bank_id" by="label">
            <ComboboxAnchor as-child class="w-full">
              <ComboboxTrigger as-child>
                <button
                  type="button"
                  class="relative cursor-pointer font-manrope ring-none border transition duration-300 ease-in-out rounded-lg outline-none px-4 py-3 appearance-none"
                  :class="[
                    errors.bank && bankTouched ? 'border-red-500 dark:border-red-400' : 'border-[#C5C5C5] dark:border-[rgba(197,197,197,0.2)]',
                    { 'text-[#C5C5C5] dark:text-[rgba(197,197,197,0.2)]': !bank_id },
                  ]"
                >
                  <div class="w-full p-1 flex items-center">
                    <div v-if="bank_id" class="bg-transparent px-2 rounded-b-md">
                      <NuxtImg :src="bank_id?.image" :alt="bank_id.name" class="w-14 h-auto" />
                    </div>
                    <div class="flex-1 px-4 text-left text-slate-600 dark:text-slate-400 text-sm" :class="bank_id?.name ? 'font-extrabold' : 'font-light'">
                      {{ bank_id?.name ?? 'Pilih Metode Pembayaran' }}
                    </div>
                    <Icon name="material-symbols:arrow-drop-down-rounded" class="absolute top-[9px] right-2 text-3xl text-subtle cursor-pointer" />
                  </div>
                  <!-- <div class="absolute top-[13px] right-2 text-sm text-subtle cursor-pointer border px-2 border-secondary rounded">
                    <p class="text-title">pilih</p>
                  </div> -->
                </button>
              </ComboboxTrigger>
            </ComboboxAnchor>

            <!-- Dropdown -->
            <ComboboxList align="start" side="bottom" :prioritize-position="true" :side-offset="0" :align-offset="0">
              <div class="relative w-full items-center text-sm md:text-base text-title dark:text-menu">
                <ComboboxInput
                  class="font-manrope ring-none placeholder-[#C5C5C5] dark:placeholder-[rgba(197,197,197,0.2)] transition duration-300 ease-in-out rounded-none outline-none px-4 py-3 appearance-none h-10"
                  placeholder="Pilih Metode Pembayaran. . ."
                />
                <span class="absolute left-0 inset-y-0 flex items-center justify-center px-3">
                  <!-- <Search class="size-4 text-muted-foreground" /> -->
                </span>
              </div>

              <ComboboxEmpty class="p-4 text-sm md:text-base text-title dark:text-menu font-manrope"> Pilih Metode Pembayaran. </ComboboxEmpty>

              <ComboboxGroup class="h-60 overflow-y-scroll">
                <ComboboxItem
                  v-for="payment in payments"
                  :key="payment.id"
                  :value="payment"
                  class="font-manrope text-title dark:text-menu flex items-center px-4 py-2 cursor-pointer hover:bg-primary w-full"
                >
                  <div class="w-full flex items-center">
                    <div class="bg-transparent p-2 rounded-b-md">
                      <NuxtImg :src="payment.image" :alt="payment.name" class="w-14 h-auto" />
                    </div>
                    <div class="flex-1 py-2 px-4 text-slate-600 dark:text-slate-400 text-sm">
                      <p class="">{{ payment.name }}</p>
                    </div>
                    <!-- <Icon name="ion:chevron-forward-outline" class="text-xl size-6 text-title" /> -->
                  </div>
                </ComboboxItem>
              </ComboboxGroup>
            </ComboboxList>
          </Combobox>

          <!-- Error message for address -->
          <FormMessageError v-if="errors.bank && bankTouched" :message="errors.bank" />
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <LabelSection>Data Tiket</LabelSection>
      <!-- <div v-for="item in selectedTickets" :key="item.id" class="flex flex-col gap-2">
        <p>{{ item.qty }}</p>
      </div> -->
      <ClientOnly>
        <ContentTicketContainer ref="ticketContainer" :tickets="selectedTickets" :user-login="user" @update="handleTicketUpdate" />
      </ClientOnly>
    </div>

    <hr />

    <div class="border border-[#94A3B81F] rounded-xl p-3 bg-[#94A3B81F]">
      <div class="flex items-center gap-4">
        <!-- THUMBNAIL -->
        <div class="size-20 bg-white rounded shrink-0 overflow-hidden">
          <NuxtImg :src="product?.cover ?? ''" :alt="product?.cover + '-thumbnail'" class="w-full h-full object-fill" />
        </div>

        <!-- CONTENT -->
        <div class="flex flex-col shrink-0 flex-1 min-w-0 gap-1 self-start">
          <!-- TITLE -->
          <h3 class="text-sm md:text-base uppercase font-bold">
            {{ product?.title ?? '' }}
          </h3>

          <!-- Price -->
          <ClientOnly>
            <div v-if="cart?.total" class="flex text-menu items-start text-xs md:text-lg gap-1 md:gap-2">
              <p>Rp</p>
              <p>{{ currency(cart.total) }}</p>
            </div>
          </ClientOnly>
        </div>
      </div>
    </div>

    <hr />

    <table class="w-full text-sm">
      <tbody v-if="!isLoadingCart">
        <tr v-if="cart?.total">
          <td class="py-2">Subtotal</td>
          <th class="py-2 text-right">Rp {{ cart.total ? currency(cart.total) : 0 }}</th>
        </tr>

        <tr>
          <td class="py-2">Pembelian Tambahan</td>
          <th class="py-2 text-right">Rp {{ 0 }}</th>
        </tr>

        <tr v-if="cart?.discount">
          <td class="py-2">Diskon</td>
          <th class="py-2 text-right">Rp {{ cart?.discount ? currency(cart.discount) : 0 }}</th>
        </tr>
        <tr v-if="cart?.tax">
          <td class="py-2">Pajak</td>
          <th class="py-2 text-right">Rp {{ cart?.tax ? currency(cart.tax) : 0 }}</th>
        </tr>
        <tr v-if="cart?.admin_fee">
          <td class="py-2">Biaya admin</td>
          <th class="py-2 text-right">Rp {{ cart?.admin_fee ? currency(cart.admin_fee) : 0 }}</th>
        </tr>

        <tr>
          <td class="py-2 font-semibold text-xl">Total</td>
          <th class="py-2 text-right font-semibold text-xl">Rp {{ cart?.grand_total ? currency(cart?.grand_total) : 0 }}</th>
        </tr>
      </tbody>
      <tr v-for="i in 4" v-else :key="i">
        <td class="py-2">
          <Skeleton class="h-4 w-24 rounded-md" />
        </td>
        <td class="py-2 text-right">
          <Skeleton class="h-4 w-16 ml-auto rounded-md" />
        </td>
      </tr>
    </table>

    <div class="fixed w-full z-10 bottom-0 left-0 bg-footer shadow-[0px_-2px_4px_rgba(0,0,0,0.05)]">
      <AppContainer class="p-4">
        <Button type="submit" class="w-full" :disabled="!bank_id">Bayar Sekarang</Button>
      </AppContainer>
    </div>
  </form>
</template>

<script setup lang="ts">
import { z } from 'zod';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { ClientOnly, ContentTicketContainer, LabelSection } from '#components';
import type { Cart, CartResponse, Payment, Product, ProductResponse, TransactionResponse } from '~/types/api';
import { urlApiCart, urlApiCheckout, urlApiProducts } from '~/constants';
import type { TicketWithUsers } from '~/types/data';

const title = 'Checkout';

definePageMeta({
  layout: 'detail',
  middleware: 'auth',
  isPaddingTop: true,
  isPaddingBottom: true,
  isShadow: true,
});

useSeoMeta({
  title: title,
});

const appStore = useAppStore();
const route = useRoute();
const router = useRouter();
const slug = computed(() => route.params.slug);
// const amountParams = Number(route.query.amount ?? 0);
const amountParams = 0;
const selectedTickets = Object.values(JSON.parse(route.query.selectedTickets as string));
const isLoading = ref(false);
const isLoadingCart = ref(false);
const product = ref<Product>();
const cart = ref<Cart>();

// Tambahkan di script setup
const finalTicketData = ref<TicketWithUsers[]>([]);
const ticketContainer = ref<ComponentPublicInstance<{ validateAll: () => Promise<boolean> }>>();
// Untuk Update Selected Ticket nambahin dengan user
function handleTicketUpdate(result: TicketWithUsers[]) {
  finalTicketData.value = result;
  console.log('Final Ticket Data:', result);
}

const fetchDetailProduct = async (slug: string) => {
  // if (isLoading.value || isLastPage.value) return;
  isLoading.value = true;

  try {
    const { data } = await apiSaforiginal.get<ProductResponse>(urlApiProducts + '/' + slug);
    product.value = data.product ?? {};

    fetchDetailCart(data.product?.id, voucher_code.value ?? '');
  } catch (error) {
    console.error('Error fetching product:', error);
  } finally {
    isLoading.value = false;
  }
};

const fetchDetailCart = async (product: string | number, voucher_code?: string) => {
  // if (isLoading.value || isLastPage.value) return;
  isLoadingCart.value = true;

  try {
    const params = {
      product_id: product,
      amount: amountParams,
      voucher_code: voucher_code ?? '',
      tickets: selectedTickets,
    };
    const { data } = await apiSaforiginal.post<CartResponse>(urlApiCart, params);
    cart.value = data.cart ?? {};
  } catch (error) {
    console.error('Error fetching cart:', error);
    handleValidationError(error, setErrors);
    fetchDetailCart(product ?? 0, '');
  } finally {
    isLoadingCart.value = false;
  }
};

// Ambil instance authStore
const authStore = useAuthStore();

// Ambil data user dari store
const user = computed(() => authStore.user);

// Jalankan logika untuk memuat data pengguna
onMounted(() => {
  if (!authStore.user) {
    // Pulihkan user dari cookie jika hilang
    authStore.getUser();
  }

  appStore.fetchPayments();
  fetchDetailProduct(slug.value as string);
});

const schema = z.object({
  voucher_code: z.string().optional(),
  bank: z
    .object({
      value: z.union([z.string(), z.number()]),
      label: z.string(),
    })
    .nullable()
    .refine((val) => val !== null, {
      message: 'Bank harus dipilih',
    }),
});

const { defineField, handleSubmit, errors, setFieldValue, setErrors } = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    voucher_code: '',
    bank: null,
  },
});

const [voucher_code] = defineField('voucher_code');
const bank_id = ref<Payment | null>(null);
const bankTouched = ref(false);
const loadingStore = useLoadingStore();

// Watch address changes and sync with form
watch(bank_id, (newValue: Payment | null) => {
  if (newValue) {
    setFieldValue('bank', {
      value: newValue.id,
      label: newValue.name ?? '', // fallback kalau text null
    });
    bankTouched.value = true;
  } else {
    setFieldValue('bank', null);
  }
});

const applyVoucher = async () => {
  await fetchDetailCart(product?.value?.id ?? 0, voucher_code.value ?? '');
};

const payments = computed(() => appStore.payments);

const onSubmit = handleSubmit(async (values) => {
  const allValid = await ticketContainer.value?.validateAll();

  if (!allValid) {
    notify.warning('Lengkapi semua data pemegang tiket sebelum melanjutkan.');
    return;
  }

  // lanjutkan submit checkout
  console.log('All valid! Kirim ke backend...', finalTicketData.value);
  try {
    loadingStore.start();
    isLoading.value = true;

    const response = await apiSaforiginal.post<TransactionResponse>(urlApiCheckout, {
      product_id: product.value?.id,
      amount: amountParams,
      voucher_code: values.voucher_code,
      payment_id: bank_id.value?.id,
      tickets: finalTicketData.value,
    });

    const { message } = response;
    notify.success(message);

    await router.replace({
      path: '/event/payment/',
      query: {
        transaction_id: response.data.transaction.id,
      },
    });
  } catch (error: any) {
    if (error?.code >= 500) {
      notify.error(error?.message);
    } else {
      handleValidationError(error, setErrors);
    }
  } finally {
    isLoading.value = false;
    loadingStore.stop();
  }
});
</script>
