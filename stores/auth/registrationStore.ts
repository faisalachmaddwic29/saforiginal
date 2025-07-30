import { defineStore } from 'pinia';

export const useRegistrationStore = defineStore('registration', {
	state: () => ({
		phone: '', // Menyimpan nomor telepon sementara
		registrationData: {
			name: '',
			email: '',
			gender: '',
			location_id: '',
			password: '',
			password_confirmation: '',
		},
	}),
	actions: {
		setPhone(phone: string) {
			this.phone = phone;
		},
		setRegistrationData(data: Record<string, any>) {
			this.registrationData = { ...this.registrationData, ...data };
		},
		clearData() {
			this.phone = '';
			this.registrationData = {
				name: '',
				email: '',
				gender: '',
				location_id: '',
				password: '',
				password_confirmation: '',
			};
		},
		reset() {
			this.$reset(); // Menggunakan metode bawaan Pinia
		},
	},
});
