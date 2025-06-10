export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

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
