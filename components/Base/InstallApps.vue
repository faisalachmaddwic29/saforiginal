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
        @click="installPWA"
      >
        <span v-if="isInstalling" class="flex items-center gap-1">
          <svg class="animate-spin h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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

// Check if app is already installed
const checkIfInstalled = () => {
  // Check for standalone mode (PWA installed)
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return true
  }

  // Check for iOS Safari standalone mode
  if (window.navigator.standalone === true) {
    return true
  }

  // Check for Android Chrome PWA
  if (window.matchMedia('(display-mode: minimal-ui)').matches) {
    return true
  }

  return false
}

const handleBeforeInstallPrompt = (e) => {
  console.log('beforeinstallprompt event fired')
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault()
  // Stash the event so it can be triggered later
  deferredPrompt = e
  // Show install button
  canInstall.value = true
}

const handleAppInstalled = (e) => {
  console.log('App was installed successfully', e)
  // Hide install button after successful installation
  canInstall.value = false
  isInstalled.value = true
  deferredPrompt = null

  // Optional: Show success message
  // You can use a toast notification here
  console.log('PWA was installed')
}

const installPWA = async () => {
  if (!deferredPrompt) {
    console.warn('No install prompt available')
    return
  }

  isInstalling.value = true

  try {
    // Show the install prompt
    const promptResult = deferredPrompt.prompt()
    console.log('Install prompt shown')

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice
    console.log('User choice:', outcome)

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt')
      // The appinstalled event will be fired, so we handle success there
    } else {
      console.log('User dismissed the install prompt')
      // User dismissed, so we can show the button again later
      canInstall.value = true
    }

  } catch (error) {
    console.error('Error during PWA installation:', error)
    // Re-enable the button if there was an error
    canInstall.value = true
  } finally {
    // Clear the deferred prompt and reset installing state
    deferredPrompt = null
    isInstalling.value = false
  }
}

// Handle iOS Safari special case
const handleIOSInstall = () => {
  if (navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('iPad')) {
    // Show iOS-specific install instructions
    // You could show a modal with instructions here
    console.log('iOS device detected - show install instructions')
  }
}

onMounted(() => {
  // Check if already installed
  isInstalled.value = checkIfInstalled()

  if (isInstalled.value) {
    console.log('App is already installed')
    canInstall.value = false
    return
  }

  // Listen for beforeinstallprompt event
  window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

  // Listen for appinstalled event
  window.addEventListener('appinstalled', handleAppInstalled)

  // For iOS devices, we might want to show install instructions
  // since iOS doesn't support the beforeinstallprompt event
  if (navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('iPad')) {
    if (!isInstalled.value && !window.navigator.standalone) {
      // Show install button for iOS users
      canInstall.value = true
    }
  }

  // Debug: Log the current display mode
  console.log('Display mode:', window.matchMedia('(display-mode: standalone)').matches ? 'standalone' : 'browser')
})

onUnmounted(() => {
  window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
  window.removeEventListener('appinstalled', handleAppInstalled)
})

// Handle iOS install differently
const handleInstallClick = () => {
  if (navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('iPad')) {
    handleIOSInstall()
  } else {
    installPWA()
  }
}
</script>