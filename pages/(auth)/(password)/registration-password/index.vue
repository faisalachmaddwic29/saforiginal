<template>
  <form class="flex flex-col min-dvh-screen px-4 py-5 relative" @submit="onSubmit">
    <h2 class="text-2xl md:text-3xl font-manrope font-extrabold mb-2.5 text-[#1E293B] dark:text-[#94A3B8]">Daftar</h2>
    <p class="text-xs md:text-sm mb-5 text-[#1E293B] dark:text-[#94A3B8]">Silahkan isi data registrasi berikut untuk membuat akun</p>

    <!-- Form Login Password -->
    <div class="flex flex-col gap-5 mb-2.5">
      <FormInput id="name" v-model="name" type="text" name="name" placeholder="Nama lengkap" :error="errors.name" />

      <FormInput id="email" v-model="email" type="email" name="email" placeholder="Alamat email aktif" :error="errors.email" />

      <FormInput id="phone" v-model="phone" type="text" name="phone" placeholder="Nomor telepon aktif" :is-number="true" :error="errors.phone" />

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
            <div class="relative w-full items-center text-sm md:text-base text-[#1E293B] dark:text-[#94A3B8]">
              <ComboboxInput
                class="font-manrope ring-none placeholder-[#C5C5C5] dark:placeholder-[rgba(197,197,197,0.2)] transition duration-300 ease-in-out rounded-none outline-none px-4 py-3 appearance-none h-10"
                placeholder="Cari kota..."
              />
              <span class="absolute left-0 inset-y-0 flex items-center justify-center px-3">
                <!-- <Search class="size-4 text-muted-foreground" /> -->
              </span>
            </div>

            <ComboboxEmpty class="p-4 text-sm md:text-base text-[#1E293B] dark:text-[#94A3B8] font-manrope"> Cari nama kota tempat tinggal anda. </ComboboxEmpty>

            <ComboboxGroup class="h-60 overflow-y-scroll">
              <ComboboxItem
                v-for="location in appStore.locations"
                :key="location.id"
                :value="location"
                class="font-manrope text-[#1E293B] dark:text-[#94A3B8] flex items-center px-4 py-2 cursor-pointer hover:bg-primary w-full"
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

      <FormInput
        id="password"
        v-model="password"
        name="password"
        :type="showPassword ? 'text' : 'password'"
        placeholder="Password (min 8 karakter)"
        :is-icon="true"
        icon-position="right"
        :error="errors.password"
      >
        <template #icon>
          <Icon v-if="showPassword" name="heroicons:eye" class="text-xl text-subtle cursor-pointer" @click="togglePassword" />
          <Icon v-else name="heroicons:eye-slash" class="text-xl text-subtle cursor-pointer" @click="togglePassword" />
        </template>
      </FormInput>

      <FormInput
        id="password_confirmation"
        v-model="password_confirmation"
        :type="confirmshowPassword ? 'text' : 'password'"
        name="password_confirmation"
        placeholder="Konfirm Password"
        :is-icon="true"
        icon-position="right"
        :error="errors.password_confirmation"
      >
        <template #icon>
          <Icon v-if="confirmshowPassword" name="heroicons:eye" class="text-xl text-subtle cursor-pointer" @click="toggleConfirmPassword" />
          <Icon v-else name="heroicons:eye-slash" class="text-xl text-subtle cursor-pointer" @click="toggleConfirmPassword" />
        </template>
      </FormInput>
    </div>
    <p class="text-xs md:text-sm text-[#1E293B] dark:text-[#94A3B8]">
      Sudah punya akun?
      <NuxtLink :to="{ path: '/login-password', query: $route.query }" class="text-primary font-bold pl-0.5">Masuk disini</NuxtLink>
    </p>

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
import type { Location } from '~/types/api';
import { urlAuthRegister } from '~/constants';

const title = 'Registrasi Password';
useSeoMeta({
  title: title,
});

definePageMeta({
  layout: 'detail',
  middleware: 'guest',
  isPaddingTop: true,
  isPaddingBottom: true,
  title: title,
});

const route = useRoute();
const appStore = useAppStore();
const isLoading = ref(false);
const showPassword = ref(false);
const confirmshowPassword = ref(false);

// Zod Schema Validation
const registrationSchema = z
  .object({
    name: z.string().min(1, 'Nama lengkap harus diisi').max(50, 'Nama maksimal 50 karakter'),
    // .regex(/^[a-zA-Z\s]+$/, 'Nama hanya boleh berisi huruf dan spasi'),

    email: z.string().min(1, 'Email harus diisi').email('Format email tidak valid'),

    phone: z
      .string()
      .min(1, 'Nomor telepon harus diisi')
      .regex(/^(\+62|62|0)[0-9]{9,13}$/, 'Format nomor telepon tidak valid'),

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

    password: z.string().min(1, 'Password harus diisi').min(8, 'Password minimal 8 karakter'),
    // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password harus mengandung huruf besar, huruf kecil, dan angka'),

    password_confirmation: z.string().min(1, 'Konfirmasi password harus diisi'),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Konfirmasi password tidak cocok',
    path: ['password_confirmation'],
  });

// Setup vee-validate
const { defineField, handleSubmit, errors, setFieldValue, setErrors } = useForm({
  validationSchema: toTypedSchema(registrationSchema),
  initialValues: {
    name: '',
    email: '',
    phone: '',
    address: null,
    gender: '',
    password: '',
    password_confirmation: '',
  },
  validateOnMount: false,
});

// Track touched state manually for custom fields
const addressTouched = ref(false);
const genderTouched = ref(false);

// Define fields
const [name] = defineField('name');
const [email] = defineField('email');
const [phone] = defineField('phone');
const [password] = defineField('password');
const [password_confirmation] = defineField('password_confirmation');

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

// Toggle password visibility
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

// Toggle confirm password visibility
const toggleConfirmPassword = () => {
  confirmshowPassword.value = !confirmshowPassword.value;
};

const loadingStore = useLoadingStore();
const registrationStore = useRegistrationStore();

// Reset state saat halaman dimuat
onBeforeMount(() => {
  registrationStore.reset();
});

// Handle form submission
const onSubmit = handleSubmit(
  async (values) => {
    loadingStore.start();
    isLoading.value = true;

    try {
      const response = await apiSaforiginal.post(urlAuthRegister, {
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: values.password,
        password_confirmation: values.password_confirmation,
        location_id: values.address?.value,
        gender: values.gender,
      });

      const { message } = response;
      notify.success(message);

      // Redirect setelah berhasil
      registrationStore.setPhone(values.phone);
      await navigateTo({
        path: '/otp-password',
        query: route.query, // ⬅️ bawa redirect dari login
      });
    } catch (error: any) {
      handleValidationError(error, setErrors);

      // Handle error (bisa tambahkan toast/notification)
    } finally {
      isLoading.value = false;
      loadingStore.stop();
    }
  },
  (errors) => {
    // This callback runs when validation fails
    // Mark all custom fields as touched to show errors
    addressTouched.value = true;
    genderTouched.value = true;

    console.log('Validation errors:', errors);
  }
);

onMounted(() => {
  appStore.fetchLocations();
});
</script>
