<template>
  <form class="flex flex-col min-dvh-screen px-4 py-5 relative" @submit="onSubmit">
    <h2 class="text-2xl md:text-3xl font-manrope font-extrabold mb-2.5 text-title dark:text-menu">Daftar</h2>
    <p class="text-xs md:text-sm text-title dark:text-menu">Silahkan masukkan kode OTP yang telah kami kirimkanke nomor WhatsApp anda</p>

    <div class="my-5">
      <FormOtp v-model="otp" :fields="6" :is-error="Boolean(errors.otp)" />

      <FormMessageError v-if="errors.otp" :message="errors.otp" class="justify-center" />
    </div>

    <p class="mb-10 text-xs md:text-sm text-title dark:text-menu">Tidak menerima kode verifikasi? <span class="cursor-pointer text-primary font-bold pl-0.5" @click="sendOtp">Kirim ulang</span></p>

    <!-- Form Login Password -->
    <div class="flex flex-col gap-5 mb-2.5">
      <h3 class="text-base md:text-lg font-manrope font-bold text-title dark:text-menu">Biodata Diri</h3>

      <FormInput id="name" v-model="name" type="text" name="name" placeholder="Nama lengkap" :error="errors.name" />

      <FormInput id="email" v-model="email" type="email" name="email" placeholder="Alamat email aktif" :error="errors.email" />

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

      <LabelInfo type="warning">Pastikan data yang diisi sesuai, e-tiket akan di kirimkan ke alamat email dan nomor telepon yang dicantumkan</LabelInfo>

      <!-- Gender -->
      <div class="gender">
        <h3 class="pb-2 text-sm font-bold" :class="{ 'text-red-500': errors.gender && genderTouched }">Jenis Kelamin</h3>
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

    <div class="fixed w-full z-10 bottom-0 left-0 bg-footer shadow-[0px_-2px_4px_rgba(0,0,0,0.05)]">
      <AppContainer class="p-4">
        <Button class="w-full" type="submit" :disabled="isLoading">{{ isLoading ? 'Loading...' : 'Daftar' }}</Button>
      </AppContainer>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import type { LoginPhoneRequest, LoginPhoneResponse, RegisterPhoneOtpRequest, RegisterPhoneOtpResponse } from '~/types/auth';
import type { Location, PreferenceItem, PreferencesResponse } from '~/types/api';
import { urlAuthLoginPhone } from '~/constants';

const title = 'Registrasi';

definePageMeta({
  layout: 'detail',
  middleware: 'guest',
  isPaddingTop: true,
  isPaddingBottom: true,
  title: title,
});

useSeoMeta({
  title: title,
});

// Di script setup
const router = useRouter();

onMounted(() => {
  if (!registrationStore.phone) {
    // Balik ke halaman sebelumnya
    if (history.length > 1) {
      router.back();
    } else {
      // Kalau ga ada history, ke register
      navigateTo('/login');
    }
  }
});

const appStore = useAppStore();
const preferences = ref<PreferenceItem[]>([]);

const isLoading = ref(false);

// Zod Schema Validation
const registrationSchema = z.object({
  otp: z.preprocess(
    (val) => String(val), // Konversi nilai ke string terlebih dahulu
    z.string().length(6, 'otp harus tepat 6 digit')
  ),
  name: z.string().min(1, 'Nama lengkap harus diisi').max(50, 'Nama maksimal 50 karakter'),
  // .regex(/^[a-zA-Z\s]+$/, "Nama hanya boleh berisi huruf dan spasi"),

  email: z.string().min(1, 'Email harus diisi').email('Format email tidak valid'),

  address: z
    .object({
      value: z.union([z.string(), z.number()]),
      label: z.string(),
    })
    .nullable()
    .refine((val) => val !== null, {
      message: 'Kota harus dipilih',
    }),

  gender: z.string().min(1, 'Jenis kelamin harus dipilih'),
});

// Setup vee-validate
const { defineField, handleSubmit, errors, setFieldValue, setErrors } = useForm({
  validationSchema: toTypedSchema(registrationSchema),
  initialValues: {
    otp: '',
    name: '',
    email: '',
    address: null,
    gender: '',
    // password: "",
    // password_confirmation: "",
  },
  validateOnMount: false,
});

// Track touched state manually for custom fields
const addressTouched = ref(false);
const genderTouched = ref(false);

// Define fields
const [otp] = defineField('otp');
const [name] = defineField('name');
const [email] = defineField('email');
// const [password] = defineField("password");
// const [password_confirmation] = defineField("password_confirmation");

// Custom handling for address and gender (non-input fields)
const location_id = ref<Location | null>(null);
const genderValue = ref('');

// Watch address changes and sync with form
watch(
  location_id,
  (newValue: Location | null) => {
    if (newValue) {
      setFieldValue('address', {
        value: newValue.id,
        label: newValue.text ?? '', // fallback kalau text null
      });
      addressTouched.value = true;
    } else {
      setFieldValue('address', null);
    }
  },
  { immediate: true, deep: true }
);

// Watch gender changes and sync with form
watch(
  genderValue,
  (newValue) => {
    setFieldValue('gender', newValue);

    // Mark as touched when user interacts
    if (newValue) {
      genderTouched.value = true;
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
    } else {
      preferences.value = [];
    }
  } catch (error: any) {
    handleValidationError(error, setErrors);

    // Handle error (bisa tambahkan toast/notification)
  }
};

const loadingStore = useLoadingStore();
const authStore = useAuthStore();
const registrationStore = useRegistrationStore();

// Handle form submission
const onSubmit = handleSubmit(
  async (values) => {
    loadingStore.start();
    isLoading.value = true;

    try {
      const response = await apiSaforiginal.post<RegisterPhoneOtpResponse, RegisterPhoneOtpRequest>('/auth/register/phone', {
        otp: values.otp,
        name: values.name,
        email: values.email,
        phone: registrationStore.phone,
        location_id: values.address?.value,
        gender: values.gender,
      });

      const { data } = response;

      // Simpan token ke cookie dan state
      await authStore.saveToken({
        access_token: data.access_token,
        expires_in: data.expires_in,
        token_type: data.token_type,
      });

      // Redirect ke halaman berikutnya
      registrationStore.reset();

      await getPreferenceOptions();

      // check apakah sudah ada preferences
      if (preferences.value.length <= 0) {
        navigateTo('/preferences', { replace: true });
      } else {
        navigateTo('/', { replace: true });
      }

      // Redirect setelah berhasil
      // await navigateTo(props.redirectTo)
    } catch (error: any) {
      handleValidationError(error, setErrors);

      // Handle error (bisa tambahkan toast/notification)
    } finally {
      isLoading.value = false;
      loadingStore.stop();
    }
  },
  (errors: any) => {
    // This callback runs when validation fails
    // Mark all custom fields as touched to show errors
    addressTouched.value = true;
    genderTouched.value = true;

    console.log('Validation errors:', errors);
  }
);

const sendOtp = async () => {
  loadingStore.start();

  try {
    const response = await apiSaforiginal.post<LoginPhoneResponse, LoginPhoneRequest>(urlAuthLoginPhone, {
      phone: registrationStore.phone,
    });
    const { message } = response;

    notify.success(message);
  } catch (error: any) {
    handleValidationError(error, setErrors);

    // Handle error (bisa tambahkan toast/notification)
  } finally {
    loadingStore.stop();
  }
};

onMounted(() => {
  appStore.fetchLocations();
});
</script>
