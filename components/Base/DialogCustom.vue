<!-- DialogCustom.vue (Simple Fix) -->
<template>
  <Dialog v-model:open="isOpen" @update:open="onOpenChange">
    <DialogContent class="sm:max-w-[425px] p-5">
      <DialogHeader>
        <DialogTitle class="mb-5 mt-5" v-if="props.type !== 'default'">
          <!-- Icon -->
          <div
            class="inline-flex items-center justify-center shrink-0 w-15 h-15 rounded-full"
            :class="typeClass[props.type].iconColor"
          >
            <Icon :icon="typeClass[props.type].icon" width="40" height="40" />
          </div>
        </DialogTitle>
        <DialogDescription>
          <p v-if="props.title" class="font-inter text-lg md:text-2xl font-bold mb-2 text-[#171717] dark:text-white">
            {{ props.title }}
          </p>
          <p v-if="props.message" class="font-inter text-sm md:text-base text-[#737373]">
            {{ props.message }}
          </p>
        </DialogDescription>
      </DialogHeader>
      <DialogFooter class="mt-4">
        <div class="flex items-center justify-between gap-4 max-w-full overflow-hidden">
          <DialogClose as-child>
            <Button
              variant="outline"
              class="flex-1 w-full"
              :class="props.buttonCancelClass"
              @click="handleCancel"
            >
              {{ props.buttonCancelTitle ?? 'Batal' }}
            </Button>
          </DialogClose>
          <DialogClose as-child>
            <Button
              class="flex-1 w-full"
              :class="props.buttonConfirmClass"
              @click="handleConfirm"
            >
              {{ props.buttonConfirmTitle ?? 'Ya' }}
            </Button>
          </DialogClose>
        </div>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

const props = defineProps<{
  type: 'success' | 'info' | 'warning' | 'error' | 'default'
  open?: boolean
  title?: string
  message?: string
  buttonConfirmTitle?: string
  buttonConfirmClass?: string
  buttonCancelTitle?: string
  buttonCancelClass?: string
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
  confirm: []
  cancel: []
}>()

const isOpen = computed({
  get: () => props.open ?? false,
  set: (value) => emit('update:open', value)
})

// Handle ketika dialog ditutup dari manapun (termasuk X button, ESC, overlay click)
const onOpenChange = (open: boolean) => {
  if (!open && isOpen.value) {
    // Dialog ditutup tanpa melalui button, anggap sebagai cancel
    handleCancel()
  }
}

const handleConfirm = () => {
  emit('confirm')
  isOpen.value = false
}

const handleCancel = () => {
  emit('cancel')
  isOpen.value = false
}

const typeClass = {
  success: {
    icon: 'material-symbols-light:check-circle-outline-rounded',
    iconColor: 'text-success bg-success-foreground',
    barColor: 'bg-success',
  },
  info: {
    icon: 'mdi-light:information',
    iconColor: 'text-info bg-info-foreground',
    barColor: 'bg-info',
  },
  warning: {
    icon: 'circum:warning',
    iconColor: 'text-warning bg-warning-foreground',
    barColor: 'bg-warning',
  },
  error: {
    icon: 'iconamoon:sign-times-circle-thin',
    iconColor: 'text-danger bg-danger-foreground',
    barColor: 'bg-danger',
  },
}
</script>
