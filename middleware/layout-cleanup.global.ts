export default defineNuxtRouteMiddleware((to, from) => {
	// Jika berpindah dari layout detail ke layout lain
	if (from?.meta?.layout === 'detail') {
		// console.log("rtes");
		const layoutData = useState('layoutData')
		if (layoutData.value) {
			layoutData.value = null
		}
	}
})