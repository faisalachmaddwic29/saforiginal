import { defineStore } from 'pinia'


export const useLoadingStore = defineStore("loading-form", {
	state: () => ({
		isLoading: false
	}),
	actions: {
		toggle() {
			this.isLoading = !this.isLoading;
		},
		stop() {
			this.isLoading = false;
		},
		start() {
			this.isLoading = true;
		},
	},
});
