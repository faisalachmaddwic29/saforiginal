<template>
  <form class="flex flex-col min-dvh-screen px-4 py-5 relative" @submit.prevent="onSubmit">
    <p class="text-xs md:text-sm text-[#1E293B] dark:text-[#94A3B8] mb-5">Tambahkan rekening pencairan komisi</p>

    <!-- Form Login Password -->
    <div class="flex flex-col gap-5">
      <div>
        <p class="mb-1 font-lato font-bold text-sm text-[#1E293B] dark:text-[#94A3B8]">Bank</p>
        <Combobox v-model="bank_id" by="label">
          <ComboboxAnchor as-child class="w-full">
            <ComboboxTrigger as-child>
              <button
                type="button"
                class="relative font-manrope ring-none border transition duration-300 ease-in-out rounded-lg outline-none px-4 py-3 appearance-none"
                :class="[
                  errors.bank && bankTouched ? 'border-red-500 dark:border-red-400' : 'border-[#C5C5C5] dark:border-[rgba(197,197,197,0.2)]',
                  { 'text-[#C5C5C5] dark:text-[rgba(197,197,197,0.2)]': !bank_id },
                ]"
              >
                <p class="font-manrope text-sm md:text-base text-start">
                  {{ bank_id?.label ?? 'Pilih bank' }}
                </p>
                <Icon name="material-symbols:arrow-drop-down-rounded" class="absolute top-[8px] right-2 text-3xl text-subtle cursor-pointer" />
              </button>
            </ComboboxTrigger>
          </ComboboxAnchor>

          <!-- Dropdown -->
          <ComboboxList align="start" side="bottom" :prioritize-position="true" :side-offset="0" :align-offset="0">
            <div class="relative w-full items-center text-sm md:text-base text-[#1E293B] dark:text-[#94A3B8]">
              <ComboboxInput
                class="font-manrope ring-none placeholder-[#C5C5C5] dark:placeholder-[rgba(197,197,197,0.2)] transition duration-300 ease-in-out rounded-none outline-none px-4 py-3 appearance-none h-10"
                placeholder="Pilih bank..."
              />
              <span class="absolute left-0 inset-y-0 flex items-center justify-center px-3"> </span>
            </div>

            <ComboboxEmpty class="p-4 text-sm md:text-base text-[#1E293B] dark:text-[#94A3B8] font-manrope"> Cari nama bank. </ComboboxEmpty>

            <ComboboxGroup class="h-60 overflow-y-scroll">
              <ComboboxItem
                v-for="bank in banks"
                :key="bank.id"
                :value="bank"
                class="font-manrope text-[#1E293B] dark:text-[#94A3B8] flex items-center px-4 py-2 cursor-pointer hover:bg-primary w-full"
              >
                {{ bank.label }}
                <ComboboxItemIndicator>
                  <Check class="ml-auto h-4 w-4" />
                </ComboboxItemIndicator>
              </ComboboxItem>
            </ComboboxGroup>
          </ComboboxList>
        </Combobox>

        <!-- Error message for banks -->
        <FormMessageError v-if="errors.bank && bankTouched" :message="errors.bank" />
      </div>

      <FormInput id="branch" v-model="branch" type="text" name="branch" label-text="Cabang bank" placeholder="Masukan cabang bank" :error="errors.branch" />

      <FormInput id="account" v-model="account" type="text" name="account" label-text="Nomor rekening" placeholder="Masukan Nomor rekening" :is-number="true" :error="errors.account" />

      <FormInput id="account_name" v-model="account_name" type="text" name="account_name" label-text="Nama pemilik rekening" placeholder="Masukan nama pemilik rekening" :error="errors.account_name" />
    </div>

    <div class="fixed w-full z-10 bottom-0 left-0 bg-white dark:bg-[#0F172A] shadow-[0px_-2px_4px_rgba(0,0,0,0.05)] p-4">
      <AppContainer>
        <Button class="w-full" type="submit" :disabled="isLoading">{{ isLoading ? 'Loading...' : 'Simpan' }}</Button>
      </AppContainer>
    </div>
  </form>
</template>

<script setup lang="ts">
import { Check } from 'lucide-vue-next';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

const title = 'Tambah Rekening';
definePageMeta({
  layout: 'detail',
  middleware: 'auth',
  isPaddingTop: true,
  isPaddingBottom: true,
  title: title,
});

useSeoMeta({
  title: title,
});

type BankOption = {
  id: number;
  value: string;
  label: string;
};

type BanksResponse = {
  banks: BankOption[];
};

const isLoading = ref(false);
const isLoadingBanks = ref(false);
const banks = ref<BankOption[]>([]);

// Zod Schema Validation
const bankSchema = z.object({
  bank: z
    .object({
      value: z.union([z.string(), z.number()]),
      label: z.string(),
    })
    .nullable()
    .refine((val) => val !== null, {
      message: 'Bank harus dipilih',
    }),

  branch: z.string().min(1, 'Nama lengkap harus diisi').max(50, 'Nama maksimal 50 karakter'),

  account: z.string().min(1, 'Nomor Rekening harus diisi'),

  account_name: z.string().min(1, 'Nama Pemilik Rekening harus diisi'),
});
// Setup vee-validate
const { defineField, handleSubmit, errors, setFieldValue, setErrors } = useForm({
  validationSchema: toTypedSchema(bankSchema),
  initialValues: {
    branch: '',
    account: '',
    account_name: '',
    bank: null as BankOption | null,
  },
  validateOnMount: false,
});

// Define fields
const [account_name] = defineField('account_name');
const [account] = defineField('account');
const [branch] = defineField('branch');
const bank_id = ref<BankOption | null>(null);
const bankTouched = ref(false);

// Watch address changes and sync with form
watch(
  bank_id,
  (newValue) => {
    setFieldValue('bank', newValue);
    if (newValue) {
      bankTouched.value = true;
    }
  },
  { deep: true }
);

const loadingStore = useLoadingStore();

// Handle submit dengan vee-validate
const onSubmit = handleSubmit(
  async (values) => {
    loadingStore.start();
    isLoading.value = true;

    console.log(values);

    try {
      const response = await apiSaforiginal.post('/v1/bank-accounts', {
        bank_id: values.bank?.value,
        branch: values.branch,
        account: values.account,
        account_name: values.account_name,
      });

      const { message } = response;
      notify.success(message);

      if (window.history.length > 3) {
        window.history.go(-1);
      } else {
        navigateTo('/account/rekening');
      }
    } catch (error: any) {
      handleValidationError(error, setErrors);

      // Handle error (bisa tambahkan toast/notification)
    } finally {
      loadingStore.stop();
      isLoading.value = false;
    }
  },
  (errors) => {
    // This callback runs when validation fails
    // Mark all custom fields as touched to show errors
    bankTouched.value = true;

    console.error('Validation errors:', errors);
  }
);

const getBanksOption = async () => {
  isLoadingBanks.value = true;

  try {
    const response = await apiSaforiginal.get<BanksResponse>('/v1/banks');
    const data = response?.data?.banks ?? [];
    if (data) {
      banks.value = data?.map((bank: any) => ({
        id: bank.id,
        value: bank.id,
        label: bank.name,
      }));
    }
  } catch (error: any) {
    handleValidationError(error, setErrors);

    // Handle error (bisa tambahkan toast/notification)
  } finally {
    isLoadingBanks.value = false;
  }
};
onMounted(() => {
  getBanksOption();
});
</script>
