<script setup lang="ts">
import type { TicketUser } from '~/types/data';

const props = defineProps({
  ticket: { type: Object, required: true },
  registrationData: { type: Object, required: true },
});

const emit = defineEmits(['update']);
const users = ref<TicketUser[]>([]);

// 🧩 Refs untuk semua form pemegang tiket
const formRefs = ref<ComponentPublicInstance<{ validate: () => Promise<{ valid: boolean }> }>[]>([]);

const onFormChange = (index: number, data: any) => {
  users.value[index] = data;
  emit('update', { ...props.ticket, users: users.value });
};

// ✅ Validasi semua form di satu grup tiket
async function validateAll() {
  let allValid = true;
  for (const form of formRefs.value) {
    if (form?.validate) {
      const result = await form.validate();
      if (!result.valid) allValid = false;
    }
  }
  return allValid;
}

// biar bisa dipanggil parent
defineExpose({ validateAll });
</script>

<template>
  <div class="p-4 space-y-4 bg-[#94A3B81F] border border-[#94A3B81F] rounded-md">
    <div class="flex justify-between items-center">
      <h3 class="font-semibold text-lg">{{ props.ticket.name }}</h3>
      <p>{{ props.ticket.qty }} Tiket</p>
    </div>

    <div class="space-y-4">
      <ContentTicketForm
        v-for="i in ticket.qty"
        :key="`ticket-form-${props.ticket.id}-${i}`"
        ref="formRefs"
        :index="i"
        :ticket-id="ticket.id"
        :registration-data="props.registrationData"
        @change="onFormChange(i - 1, $event)"
      />
    </div>
  </div>
</template>
