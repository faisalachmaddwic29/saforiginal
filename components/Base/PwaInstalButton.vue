<template>
  <div v-if="canInstall" class="pwa-install-container">
    <button
      @click="installPWA"
      class="install-button"
      :disabled="isInstalling"
    >
      <Icon name="mdi:download" class="w-5 h-5 mr-2" />
      {{ isInstalling ? 'Installing...' : 'Install App to Desktop' }}
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canInstall = ref(false)
const isInstalling = ref(false)
let deferredPrompt = null

const handleBeforeInstallPrompt = (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault()
  // Stash the event so it can be triggered later
  deferredPrompt = e
  // Show install button
  canInstall.value = true
}

const handleAppInstalled = () => {
  // Hide install button after successful installation
  canInstall.value = false
  deferredPrompt = null
  console.log('PWA was installed')
}

const installPWA = async () => {
  if (!deferredPrompt) return

  isInstalling.value = true

  try {
    // Show the install prompt
    deferredPrompt.prompt()

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt')
    } else {
      console.log('User dismissed the install prompt')
    }

    // Clear the deferredPrompt
    deferredPrompt = null
    canInstall.value = false
  } catch (error) {
    console.error('Error during PWA installation:', error)
  } finally {
    isInstalling.value = false
  }
}

onMounted(() => {
  // Check if already installed
  if (window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true) {
    canInstall.value = false
    return
  }

  // Listen for beforeinstallprompt event
  window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

  // Listen for appinstalled event
  window.addEventListener('appinstalled', handleAppInstalled)
})

onUnmounted(() => {
  window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
  window.removeEventListener('appinstalled', handleAppInstalled)
})
</script>