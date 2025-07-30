<template>
  <div>
    <!-- Tombol Install untuk Android/Chrome -->
    <ListItem v-if="!isIOS && canInstall && !isInstalled" type="default" title="Instal Salammu" subtitle="Lebih mudah akses Salammu di smartphone kamu.">
      <template #icon>
        <NuxtImg src="/images/logos/logo-square.png" class="w-10 h-10 aspect-square rounded-lg" alt="Salammu Logo" />
      </template>
      <template #actions>
        <Button variant="outline" class="text-xs h-full border !border-secondary bg-transparent py-1 px-3 transition hover:bg-secondary hover:text-white disabled:opacity-50" size="sm" :disabled="isInstalling" @click="handleInstallClick">
          <span v-if="isInstalling" class="flex items-center gap-1">
            <Icon name="lucide:loader-2" class="w-3 h-3 animate-spin" />
            Installing...
          </span>
          <span v-else class="flex items-center gap-1">
            <Icon name="lucide:download" class="w-3 h-3" />
            Instal
          </span>
        </Button>
      </template>
    </ListItem>

    <!-- Panduan untuk iOS -->
    <ListItem v-if="isIOS && !isInstalled" type="default" title="Instal Salammu" subtitle="Tap tombol Share di bawah, lalu pilih 'Add to Home Screen'.">
      <template #icon>
        <NuxtImg src="/images/logos/logo-square.png" class="w-10 h-10 aspect-square rounded-lg" alt="Salammu Logo" />
      </template>
      <template #actions>
        <Button variant="outline" class="text-xs h-full border !border-secondary bg-transparent py-1 px-3 transition hover:bg-secondary hover:text-white" size="sm" @click="showIOSInstructions">Panduan</Button>
      </template>
    </ListItem>

    <!-- Modal instruksi iOS -->
    <div v-if="showIOSModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" @click="showIOSModal = false">
      <div class="bg-white rounded-lg p-6 max-w-sm w-full" @click.stop>
        <h3 class="text-lg font-semibold mb-4">Cara Install di iOS</h3>
        <div class="space-y-3 text-sm">
          <div class="flex items-start gap-3">
            <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold flex-shrink-0">1</span>
            <p>
              Tap tombol
              <strong>Share</strong>
              (ikon dengan panah keluar) di Safari
            </p>
          </div>
          <div class="flex items-start gap-3">
            <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold flex-shrink-0">2</span>
            <p>
              Scroll ke bawah dan pilih
              <strong>"Add to Home Screen"</strong>
            </p>
          </div>
          <div class="flex items-start gap-3">
            <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold flex-shrink-0">3</span>
            <p>
              Tap
              <strong>"Add"</strong>
              untuk menambahkan ke home screen
            </p>
          </div>
        </div>
        <button class="w-full mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition" @click="showIOSModal = false">Mengerti</button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Reactive states
const canInstall = ref(false);
const isInstalling = ref(false);
const isInstalled = ref(false);
const isIOS = ref(false);
const showIOSModal = ref(false);
let deferredPrompt = null;
let mediaQueryListener = null;

// Cek apakah aplikasi sudah terinstal
const checkIfInstalled = () => {
  // Pastikan kode ini hanya berjalan di client side
  if (typeof window === 'undefined') {
    return false;
  }

  // Cek berbagai kondisi untuk mendeteksi PWA yang sudah terinstal
  const isStandalone = window.matchMedia && window.matchMedia('(display-mode: standalone)').matches;
  const isIOSStandalone = window.navigator && window.navigator.standalone === true;
  const isMinimalUI = window.matchMedia && window.matchMedia('(display-mode: minimal-ui)').matches;

  return isStandalone || isIOSStandalone || isMinimalUI;
};

// Deteksi platform
const detectPlatform = () => {
  // Pastikan kode ini hanya berjalan di client side
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return 'unknown';
  }

  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Deteksi iOS
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return 'ios';
  }

  // Deteksi Android
  if (/android/i.test(userAgent)) {
    return 'android';
  }

  return 'desktop';
};

// Event handler untuk beforeinstallprompt
const handleBeforeInstallPrompt = (event) => {
  console.log('📱 PWA Install prompt available');

  // Prevent the mini-infobar from appearing on mobile
  event.preventDefault();

  // Stash the event so it can be triggered later
  deferredPrompt = event;

  // Update UI to notify the user they can install the PWA
  canInstall.value = true;
};

