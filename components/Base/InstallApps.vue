<template>
	<div
		v-if="showInstallPrompt"
		class="w-full border border-[rgba(148,163,184,0.1)] bg-[rgba(148,163,184,0.05)] rounded-xl p-3 mt-5 mb-[85px]"
	>
		<div class="flex items-center gap-3 w-full justify-between">
			<div class="flex items-center w-full gap-3">
				<NuxtImg src="/images/logos/logo-square.png" class="w-10 h-10 aspect-square" />
				<div class="flex flex-col flex-1 gap-0 w-full">
					<h3 class="font-bold text-base line-clamp-1">Instal SAF Original</h3>
					<p class="text-sm text-[#1E293B] dark:text-white line-clamp-2">
						Lebih mudah akses SAF Original di smartphone kamu.
					</p>
				</div>
			</div>
			<Button
				variant="outline"
				@click="installApp"
				class="text-xs h-full border !border-secondary bg-transparent py-1 px-3 transition hover:bg-secondary hover:text-white"
				size="sm"
			>
				Instal
			</Button>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const showInstallPrompt = ref(false)
let deferredPrompt = null

// Cek apakah app sudah terinstall
const isAppInstalled = () => {
	return window.matchMedia('(display-mode: standalone)').matches ||
		   window.navigator.standalone === true
}

// Handle beforeinstallprompt event
const handleInstallPrompt = (e) => {
	// Prevent default browser install prompt
	e.preventDefault()

	// Store the event for later use
	deferredPrompt = e

	// Show our custom install button
	showInstallPrompt.value = true

	console.log('Install prompt ready')
}

// Handle app installed event
const handleAppInstalled = () => {
	showInstallPrompt.value = false
	deferredPrompt = null
	console.log('App installed successfully')
}

// Install app function
const installApp = async () => {
	if (!deferredPrompt) {
		// Fallback: Show manual install instructions
		showManualInstallInstructions()
		return
	}

	try {
		// Show the install prompt
		await deferredPrompt.prompt()

		// Wait for user response
		const choiceResult = await deferredPrompt.userChoice

		if (choiceResult.outcome === 'accepted') {
			console.log('User accepted install')
		} else {
			console.log('User declined install')
		}

		// Clear the prompt
		deferredPrompt = null
		showInstallPrompt.value = false

	} catch (error) {
		console.error('Install failed:', error)
		showManualInstallInstructions()
	}
}

// Show manual install instructions based on browser
const showManualInstallInstructions = () => {
	const userAgent = navigator.userAgent.toLowerCase()

	if (userAgent.includes('chrome') || userAgent.includes('edge')) {
		// Untuk Chrome, kasih visual cue yang lebih jelas
		const confirmed = confirm(
			`Aplikasi SAF Original siap diinstall! 🚀\n\n` +
			`Lihat ikon install (⊕) di sebelah kanan address bar di atas.\n\n` +
			`Klik "OK" untuk tutup dialog ini, lalu klik ikon install tersebut.`
		)

		if (confirmed) {
			// Bisa tambah visual highlight atau animation ke address bar area
			console.log('User ready to install via address bar')
		}
	}
	else if (userAgent.includes('firefox')) {
		alert(`Untuk menginstall aplikasi:\n\n1. Klik menu hamburger (☰)\n2. Pilih "Install this site as an app"`)
	}
	else if (userAgent.includes('safari')) {
		alert(`Untuk menginstall aplikasi:\n\n1. Klik tombol Share (⎋)\n2. Scroll ke bawah\n3. Pilih "Add to Home Screen"`)
	}
	else {
		alert(`Gunakan menu browser Anda untuk menambahkan aplikasi ke layar utama.`)
	}
}

onMounted(() => {
	// Don't show if app is already installed
	if (isAppInstalled()) {
		console.log('App already installed')
		return
	}

	// Listen for install prompt
	window.addEventListener('beforeinstallprompt', handleInstallPrompt)
	window.addEventListener('appinstalled', handleAppInstalled)

	// For debugging - show button after 2 seconds if no prompt
	setTimeout(() => {
		if (!deferredPrompt && !isAppInstalled()) {
			console.log('No install prompt detected, showing fallback')
			showInstallPrompt.value = true
		}
	}, 2000)
})

onBeforeUnmount(() => {
	window.removeEventListener('beforeinstallprompt', handleInstallPrompt)
	window.removeEventListener('appinstalled', handleAppInstalled)
})
</script>