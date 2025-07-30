export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();

  // Kalau belum ada user, ambil dari cookie
  if (!authStore.user) {
    const userCookie = useCookie('user');
    if (userCookie.value) {
      authStore.getUser();
    }
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
    authStore.logout({ redirectTo: '/login' });
    return;
  }
});
