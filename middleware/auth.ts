export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  // Load token dari cookie jika belum ada di state
  if (!authStore.accessToken) {
    authStore.loadToken();
  }

  // Cek apakah user sudah login
  if (!authStore.isLoggedIn) {
    // Simpan URL tujuan untuk redirect setelah login
    const redirectTo = to.fullPath !== '/login' ? to.fullPath : undefined;

    return navigateTo({
      path: '/login',
      query: redirectTo ? { redirect: redirectTo } : {}
    });
  }

  // Cek apakah token expired
  if (authStore.isTokenExpired) {
		console.log('jalan')
    authStore.logout({ redirectTo: '/login' });
    return;
  }
});