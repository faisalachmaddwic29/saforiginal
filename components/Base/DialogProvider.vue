<template>
  <div>
    <slot />
    <Teleport to="body">
      <DialogCustom
        v-for="dialog in dialogs"
        :key="dialog.id"
        v-model:open="dialog.isOpen"
        :type="dialog.type"
        :title="dialog.title"
        :message="dialog.message"
        :button-confirm-title="dialog.buttonConfirmLabel"
        :button-confirm-class="dialog.buttonConfirmClass"
        :button-cancel-title="dialog.buttonCancelLabel"
        :button-cancel-class="dialog.buttonCancelClass"
        @confirm="dialog.onConfirm?.()"
        @cancel="dialog.onCancel?.()"
      />
    </Teleport>
  </div>
</template>

<script setup lang="ts">
const { dialogs } = useDialog()
</script>
