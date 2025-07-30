// utils/errorHandler.ts

export function handleValidationError(error: any, setErrors: (errors: Record<string, string>) => void): void {
	const route = useRoute();
	if (error.code === 403 || error.code === 400) {
		if (Array.isArray(error?.message) && error.message.length === 0) {
			notify.error(error.errors[0].title);
		} else {
			notify.error(error.message);
		}
	}

	if (error.code === 401) {
		notify.error(error.message);

		if (route.path === '/login' || route.path === '/verify-new-email') {
			// Redirect ke halaman login
			return;
		} else {
			navigateTo("/auth", { replace: true });
		}
		// Redirect ke halaman login
	}

	if (error.code === 422 && Array.isArray(error.errors)) {
		const validationErrors: Record<string, string> = {};

		error.errors.forEach((err: any) => {
			const field = err.source?.pointer?.replace('/', '');
			if (field) {
				validationErrors[field] = err.detail;
			}
		});

		setErrors(validationErrors);
	} else {
		console.error('Unexpected error:', error);
	}
}
