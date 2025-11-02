// services/api/api_response.ts
import type { ApiResponseType, ApiError } from '~/types/api';

export const ApiResponseHandler = {
    handleSuccess(response: any): ApiResponseType<any> {
        const data = response.data;

        if (data.status && data.message && data.data !== undefined) {
            return {
                code: data.status,
                message: data.message,
                status: true,
                data: data.data,
            };
        }

        return {
            code: response.status,
            message: response.statusText || 'Success',
            status: true,
            data: data,
        };
    },

    handleError(error: any): ApiResponseType<any> {
        const response = error.response;

        if (!response) {
            return {
                code: 'NETWORK_ERROR',
                message: error.message || 'Network error occurred',
                status: false,
                data: null,
            };
        }

        const { status, data } = response;

        if (data?.errors && Array.isArray(data.errors)) {
            const firstError = data.errors[0];

            return {
                code: status,
                message: firstError?.detail || firstError?.title || 'An error occurred',
                status: false,
                data: null,
                errors: data.errors,
            };
        }

        if (data?.message) {
            return {
                code: status,
                message: data.message,
                status: false,
                data: data.data || null,
            };
        }

        return {
            code: status,
            message: error.message || 'An error occurred',
            status: false,
            data: null,
        };
    },

    isSuccess(response: ApiResponseType<any>): boolean {
        return response.status === true;
    },

    isValidationError(response: ApiResponseType<any>): boolean {
        return response.code === 422;
    },

    isAuthError(response: ApiResponseType<any>): boolean {
        return response.code === 401 || response.code === 403;
    },

    getValidationErrors(response: ApiResponseType<any>): Record<string, string> {
        if (!response.errors) return {};

        const validationErrors: Record<string, string> = {};

        response.errors.forEach((error: ApiError) => {
            if (error.source?.pointer) {
                const fieldName = error.source.pointer.replace('/', '');
                validationErrors[fieldName] = error.detail;
            }
        });

        return validationErrors;
    },

    getFirstErrorMessage(response: ApiResponseType<any>): string {
        if (response.errors && response.errors.length > 0) {
            return response.errors[0].detail || response.errors[0].title;
        }
        return response.message;
    },
};
