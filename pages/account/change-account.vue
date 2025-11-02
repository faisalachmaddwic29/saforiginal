<template>
  <div class="px-4 py-5 w-full">
    <form class="relative" @submit="onSubmit">
      <div class="">
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <div class="text-title text-sm font-bold">Foto</div>
            <div class="flex items-center gap-3" w-full>
              <PhotoProfile :name="user?.name ?? ''" :width="100" :height="100" :image-url="imageUrl" />
              <div class="flex flex-col flex-1 gap-2 w-full">
                <div class="text-title text-sm">Upload gambar dengan format PNG atau JPG. dan berukuran tidak lebih dari 2 MB</div>
                <div class="w-auto">
                  <input ref="fileInput" type="file" accept="image/png, image/jpg, image/jpeg" class="hidden" @change="handleFileChange" />
                  <Button variant="outline-secondary" size="sm" type="button" @click="triggerFileInput">Upload</Button>
                </div>
              </div>
              <FormMessageError v-if="errors.avatar_url" :message="errors.avatar_url" />
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <div class="text-title text-sm font-bold">Nama</div>
            <FormInput id="name" v-model="name" type="text" name="name" placeholder="Nama lengkap" :error="errors.name" />
          </div>
          <div class="flex flex-col gap-2">
            <div class="text-title text-sm font-bold">Domisili</div>
            <div>
              <Combobox v-model="location_id" by="label">
                <ComboboxAnchor as-child class="w-full">
                  <ComboboxTrigger as-child>
                    <button
                      type="button"
                      class="relative cursor-pointer font-manrope ring-none border transition duration-300 ease-in-out rounded-lg outline-none px-4 py-3 appearance-none"
                      :class="[
                        errors.address && addressTouched ? 'border-red-500 dark:border-red-400' : 'border-[#C5C5C5] dark:border-[rgba(197,197,197,0.2)]',
                        { 'text-[#C5C5C5] dark:text-[rgba(197,197,197,0.2)]': !location_id },
                      ]"
                    >
                      <p class="font-manrope text-sm md:text-base text-start">
                        {{ location_id?.text ?? 'Cari kota' }}
                      </p>
                      <Icon name="material-symbols:arrow-drop-down-rounded" class="absolute top-[8px] right-2 text-3xl text-subtle cursor-pointer" />
                    </button>
                  </ComboboxTrigger>
                </ComboboxAnchor>

                <!-- Dropdown -->
                <ComboboxList align="start" side="bottom" :prioritize-position="true" :side-offset="0" :align-offset="0">
                  <div class="relative w-full items-center text-sm md:text-base text-title dark:text-menu">
                    <ComboboxInput
                      class="font-manrope ring-none placeholder-[#C5C5C5] dark:placeholder-[rgba(197,197,197,0.2)] transition duration-300 ease-in-out rounded-none outline-none px-4 py-3 appearance-none h-10"
                      placeholder="Cari kota..."
                    />
                    <span class="absolute left-0 inset-y-0 flex items-center justify-center px-3">
                      <!-- <Search class="size-4 text-muted-foreground" /> -->
                    </span>
                  </div>

                  <ComboboxEmpty class="p-4 text-sm md:text-base text-title dark:text-menu font-manrope"> Cari nama kota tempat tinggal anda. </ComboboxEmpty>

                  <ComboboxGroup class="h-60 overflow-y-scroll">
                    <ComboboxItem
                      v-for="location in appStore.locations"
                      :key="location.id"
                      :value="location"
                      class="font-manrope text-title dark:text-menu flex items-center px-4 py-2 cursor-pointer hover:bg-primary w-full"
                    >
                      {{ location.text }}
                    </ComboboxItem>
                  </ComboboxGroup>
                </ComboboxList>
              </Combobox>

              <!-- Error message for address -->
              <FormMessageError v-if="errors.address && addressTouched" :message="errors.address" />
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <div class="text-title text-sm font-bold">Jenis Kelamin</div>
            <div class="gender">
              <FormRadio
                v-model="genderValue"
                :options="[
                  { value: 'L', label: 'Laki-laki' },
                  { value: 'P', label: 'Perempuan' },
                ]"
              />
              <!-- Error message for gender -->
              <FormMessageError v-if="errors.gender && genderTouched" :message="errors.gender" />
            </div>
          </div>
        </div>
      </div>
      <div class="fixed w-full z-10 bottom-0 left-0 bg-footer shadow-[0px_-2px_4px_rgba(0,0,0,0.05)]">
        <AppContainer class="p-4">
          <Button class="w-full" type="submit" :disabled="isLoading">{{ isLoading ? 'Loading...' : 'Simpan Perubahan' }}</Button>
        </AppContainer>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import type { UserResponse } from '~/types/auth';
