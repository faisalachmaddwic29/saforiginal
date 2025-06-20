// utils/errorHandler.ts
export function handleValidationError(
	error: any,
	setErrors: (errors: Record<string, string>) => void
): void {
	if (error.code === 403 || error.code === 400) {
		notify.error(error.message);
	}

	if (error.code === 401) {
		notify.error(error.message);

		// Redirect ke halaman login
		navigateTo("/", { replace: true });
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
