import { defineStore } from "pinia";
import { useCookie, navigateTo } from "#app";
// services/api/api_response.ts
import type { TypeUser } from '~/types/auth/user';

export const useAuthStore = defineStore("auth", {
	state: () => ({
		accessToken: "" as string,
		expiresIn: 0 as number,
		tokenType: "" as string,
		isAuthenticated: false as boolean,
		user: null as TypeUser | null, // Bisa disesuaikan dengan interface User
	}),

	getters: {
		// Getter untuk cek apakah user sudah login
		isLoggedIn: (state) => Boolean(state.accessToken && state.isAuthenticated),

		// Getter untuk mendapatkan full authorization header
		// authHeader: (state) => state.accessToken ? `${state.tokenType} ${state.accessToken}` : "",
		authHeader: (state) => state.accessToken ? `Bearer ${state.accessToken}` : "",

		// Getter untuk cek apakah token expired (jika diperlukan)
		isTokenExpired: (state) => {
			if (!state.expiresIn) return false;
			return Date.now() > state.expiresIn; // Langsung compare aja
		}

	},

	actions: {
		// Simpan token ke cookie dan state
		async saveToken(data: { access_token: string; expires_in: number; token_type: string; }) {
			// Hitung waktu kedaluwarsa absolut
			const expirationTimestamp = Date.now() + data.expires_in * 1000;

			const appAuth = useCookie("appAuth", {
				maxAge: data.expires_in, // Tetap gunakan nilai detik untuk cookie
				secure: false,
				sameSite: "strict",
			});

			appAuth.value = JSON.stringify({
				access_token: data.access_token,
				expires_in: expirationTimestamp,
				token_type: data.token_type,
			});

			this.accessToken = data.access_token;
			this.expiresIn = expirationTimestamp; // Simpan sebagai timestamp
			this.tokenType = data.token_type;
			this.isAuthenticated = true;

			await this.getProfile();
		},

		// Ambil token dari cookie saat aplikasi dimuat
		loadToken() {
			const cookie = useCookie("appAuth");
			if (cookie.value) {
				const { access_token, expires_in, token_type } = cookie.value as any;
				this.accessToken = access_token;
				this.expiresIn = expires_in;
				this.tokenType = token_type;
				this.isAuthenticated = true;
				// TODO: Validasi token dengan server jika diperlukan
			}
		},

		// Logout - hapus semua data auth
		async logout(options: { redirectTo?: string; callApi?: boolean } = {}) {
			const loadingStore = useLoadingStore();
			try {
				loadingStore.start();
				// Jika ada API logout endpoint
				if (options.callApi && this.accessToken) {

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

		async getProfile() {
			const loadingStore = useLoadingStore();
			try {
				loadingStore.start();

				const response = await apiService.get('/auth/profile', {});

				const { data } = response;
				// this.user = data?.user ?? null;
				this.setUser(data?.user ?? null);
			} catch (error) {
				console.error('Get Profile API error:', error);
				// Tetap lanjutkan logout meskipun API gagal
			} finally {
				loadingStore.stop();
			}
		},

		// Simpan data pengguna ke state dan cookie
		setUser(user: any) {
			this.user = user;

			const userCookie = useCookie("user", {
				maxAge: this.expiresIn,
				secure: true,
				sameSite: "strict",
			});

			userCookie.value = user; // Simpan object langsung, Nuxt otomatis JSON.stringify
		},

		getUser() {
			const userCookie = useCookie("user");
			if (userCookie.value) {
				this.user = userCookie.value as unknown as TypeUser; // Sudah object, jangan parse
			} else {
				this.user = null;
			}
			return this.user;
		},

		// Helper method untuk clear semua auth data
		clearAuthData() {
			// Hapus cookie
			const cookie = useCookie("appAuth");
			const userCookie = useCookie("user");
			cookie.value = null;
			userCookie.value = null;

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

		// Method untuk auto-logout saat token expired
		checkTokenExpiration() {
			if (this.isTokenExpired) {
				this.logout({ redirectTo: '/login' });
			}
		}
	},
});
