import { h } from 'vue'
import { toast } from 'vue-sonner'
import ToastCustom from '@/components/Base/ToastCustom.vue'

function show(type: 'success' | 'info' | 'warning' | 'error', message: string, duration = 4000) {
  const id= toast.custom((t :any) => {
    return h(ToastCustom, {
      type,
      message,
      duration,
      onClose: () => toast.dismiss(id),
    })
  })
	return id
}

export const notify = {
  success: (msg: string, duration?: number) => show('success', msg, duration),
  info: (msg: string, duration?: number) => show('info', msg, duration),
  warning: (msg: string, duration?: number) => show('warning', msg, duration),
  error: (msg: string, duration?: number) => show('error', msg, duration),
}
