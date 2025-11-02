export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();

  // Ambil user dari cookie kalau belum ada
  if (!authStore.user) {
    const userCookie = useCookie('user');
    if (userCookie.value) {
      authStore.getUser();
    }
  }

  // Cek login
  if (!authStore.isLoggedIn) {
    const redirectTo =
      to.fullPath !== '/login' ? encodeURIComponent(to.fullPath) : undefined;

    return navigateTo({
      path: '/login',
      query: redirectTo ? { redirect: redirectTo } : {},
    });
  }

  // Token expired
  if (authStore.isTokenExpired) {
    authStore.logout({ redirectTo: '/login' });
    return;
  }
});
