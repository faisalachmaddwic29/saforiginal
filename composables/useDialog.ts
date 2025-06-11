// composables/useDialog.ts
import { ref, markRaw } from 'vue'
import type { Component } from 'vue'

export interface DialogOptions {
  title?: string
  message?: string
  buttonConfirmLabel?: string
  buttonConfirmClass?: string
  buttonCancelLabel?: string
  buttonCancelClass?: string
  onCancel?: () => void
  onConfirm?: () => void
}

export interface DialogState extends DialogOptions {
  type: 'success' | 'info' | 'warning' | 'error' | 'default'
  id: string
  isOpen: boolean
}

const dialogs = ref<DialogState[]>([])

export const useDialog = () => {
  const openDialog = (type: DialogState['type'], options: DialogOptions = {}) => {
    const id = `dialog-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    const dialog: DialogState = {
      id,
      type,
      isOpen: true,
      ...options
    }

    dialogs.value.push(dialog)

    return new Promise<boolean>((resolve) => {
      const originalOnConfirm = options.onConfirm
      const originalOnCancel = options.onCancel

      dialog.onConfirm = () => {
        closeDialog(id)
        originalOnConfirm?.()
        resolve(true)
      }

      dialog.onCancel = () => {
        closeDialog(id)
        originalOnCancel?.()
        resolve(false)
      }
    })
  }

  const closeDialog = (id: string) => {
    const index = dialogs.value.findIndex(d => d.id === id)
    if (index > -1) {
      dialogs.value.splice(index, 1)
    }
  }

  const success = (options: DialogOptions) => openDialog('success', options)
  const info = (options: DialogOptions) => openDialog('info', options)
  const warning = (options: DialogOptions) => openDialog('warning', options)
  const error = (options: DialogOptions) => openDialog('error', options)
  const show = (options: DialogOptions) => openDialog('default', options)

  return {
    dialogs: readonly(dialogs),
    success,
    info,
    warning,
    error,
    show,
    closeDialog
  }
}
