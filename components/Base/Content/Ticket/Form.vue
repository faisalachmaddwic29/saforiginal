<template>
  <div class="p-4 border bg-background rounded-md flex flex-col gap-4">
    <div class="flex items-center gap-2 mb-2">
      <div class="size-8 rounded-full bg-primary text-white text-sm flex items-center justify-center font-bold">
        {{ props.index }}
      </div>
      <div class="flex-1 flex justify-between">
        <h4 class="font-semibold">Pemegang Tiket</h4>
        <Icon name="heroicons-outline:ticket" class="text-2xl text-primary" />
      </div>
    </div>

    <div class="flex flex-col gap-3">
      <div>
        <FormInput :id="`name-${ticketId}-${index}`" v-model="name" name="name" type="text" label-text="Nama" class="w-full" placeholder="Nama Lengkap" :error="errors.name" />
      </div>

      <div>
        <FormInput :id="`email-${ticketId}-${index}`" v-model="email" name="email" type="email" label-text="Email" class="w-full" placeholder="Alamat Email" :error="errors.email" />
      </div>

      <div>
        <FormInput :id="`phone-${ticketId}-${index}`" v-model="phone" type="text" name="phone" label-text="No Telepon" placeholder="Nomor Telepon Aktif" :is-number="true" :error="errors.phone" />
      </div>

      <div class="flex items-center gap-2 mt-2 ml-auto">
        <Checkbox :id="`same-${ticketId}-${index}`" v-model="sameAsRegistration" />
        <label :for="`same-${ticketId}-${index}`" class="text-sm">Sama Dengan Data Registrasi</label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { z } from 'zod';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';

const props = defineProps({
  index: Number,
  ticketId: Number,
  registrationData: {
    type: Object,
    required: true,
  },
});

const sameAsRegistration = ref(false);

const emit = defineEmits(['change']);

const schema = z.object({
  name: z.string().min(1, 'Nama wajib diisi'),
  email: z.string().email('Email tidak valid'),
  phone: z.string().min(8, 'Nomor telepon tidak valid'),
});

const { defineField, errors, values, validate, setValues } = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: { name: '', email: '', phone: '' },
});

const [name] = defineField('name');
const [email] = defineField('email');
const [phone] = defineField('phone');

// Auto isi kalau checkbox diaktifkan
watch(sameAsRegistration, (val) => {
  if (val) {
    setValues({
      name: props.registrationData.name,
      email: props.registrationData.email,
      phone: props.registrationData.phone,
    });
  }
});

watch(
  values,
  async (val) => {
    console.log(val);
    const { valid } = await validate();
    if (valid) emit('change', val);
  },
  { deep: true }
);

defineExpose({ validate, values });
</script>