import type { Location } from '~/types/api';
import { urlAuthProfile } from '~/constants';

const dialog = useDialog();
const title = 'Ubah Data Akun';

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

const authStore = useAuthStore();

// Ambil data user dari store
const user = computed(() => authStore.user);

const registrationSchema = z.object({
  name: z.string().min(1, 'Nama lengkap harus diisi').max(50, 'Nama maksimal 50 karakter'),
  // .regex(/^[a-zA-Z\s]+$/, 'Nama hanya boleh berisi huruf dan spasi'),
  address: z
    .object({
      value: z.union([z.string(), z.number()]),
      label: z.string(),
    })
    .nullable()
    .refine((val) => val !== null, {
      message: 'Kota harus dipilih',
    }),
  avatar_url: z.string().nullable(),
  gender: z.string().min(1, 'Jenis kelamin harus dipilih'),
});

const imageUrl = ref<string | null>(null);
const selectedFile = ref<File | null>(null);

const fileInput = ref<HTMLInputElement | null>(null);

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileChange = (event: Event) => {
  const fileInput = event.target as HTMLInputElement;
  const file = fileInput?.files ? fileInput.files[0] : null;

  if (file && file.size <= 2 * 1024 * 1024) {
    selectedFile.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      imageUrl.value = e.target?.result as string;
    };
    reader.readAsDataURL(selectedFile.value);
  } else {
    notify.error('Ukuran file tidak boleh lebih dari 2MB');
  }
};

const { defineField, handleSubmit, errors, setFieldValue, setErrors } = useForm({
  validationSchema: toTypedSchema(registrationSchema),
  initialValues: {
    name: '',
    address: null,
    gender: '',
    avatar_url: null,
  },
  validateOnMount: false,
});

const addressTouched = ref(false);
const genderTouched = ref(false);

// Define fields
const [name] = defineField('name');

// Custom handling for address and gender (non-input fields)
const location_id = ref<Location | null>(null);
const genderValue = ref('');

// Watch address changes and sync with form
watch(location_id, (newValue: Location | null) => {
  if (newValue) {
    setFieldValue('address', {
      value: newValue.id,
      label: newValue.text ?? '', // fallback kalau text null
    });
    addressTouched.value = true;
  } else {
    setFieldValue('address', null);
  }
});

// Watch gender changes and sync with form
watch(genderValue, (newValue) => {
  setFieldValue('gender', newValue);

  // Mark as touched when user interacts
  if (newValue) {
    genderTouched.value = true;
  }
});

const loadingStore = useLoadingStore();
const registrationStore = useRegistrationStore();
// Reset state saat halaman dimuat
onBeforeMount(() => {
  registrationStore.reset();
});

// Handle form submission
const onSubmit = handleSubmit(
  async (values) => {
    dialog.show({
      title: 'Simpan perubahan profile',
      buttonConfirmLabel: 'Simpan',
      onConfirm: async () => {
        try {
          loadingStore.start();
          isLoading.value = true;
          const response = await apiSaforiginal.post<UserResponse>(
            urlAuthProfile,
            {
              avatar_url: selectedFile.value,
              metadata: JSON.stringify({
                name: values.name,
                location_id: values.address?.value,
                gender: values.gender,
              }),
              _method: 'PUT',
            },
            undefined,
            { 'Content-Type': 'multipart/form-data' }
          );

          const { data, message } = response;
          authStore.setUser(data?.user);
          notify.success(message);

          navigateTo('/account', { replace: true });
        } catch (error: any) {
          if (error?.code >= 500) {
            notify.error(error?.message);
          } else {
            handleValidationError(error, setErrors);
          }

          // Handle error (bisa tambahkan toast/notification)
        } finally {
          isLoading.value = false;
          loadingStore.stop();
        }
      },
    });
  },
  (errors) => {
    addressTouched.value = true;
    genderTouched.value = true;
    console.error('Validation errors:', errors);
  }
);

const appStore = useAppStore();

// Jalankan logika untuk memuat data pengguna
onMounted(() => {
  if (!authStore.user) {
    // Pulihkan user dari cookie jika hilang
    authStore.getUser();
  }
  if (user.value) {
    name.value = user.value?.name;
    location_id.value = {
      id: Number(user.value?.location?.id),
      domicile: null,
      text: user.value?.location?.text ?? '',
    };
    genderValue.value = user.value?.gender;
    imageUrl.value = user.value?.avatar_url;
  }

  appStore.fetchLocations();
});
</script>
