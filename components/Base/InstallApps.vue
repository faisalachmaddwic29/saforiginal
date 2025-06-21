<template>
  <ItemsListButton
    v-if="canInstall && !isInstalled"
    type="default"
    title="Instal SAF Original"
    subtitle="Lebih mudah akses SAF Original di smartphone kamu."
  >
    <template #icon>
      <NuxtImg src="/images/logos/logo-square.png" class="w-10 h-10 aspect-square rounded-lg" alt="SAF Original Logo" />
    </template>
    <template #actions>
      <Button
        variant="outline"
        class="text-xs h-full border !border-secondary bg-transparent py-1 px-3 transition hover:bg-secondary hover:text-white disabled:opacity-50"
        size="sm"
        :disabled="isInstalling"
        @click="handleInstallClick"
      >
        <span v-if="isInstalling" class="flex items-center gap-1">
          <svg class="animate-spin h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Installing...
        </span>
        <span v-else>Instal</span>
      </Button>
    </template>
  </ItemsListButton>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canInstall = ref(false)
const isInstalling = ref(false)
const isInstalled = ref(false)
let deferredPrompt = null

// Cek apakah aplikasi sudah terinstal
const checkIfInstalled = () => {
  // Standalone mode (Android dan iOS)
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true ||
    window.matchMedia('(display-mode: minimal-ui)').matches
  )
}

// Event sebelum instalasi (deferred prompt)
const handleBeforeInstallPrompt = (event) => {
  console.log('Event: beforeinstallprompt')
  event.preventDefault() // Mencegah banner otomatis muncul
  deferredPrompt = event // Simpan event untuk digunakan nanti
  canInstall.value = true // Tampilkan tombol instal
}

// Event ketika aplikasi selesai diinstal
const handleAppInstalled = () => {
  console.log('Event: appinstalled')
  isInstalled.value = true
  canInstall.value = false
  deferredPrompt = null // Hapus event terdefer
}

// Fungsi untuk memulai proses instalasi
const installPWA = async () => {
  if (!deferredPrompt) {
    console.warn('No install prompt available')
    return
  }

  isInstalling.value = true
  try {
    // Tampilkan prompt instalasi
    await deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    console.log('User choice:', outcome)

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt')
    } else {
      console.log('User dismissed the install prompt')
    }
  } catch (error) {
    console.error('Error during PWA installation:', error)
  } finally {
    deferredPrompt = null
    isInstalling.value = false
  }
}

// Penanganan instalasi khusus iOS
const handleIOSInstall = () => {
  console.log('iOS device detected - show instructions')
  // Tambahkan logika untuk menunjukkan modal dengan instruksi instalasi di iOS
}

// Fungsi utama untuk menangani klik tombol instal
const handleInstallClick = () => {
  if (navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('iPad')) {
    handleIOSInstall()
  } else {
    installPWA()
  }
}

// Lifecycle hooks
onMounted(() => {
  // Periksa apakah aplikasi sudah terinstal
  isInstalled.value = checkIfInstalled()

  // Jika sudah terinstal, jangan tampilkan tombol instal
  if (isInstalled.value) {
    canInstall.value = false
    return
  }

  // Tambahkan event listener
  window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
  window.addEventListener('appinstalled', handleAppInstalled)
})

onUnmounted(() => {
  // Hapus event listener
  window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
  window.removeEventListener('appinstalled', handleAppInstalled)
})
</script>
