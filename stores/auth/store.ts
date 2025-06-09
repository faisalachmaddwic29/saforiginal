import { defineStore } from "pinia";
import { useCookie, navigateTo } from "#app";

export const useAuthStore = defineStore("auth", {
	state: () => ({
		accessToken: "" as string,
		expiresIn: 0 as number,
		tokenType: "" as string,
		isAuthenticated: false as boolean,
		user: null as any, // Bisa disesuaikan dengan interface User
	}),

	getters: {
		// Getter untuk cek apakah user sudah login
		isLoggedIn: (state) => Boolean(state.accessToken && state.isAuthenticated),

		// Getter untuk mendapatkan full authorization header
		authHeader: (state) => state.accessToken ? `${state.tokenType} ${state.accessToken}` : "",

		// Getter untuk cek apakah token expired (jika diperlukan)
		isTokenExpired: (state) => {
			console.log('state.expiresIn', state.expiresIn);
			console.log(Date.now() > state.expiresIn);
			if (!state.expiresIn) return false;
			return Date.now() > state.expiresIn; // Langsung compare aja
		}

	},

	actions: {
		// Simpan token ke cookie dan state
		saveToken(data: { access_token: string; expires_in: number; token_type: string; }) {
			// Hitung waktu kedaluwarsa absolut
			const expirationTimestamp = Date.now() + data.expires_in * 1000;

			const cookie = useCookie("access_token", {
				maxAge: data.expires_in, // Tetap gunakan nilai detik untuk cookie
				secure: false,
				sameSite: "strict",
			});

			cookie.value = data.access_token;
			this.accessToken = data.access_token;
			this.expiresIn = expirationTimestamp; // Simpan sebagai timestamp
			this.tokenType = data.token_type;
			this.isAuthenticated = true;
		},

		// Ambil token dari cookie saat aplikasi dimuat
		loadToken() {
			const cookie = useCookie("access_token");
			if (cookie.value) {
				this.accessToken = cookie.value;
				this.isAuthenticated = true;
				// TODO: Validasi token dengan server jika diperlukan
			}
		},

		// Logout - hapus semua data auth
		async logout(options: { redirectTo?: string; callApi?: boolean } = {}) {
			console.log(options.callApi && this.accessToken);
			console.log(options.callApi, this.accessToken);
			const loadingStore = useLoadingStore();
			try {
				loadingStore.start();
				// Jika ada API logout endpoint
				if (options.callApi && this.accessToken) {
					console.log('jalana');

					// TODO: Panggil API logout
					const response = await apiService.post('/auth/logout', {});
					notify.success(response.message ?? '-');
				}
			} catch (error) {
				console.error('Logout API error:', error);
				// Tetap lanjutkan logout meskipun API gagal
			} finally {
				loadingStore.stop();
				// Clear semua data auth
				this.clearAuthData();

				// Redirect ke halaman yang ditentukan
				const redirectPath = options.redirectTo || '/login';
				await navigateTo(redirectPath);
			}
		},

		// Helper method untuk clear semua auth data
		clearAuthData() {
			// Hapus cookie
			const cookie = useCookie("access_token");
			cookie.value = null;

			// Reset state
			this.accessToken = "";
			this.expiresIn = 0;
			this.tokenType = "";
			this.isAuthenticated = false;
			this.user = null;
		},

		// Method untuk refresh token jika diperlukan
		async refreshToken() {
			try {
				// TODO: Implement refresh token logic
				// const response = await $fetch('/api/auth/refresh', {
				//   method: 'POST',
				//   body: { refresh_token: this.refreshToken }
				// });
				// this.saveToken(response);
				return true;
			} catch (error) {
				console.error('Token refresh failed:', error);
				await this.logout({ redirectTo: '/login' });
				return false;
			}
		},

		// Method untuk set user data
		setUser(userData: any) {
			this.user = userData;
		},

		// Method untuk auto-logout saat token expired
		checkTokenExpiration() {
			if (this.isTokenExpired) {
				this.logout({ redirectTo: '/login' });
			}
		}
	},
});