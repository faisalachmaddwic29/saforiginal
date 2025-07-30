<template>
  <form @submit.prevent="onSubmit">
    <div class="px-4 py-5">
      <!-- title -->
      <div class="text-center m-auto">
        <!-- <h2 class="font-black text-2xl">Sesuaikan kategori kesukaan kamu</h2> -->
        <p class="text-xs md:text-sm text-[#1E293B] dark:text-[#94A3B8]">Dapatkan rekomendasi event sesuai pilihan kamu</p>
      </div>

      <div v-if="isLoadingCategory" class="mt-5 flex flex-col gap-3">
        <template v-for="n in 10" :key="n">
          <Skeleton class="w-full h-[64px]" />
        </template>
      </div>

      <div v-else-if="categories && categories.length > 0" class="mt-5 flex flex-col gap-3">
        <div v-for="category in categories" :key="category.value" class="relative">
          <input :id="category.value.toString()" v-model="selectedCategories" :value="category" type="checkbox" class="peer sr-only" />
          <label :for="category.value.toString()" class="flex items-center justify-center w-full p-4 text-lg font-medium border-2 border-[#F1F1F1] rounded-lg cursor-pointer transition-all duration-200 peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary hover:border-primary/40">
            {{ category.label }}
          </label>
        </div>

        <!-- Error message -->
        <FormMessageError v-if="errors.category && categoryTouched" :message="errors.category" />
      </div>
      <div v-if="categories?.length == 0 && !isLoadingCategory">
        <p class="text-center mt-4 font-poppins text-sm">Tidak ada kategori</p>
      </div>
    </div>

    <div class="fixed w-full z-10 bottom-0 left-0 bg-background shadow-[0px_-2px_4px_rgba(0,0,0,0.05)] p-4">
      <AppContainer class="flex w-full gap-3">
        <Button type="submit" class="flex-1" :disabled="isLoading">{{ isLoading ? 'Loading...' : 'Perbarui' }}</Button>
      </AppContainer>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import type { Preferences, PreferencesResponse, TagsResponse } from '~/types/api';

const title = 'Preferensi Anda';

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

const isLoading = ref(false);
const isLoadingCategory = ref(false);
const preferences = ref<Preferences>([]);
const router = useRouter();

type CategoryOption = {
  value: string | number;
  label: string;
};
const categories = ref<CategoryOption[] | null>(null);
const selectedCategories = ref<CategoryOption[]>([]);
const categoryTouched = ref(false);

const categorisSchema = z.object({
  category: z
    .array(
      z.object({
        value: z.union([z.string(), z.number()]),
        label: z.string(),
      })
    )
    .refine((val) => val.length > 0, { message: 'Kategori harus dipilih' }),
});

const { handleSubmit, errors, setFieldValue, setErrors } = useForm({
  validationSchema: toTypedSchema(categorisSchema),
  initialValues: {
    category: [] as CategoryOption[],
  },
  validateOnMount: false,
});

watch(
  selectedCategories,
  (newValue) => {
    // Transform to array of numbers
    // const selectedObjects = newValue.map((category: CategoryOption) => category.value);
    // console.log(selectedObjects);

    setFieldValue('category', newValue);

    // Mark as touched
    if (newValue.length > 0) {
      categoryTouched.value = true;
    }
  },
  { immediate: true, deep: true }
);

const getPreferenceOptions = async () => {
  try {
    const response = await apiSaforiginal.get<PreferencesResponse>('/v1/preferences');
    const data = response?.data?.preferences ?? [];
    if (data) {
      preferences.value = data;

      selectedCategories.value = preferences.value.map((preference: any) => ({
        value: preference.id,
        label: preference.name,
      }));
    } else {
      preferences.value = [];
    }
  } catch (error: any) {
    handleValidationError(error, setErrors);

    // Handle error (bisa tambahkan toast/notification)
  }
};

const getCategoryOptions = async () => {
  isLoadingCategory.value = true;

  try {
    const response = await apiSaforiginal.get<TagsResponse>('/v1/tags');
    const data = response?.data?.tags ?? [];
    if (data) {
      categories.value = data.map((tag: any) => ({
        value: tag.id,
        label: tag.name,
      }));

      getPreferenceOptions();
    }
  } catch (error: any) {
    handleValidationError(error, setErrors);
  } finally {
    isLoadingCategory.value = false;
  }
};

const loadingStore = useLoadingStore();

const onSubmit = handleSubmit(async (values) => {
  loadingStore.start();
  isLoading.value = true;

  try {
    const response = await apiSaforiginal.post('/v1/preferences', {
      tags: values.category.map((cat) => cat.value),
    });

    const { message } = response;

    notify.success(message);

    router.back();
  } catch (error: any) {
    handleValidationError(error, setErrors);
  } finally {
    isLoading.value = false;
    loadingStore.stop();
  }
});

onMounted(() => {
  getCategoryOptions();
});
</script>
