<template>
	<Drawer v-model:open="isOpen" @update:open="onOpenChange">
		<DrawerTrigger>
			<slot name="trigger"></slot>
		</DrawerTrigger>
		<DrawerContent
			class="bg-transparent p-4 mb-3.5"
			:showIndicator="false"
		>
			<DrawerTitle class="sr-only">{{ props?.title ?? '-' }}</DrawerTitle>
			<DrawerDescription class="sr-only">{{ props?.description ?? '-' }}</DrawerDescription>

			<div class="flex flex-col rounded-t-2xl gap-4 font-bold">
				<!-- Content slot -->
				<slot></slot>

				<button @click="handleCancel" class="bg-background w-full flex items-center justify-center py-4 rounded-lg">Cancel</button>
			</div>
		</DrawerContent>
	</Drawer>

</template>

<script setup lang="ts">
const props = defineProps<{
  open?: boolean;
  title?: string;
  description?: string;
}>();

const emit = defineEmits(["update:open", "cancel"]); // Tambahkan 'cancel' di sini

const isOpen = computed({
  get: () => props.open ?? false,
  set: (value) => emit("update:open", value),
});

const onOpenChange = (open: boolean) => {
  if (!open && isOpen.value) {
    // Dialog ditutup tanpa melalui button, anggap sebagai cancel
    handleCancel();
  }
};

const handleCancel = () => {
  emit("cancel"); // Emit event 'cancel'
  isOpen.value = false; // Tutup drawer
};
</script>
