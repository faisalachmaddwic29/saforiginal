
export default defineNuxtRouteMiddleware(() => {
  // const session = useCookie('auth_token').value
  // const token = session ? JSON.parse(session)?.token?.access_token : null
  // if (!token) return navigateTo('/auth/login')
	return navigateTo('/auth/login')
})
