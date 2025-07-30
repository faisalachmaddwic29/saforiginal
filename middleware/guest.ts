import { defineNuxtRouteMiddleware } from "#app";

export default defineNuxtRouteMiddleware(() => {
	const authStore = useAuthStore();
	// Jika sudah login, redirect ke dashboard
	if (authStore.isLoggedIn) {
		return navigateTo('/');
	}
});
