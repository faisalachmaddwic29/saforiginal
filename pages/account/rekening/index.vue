<template>
  <div class="px-4 py-5">
    <!-- Skeleton Loader -->
    <div v-if="isLoadingBanks" class="flex flex-col gap-3">
      <template v-for="n in 10" :key="n">
        <Skeleton class="w-full h-[64px]" />
      </template>
    </div>

    <!-- Bank List -->
    <div v-else-if="banks && banks.length > 0" class="flex flex-col gap-3">
      <template v-for="bank in banks" :key="bank.bank_id">
        <ListItemButton :title="bank.bank.name" :subtitle="bank.account + ' a.n ' + bank.account_name" type="default">
          <template #actions>
            <button @click="openDrawer(bank)">
              <Icon name="heroicons:ellipsis-vertical-20-solid" class="text-xl text-title cursor-pointer" />
            </button>
          </template>
        </ListItemButton>
      </template>
    </div>

    <!-- No Banks Registered -->
    <div v-else>
      <p class="text-center font-poppins text-sm">Tidak ada Bank Accounts yang terdaftar</p>
    </div>

    <!-- Drawer Custom -->
    <DrawerCustom v-model:open="showDrawer" title="Popup Bank" description="Kelola Popup Bank" :show-indicator="false">
      <div class="flex flex-col divide-y-1">
        <button class="bg-background cursor-pointer w-full flex items-center justify-center py-4 rounded-t-lg" @click="editBank(selectedBank)">Edit</button>
        <button class="text-red-500 bg-background cursor-pointer w-full flex items-center justify-center py-4 rounded-b-lg" @click="confirmDeleteBank(selectedBank.id)">Hapus</button>
      </div>
      <button class="bg-background cursor-pointer w-full flex items-center justify-center py-4 rounded-lg" @click="showDrawer = false">Cancel</button>
    </DrawerCustom>

    <!-- Dialog Custom -->
    <DialogCustom
      v-model:open="showDeleteBank"
      content-footer-class="gap-4 flex-row-reverse m-auto"
      button-confirm-title="Hapus"
      message="Apakah Kamu yakin ingin menghapus rekening?"
      message-class="text-center"
      title-class="text-center"
      title="Hapus Rekening"
      type="error"
      button-confirm-class="text-title bg-red-500 hover:bg-red-600"
      button-cancel-title="Batal"
      @close="showDeleteBank = false"
      @confirm="deleteBank(bankId)"
    />

    <!-- Add Bank Button -->
    <Button type="button" variant="outline" class="w-full border-primary mt-5" @click="$router.push('/account/rekening/add')">
      <Icon name="heroicons:plus-small-solid" class="text-xl mr-2" />
      <p class="text-base md:text-lg">Tambah Rekening</p>
    </Button>
  </div>
</template>

<script setup lang="ts">
const title = 'Rekening';
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

const isLoadingBanks = ref(false);
type Bank = {
  id: number;
  name: string;
  code: string;
};

type AccountBank = {
  id: number;
  bank_id: number;
  branch: string;
  account: string;
  account_name: string;
  account_verified: boolean | null;
  bank: Bank;
};

const banks = ref<AccountBank[]>([]);

type AccountBankResponse = {
  bank_accounts: AccountBank[];
};

const getBanks = async () => {
  isLoadingBanks.value = true;

  try {
    const response = await apiSaforiginal.get<AccountBankResponse>('/v1/bank-accounts');
    banks.value = response?.data?.bank_accounts || [];
  } catch (error: any) {
    console.error(error);
  } finally {
    isLoadingBanks.value = false;
  }
};

const loadingStore = useLoadingStore();

const editBank = (bank: AccountBank) => {
  console.log(`Editing bank: ${bank.bank.name}`);
  console.log(`Editing bank with ID: ${bank.id}`);

  // navigateTo("/account/rekening/" + bank.id, state: { data: bank });
  // Navigasi ke halaman lain dengan data bank
  navigateTo({
    path: '/account/rekening/' + bank.id,
    query: {
      bank_id: bank.bank_id,
      bank_name: bank.bank.name,
      account: bank.account,
      branch: bank.branch,
      account_name: bank.account_name,
    },
  });
};

const deleteBank = async (id: number | null) => {
  if (!id) notify.error('ID Bank tidak valid');
  console.log(`Deleting bank with ID: ${id}`);

  loadingStore.start();

  try {
    const response = await apiSaforiginal.delete('/v1/bank-accounts/' + id);

    const { message } = response;

    notify.success(message);

    getBanks();
  } catch (error: any) {
    console.error(error);
  } finally {
    loadingStore.stop();
  }
};

const showDrawer = ref(false);
const selectedBank = ref(); // Untuk menyimpan data bank yang dipilih

/**
 * Membuka drawer dengan data bank yang dipilih
 * @param bank Data bank yang dipilih
 */

const openDrawer = (bank: AccountBank) => {
  console.log('Opening drawer for bank:', bank);
  console.log(bank);
  selectedBank.value = bank; // Simpan data bank yang dipilih
  showDrawer.value = true; // Tampilkan drawer
};

const showDeleteBank = ref(false);
const bankId = ref<number | null>(null);

const confirmDeleteBank = (id: number) => {
  bankId.value = id; // Simpan ID bank yang akan dihapus
  showDrawer.value = false;
  showDeleteBank.value = true; // Tampilkan dialog konfirmasi
};

onMounted(() => {
  getBanks();
});
</script>
