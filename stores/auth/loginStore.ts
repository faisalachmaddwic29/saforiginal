import { defineStore } from 'pinia'

export const useLoginStore = defineStore('login', {
	state: () => ({
		phone: '', // Menyimpan nomor telepon sementara
	}),
	actions: {
		setPhone(phone: string) {
			this.phone = phone;
		},
		/**
		 * Menghapus data sementara, seperti nomor telepon, agar login form kembali ke kondisi awal.
		 */
		clearData() {
			this.phone = '';
		},
		reset() {
			this.$reset(); // Menggunakan metode bawaan Pinia
		},
	},
})