import type { LayoutData } from "~/types/component/index";

export default defineNuxtRouteMiddleware((to) => {
	const authStore = useAuthStore();

	if (!authStore.accessToken) {
		authStore.loadToken();
	}

	const layoutData = useState('layoutData', (): LayoutData => ({
		isPaddingTop: false,
		isPaddingBottom: false,
		noPadding: false,
		isShadow: false,
		title: null,
		noToolbar: false,
	}));

	// Cast meta properties to boolean
	if (to.meta) {
		layoutData.value = {
			isPaddingTop: Boolean((to.meta as Record<string, never>).isPaddingTop),
			isPaddingBottom: Boolean((to.meta as Record<string, never>).isPaddingBottom),
			noPadding: Boolean((to.meta as Record<string, never>).noPadding),
			isShadow: Boolean((to.meta as Record<string, never>).isShadow),
			title: to.meta.title as string,
			noToolbar: Boolean((to.meta as Record<string, never>).noToolbar),

		};
	}
});