// Event handler untuk appinstalled
const handleAppInstalled = (_event) => {
  console.log('✅ PWA was installed successfully');

  // Clear the deferredPrompt so it can be garbage collected
  deferredPrompt = null;

  // Update UI
  isInstalled.value = true;
  canInstall.value = false;
};

// Fungsi untuk install PWA
const installPWA = async () => {
  if (!deferredPrompt) {
    console.warn('⚠️ No install prompt available');
    return;
  }

  isInstalling.value = true;

  try {
    // Show the install prompt
    const _result = await deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const choiceResult = await deferredPrompt.userChoice;

    console.log('User choice:', choiceResult.outcome);

    if (choiceResult.outcome === 'accepted') {
      console.log('✅ User accepted the install prompt');
    } else {
      console.log('❌ User dismissed the install prompt');
    }
  } catch (error) {
    console.error('❌ Error during PWA installation:', error);
  } finally {
    // Clear the deferredPrompt
    deferredPrompt = null;
    canInstall.value = false;
    isInstalling.value = false;
  }
};

// Show iOS instructions
const showIOSInstructions = () => {
  showIOSModal.value = true;
};

// Main install handler
const handleInstallClick = () => {
  if (isIOS.value) {
    showIOSInstructions();
  } else {
    installPWA();
  }
};

// Check install criteria for different platforms
const checkInstallCriteria = async () => {
  // Pastikan kode ini hanya berjalan di client side
  if (typeof window === 'undefined') {
    return;
  }

  const platform = detectPlatform();

  if (platform === 'ios') {
    isIOS.value = true;
    // Untuk iOS, cek apakah sudah dalam mode standalone
    isInstalled.value = checkIfInstalled();
    // iOS tidak mendukung beforeinstallprompt, jadi kita selalu tampilkan panduan jika belum installed
    if (!isInstalled.value) {
      canInstall.value = true;
    }
  } else if (platform !== 'unknown') {
    isIOS.value = false;
    isInstalled.value = checkIfInstalled();

    // Untuk platform lain, tunggu beforeinstallprompt event
    // atau cek apakah sudah ada deferredPrompt
    if (deferredPrompt && !isInstalled.value) {
      canInstall.value = true;
    }

    // Jika sudah installed, hide tombol install
    if (isInstalled.value) {
      canInstall.value = false;
    }
  }
};

// Cleanup function
const cleanup = () => {
  if (typeof window === 'undefined') {
    return;
  }

  console.log('🔄 InstallApps component cleanup');

  // Remove event listeners
  window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  window.removeEventListener('appinstalled', handleAppInstalled);

  // Remove media query listener
  if (mediaQueryListener && window.matchMedia) {
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    mediaQuery.removeEventListener('change', mediaQueryListener);
    mediaQueryListener = null;
  }
};

// Lifecycle hooks - pastikan semua dipanggil langsung di level setup
onMounted(async () => {
  // Pastikan kita di client side
  if (typeof window === 'undefined') {
    return;
  }

  console.log('🚀 InstallApps component mounted');

  // Wait for next tick to ensure DOM is ready
  await nextTick();

  // Initial check
  await checkInstallCriteria();

  // Add event listeners
  window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  window.addEventListener('appinstalled', handleAppInstalled);

  // Listen for display mode changes
  if (window.matchMedia) {
    const mediaQuery = window.matchMedia('(display-mode: standalone)');

    mediaQueryListener = (e) => {
      if (e.matches) {
        console.log('📱 App is now in standalone mode');
        isInstalled.value = true;
        canInstall.value = false;
      }
    };

    mediaQuery.addEventListener('change', mediaQueryListener);
  }
});

// Register onUnmounted hook langsung di level setup, bukan di dalam conditional
onUnmounted(() => {
  cleanup();
});

// Expose untuk debugging (hanya development) - pindahkan ke onMounted
onMounted(() => {
  if (import.meta.client && import.meta.dev) {
    window.installDebug = {
      canInstall,
      isInstalled,
      isIOS,
      deferredPrompt: () => deferredPrompt,
      checkInstallCriteria,
      platform: detectPlatform(),
    };
  }
});
</script>
