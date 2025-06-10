import { defineNuxtRouteMiddleware } from "#app";

export default defineNuxtRouteMiddleware((to) => {
	const authStore = useAuthStore();

	if (!authStore.accessToken) {
		authStore.loadToken();
	}
});
