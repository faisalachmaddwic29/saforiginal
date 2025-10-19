<script setup lang="ts">
import type { TicketWithUsers } from '~/types/data';

// props
const props = defineProps({
  tickets: { type: Array, required: true },
  userLogin: { type: Object, required: true },
});

const emit = defineEmits(['update']);
const finalResult = ref<TicketWithUsers[]>([]);

// 🧩 Refs ke semua group
const groupRefs = ref<ComponentPublicInstance<{ validateAll: () => Promise<boolean> }>[]>([]);

const onTicketUpdate = (updatedTicket: TicketWithUsers) => {
  const idx = finalResult.value.findIndex((t) => t.id === updatedTicket.id);
  if (idx > -1) finalResult.value[idx] = updatedTicket;
  else finalResult.value.push(updatedTicket);

  emit('update', finalResult.value);
};

// ✅ Fungsi global untuk validasi semua grup tiket
async function validateAll() {
  let allValid = true;

  for (const group of groupRefs.value) {
    if (group?.validateAll) {
      const valid = await group.validateAll();
      if (!valid) allValid = false;
    }
  }

  return allValid;
}

// expose biar bisa dipanggil dari Checkout.vue
defineExpose({ validateAll });
</script>

<template>
  <div class="space-y-6">
    <ContentTicketGroup v-for="ticket in props.tickets" :key="ticket.id" ref="groupRefs" :ticket="ticket" :registration-data="props.userLogin" @update="onTicketUpdate" />
  </div>

  <pre class="mt-6 bg-background p-4 rounded text-xs">
    {{ JSON.stringify(finalResult, null, 2) }}
  </pre>
</template>
