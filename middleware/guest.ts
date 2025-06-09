import { defineNuxtRouteMiddleware } from "#app";

export default defineNuxtRouteMiddleware((to) => {
	const authStore = useAuthStore();

	// Load token dari cookie jika belum ada di state
	if (!authStore.accessToken) {
		authStore.loadToken();
	}

	// Jika sudah login, redirect ke dashboard
	if (authStore.isLoggedIn) {
		return navigateTo('/');
	}
});