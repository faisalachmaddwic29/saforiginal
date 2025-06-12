import { defineStore } from 'pinia'

export const useForgotPasswordStore = defineStore('forgot-password', {
	state: () => ({
		identifier: '', // Menyimpan nomor telepon sementara
		otp: '',
	}),
	actions: {
		setIdentifier(identifier: string) {
			this.identifier = identifier;
		},
		setOtp(otp: string) {
			this.otp = otp;
		},
		/**
		 * Menghapus data sementara, seperti nomor telepon, agar forgot-password form kembali ke kondisi awal.
		 */
		clearData() {
			this.identifier = '';
			this.otp = '';
		},
		reset() {
			this.$reset(); // Menggunakan metode bawaan Pinia
		},
	},
})