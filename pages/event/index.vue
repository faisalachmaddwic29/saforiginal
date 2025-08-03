<template>
  <div>
    <!-- Toolbar -->
    <AppToolbar>
      <div class="flex items-center px-4 h-full gap-4 justify-between">
        <NuxtLink to="/event/search" class="flex items-center cursor-pointer flex-1 rounded-full border border-[rgba(151,151,151,0.2)] text-[rgba(77,77,77,0.03)] h-[48px] px-4">
          <Icon name="iconamoon:search" class="text-2xl text-[#627086] mr-2" />
          <input type="text" placeholder="Masukan pencarian kamu" class="!cursor-pointer font-manrope bg-transparent placeholder-menu/30 text-menu text-base focus:outline-none w-full" readonly />
        </NuxtLink>
        <NuxtImg src="/images/icons/filter.svg" alt="filter" class="h-6 w-6 cursor-pointer" @click="handleFilter" />
      </div>
    </AppToolbar>

    <!-- Drawer Filter -->
    <DrawerCustom v-model:open="showDrawer" title="All Share Menu" description="Kelola Share Menu" :show-indicator="true" classes="h-full pb-0 !mb-0">
      <AppContainer class="p-4">
        <div class="flex flex-col justify-between h-full">
          <!-- Filters -->
          <div class="flex flex-col gap-5 shrink text-title dark:text-menu">
            <!-- Header -->
            <div class="flex justify-between items-center border-b pb-2">
              <h3 class="text-2xl font-bold">Filter</h3>
              <Button type="button" variant="link" class="text-destructive px-0" @click="resetFilter">Reset</Button>
            </div>

            <!-- Kategori -->
            <div>
              <h3 class="pb-2 font-bold">Kategori</h3>
              <div class="w-full flex flex-wrap gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-hide">
                <FormRadio v-model="kategori" :options="kategori_data" />
              </div>
            </div>

            <!-- Jenis Kajian -->
            <div>
              <h3 class="pb-2 font-bold">Jenis Kajian</h3>
              <div class="w-full flex flex-wrap gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-hide">
                <FormRadio v-model="jenis_kajian" :options="jenis_kajian_data" />
              </div>
            </div>

            <!-- Waktu -->
            <div>
              <h3 class="pb-2 font-bold">Waktu</h3>
              <div class="w-full flex flex-wrap gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-hide">
                <FormRadio v-model="waktu" :options="waktu_data" />
              </div>
            </div>

            <!-- Lokasi -->
            <div>
              <h3 class="pb-2 font-bold">Lokasi</h3>
              <div ref="dropdownRef" class="mb-3 relative">
                <!-- Trigger -->
                <button
                  type="button"
                  class="relative cursor-pointer font-manrope ring-none border transition duration-300 ease-in-out rounded-lg outline-none px-4 py-3 appearance-none border-[#C5C5C5] dark:border-[rgba(197,197,197,0.2)] w-full"
                  @click="isOpen = !isOpen"
                >
                  <p v-if="lokasiText" class="font-manrope font-normal text-sm md:text-base text-start">
                    {{ lokasiText?.domicile?.city_name + ' - ' + lokasiText?.domicile?.province_name }}
                  </p>
                  <p v-else class="font-manrope font-normal text-sm md:text-base text-start">Cari Lokasi ...</p>
                  <Icon name="material-symbols:arrow-drop-down-rounded" class="absolute top-[8px] right-2 text-3xl text-subtle cursor-pointer" />
                </button>

                <!-- Dropdown List -->
                <div v-if="isOpen" class="z-50 w-full mt-1 bg-white dark:bg-[#1a1a1a] rounded-lg shadow border border-gray-200 dark:border-gray-700 absolute left-0">
                  <div class="relative w-full items-center text-sm md:text-base text-title dark:text-menu">
                    <input
                      v-model="lokasiKeyword"
                      autofocus
                      placeholder="Cari Lokasi..."
                      class="w-full font-manrope ring-none placeholder-[#C5C5C5] font-normal dark:placeholder-[rgba(197,197,197,0.2)] transition duration-300 ease-in-out rounded-none outline-none px-4 py-3 appearance-none h-10 border-b border-gray-200 dark:border-gray-700 bg-transparent"
                    />
                  </div>

                  <div v-if="locations_data.length === 0" class="p-4 text-sm md:text-base text-title dark:text-menu font-manrope">Tidak ditemukan lokasi ...</div>

                  <div class="h-60 overflow-y-scroll">
                    <div
                      v-for="location in filteredLocations"
                      :key="location.id"
                      class="font-manrope text-title dark:text-menu flex items-center px-4 py-2 cursor-pointer hover:bg-primary w-full"
                      @click="selectLocation(location)"
                    >
                      <p class="w-full font-normal">{{ location.domicile?.city_name + ' - ' + location.domicile?.province_name }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="w-full flex flex-wrap gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-hide">
                <FormRadio v-model="lokasi" :options="lokasi_data" />
              </div>
            </div>
          </div>

          <!-- Submit -->
          <Button type="button" variant="default" class="w-full" @click="applyFilter">Terapkan</Button>
        </div>
      </AppContainer>
    </DrawerCustom>

    <!-- Result Cards -->
    <div class="p-4">
      <LabelTitle label="Temukan Event yang kamu cari" />

      <div class="py-4">
        <CardLoading v-if="isFirstLoading" :rows="2" :length="4" />

        <div v-else class="grid grid-cols-2 gap-4">
          <CardProduct
            v-for="product in events"
            :id="product.id + '-events'"
            :key="product.id + '-events'"
            :is-full="true"
            :thumbnail="product.cover"
            :title="product.title"
            :slug="product.slug"
            :type="toProductType(product.type)"
          />
        </div>

        <div v-show="events.length === 0" class="mt-32">
          <NuxtImg src="/images/empty.png" alt="Empty Article" class="aspect-auto w-full px-12" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Composables
import { useIntersectionObserver, onClickOutside } from '@vueuse/core';
import { useRoute } from 'vue-router';
import { onMounted, ref, computed, watch } from 'vue';

// Types
import { ProductTimeType, ProductType, toProductType, type Product, type ProductsResponse, type Location } from '~/types/api';

// Setup
const title = 'Event';
definePageMeta({ layout: 'home', isShadow: true, isPaddingTop: true, isPaddingBottom: true, title });
useSeoMeta({ title });

// State
const isOpen = ref(false);
const showDrawer = ref(false);
const route = useRoute();

const events = ref<Product[]>([]);
const page = ref(1);
const isLoading = ref(false);
const isFirstLoading = ref(true);
const isLastPage = ref(false);
const loadMoreTrigger = ref<HTMLElement | null>(null);

const kategori = ref((route.query.category as string) ?? 'all');
const jenis_kajian = ref(Array.isArray(route.query.type) ? route.query.type.join(',') : (route.query.type as string) ?? 'all');
const waktu = ref((route.query.date as string) ?? 'all');
const lokasi = ref((route.query.location as string) ?? 'all');
const lokasiText = ref<Location | null>(null);
const lokasiKeyword = ref('');
const dropdownRef = ref(null);

const appStore = useAppStore();

// Options
const jenis_kajian_data = [
  { value: 'all', label: 'Semua' },
  { value: ProductType.EVENT, label: 'Event' },
  { value: ProductType.ONLINE_EVENT, label: 'Event Online' },
  { value: ProductType.OFFLINE_EVENT, label: 'Event Offline' },
  { value: ProductType.VIDEO_SERIES, label: 'Web Series' },
];

const waktu_data = [
  { value: ProductTimeType.ALL, label: 'Semua' },
  { value: ProductTimeType.TODAY, label: 'Hari ini' },
  { value: ProductTimeType.TOMORROW, label: 'Besok' },
  { value: ProductTimeType.THIS_WEEK, label: 'Minggu Ini' },
  { value: ProductTimeType.THIS_MONTH, label: 'Bulan Ini' },
  { value: ProductTimeType.NEXT_MONTH, label: 'Bulan Depan' },
];

const lokasi_data = [
  { value: 'all', label: 'Semua' },
  { value: '151,152,153,154,155', label: 'Jakarta' },
  { value: '23', label: 'Bandung' },
  { value: '444', label: 'Surabaya' },
  { value: '501', label: 'Yogyakarta' },
];

const kategori_data = computed(() => [{ value: 'all', label: 'Semua' }, ...appStore.categories.map((c) => ({ value: c.slug, label: c.name }))]);

const locations_data = computed(() => appStore.locations.filter((l) => l.domicile?.city_type === 'Kota').map((l) => ({ id: l.id, domicile: l.domicile, text: l.text })));

const filteredLocations = computed(() => locations_data.value.filter((l) => l.text?.toLowerCase().includes(lokasiKeyword.value.toLowerCase())));

// API Call
const fetchEvents = async () => {
  if (isLoading.value || isLastPage.value) return;
  isLoading.value = true;

  try {
    const lokasiChoose = lokasiText.value ? lokasiText.value.id.toString() : lokasi.value;
    const { data } = await apiSaforiginal.get<ProductsResponse>(`/v1/products?${buildParams({ type: jenis_kajian.value, category: kategori.value, date: waktu.value, location: lokasiChoose })}`);

    if (data.products?.length) {
      events.value.push(...data.products);
      page.value++;
    } else {
      isLastPage.value = true;
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  } finally {
    isLoading.value = false;
    isFirstLoading.value = false;
  }
};

// Helpers
const buildParams = ({
  type = null,
  category = null,
  date = null,
  location = null,
}: {
  type?: string | null;
  category?: string | null;
  date?: string | null;
  location?: string | null;
} = {}) => {
  const params = new URLSearchParams();

  if (category && category !== 'all') {
    params.append('category', category);
  }
  if (date && date !== 'all') {
    params.append('date', date);
  }
  if (location && location !== 'all') {
    params.append('location', location);
  }

  if (type && type !== 'all') {
    params.append('type', type);
  }

  params.append('page', String(page.value));
  params.append('per_page', '10');
  params.append('sort', '-created_at');

  return params.toString();
};

const resetFirstFetch = () => {
  events.value = [];
  page.value = 1;
  isLastPage.value = false;
  isFirstLoading.value = true;
};

const handleFilter = () => (showDrawer.value = true);
const applyFilter = () => {
  showDrawer.value = false;
  resetFirstFetch();
  fetchEvents();
};

const resetFilter = () => {
  lokasiText.value = null;
  kategori.value = (route.query.category as string) ?? 'all';
  jenis_kajian.value = Array.isArray(route.query.type) ? route.query.type.join(',') : (route.query.type as string) ?? 'all';
  waktu.value = (route.query.date as string) ?? 'all';
  lokasi.value = (route.query.location as string) ?? 'all';
};

const selectLocation = (location: Location) => {
  lokasiText.value = location;
  lokasiKeyword.value = '';
  isOpen.value = false;
};

// Effects
watch(
  () => route.query,
  () => {
    kategori.value = (route.query.category as string) ?? 'all';
    jenis_kajian.value = Array.isArray(route.query.type) ? route.query.type.join(',') : (route.query.type as string) ?? 'all';
    waktu.value = (route.query.date as string) ?? 'all';
    lokasi.value = (route.query.location as string) ?? 'all';
    resetFirstFetch();
    fetchEvents();
  },
  { immediate: true }
);

useIntersectionObserver(
  loadMoreTrigger,
  ([{ isIntersecting }]) => {
    if (isIntersecting) fetchEvents();
  },
  { rootMargin: '0px', threshold: 1.0 }
);

onMounted(async () => {
  await appStore.fetchLocations();
  await appStore.fetchCategories();
});

onClickOutside(dropdownRef, () => {
  isOpen.value = false;
});
</script>
