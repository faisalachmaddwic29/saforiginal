// services/api/api_response.ts
import type {
    ApiResponseType,
    ApiSuccessResponse,
    ApiErrorResponse,
    ApiError
} from '~/types/api';

export class ApiResponseHandler {
    /**
     * Handle successful API response
     */
    static handleSuccess(response: any): ApiResponseType {
        const data = response.data;

        // Handle different success response formats
        if (data.status && data.message && data.data !== undefined) {
            // Format: { status: 200, message: "...", data: {...} }
            return {
                code: data.status,
                message: data.message,
                status: true,
                data: data.data,
            };
        }

        // Default success format
        return {
            code: response.status,
            message: response.statusText || 'Success',
            status: true,
            data: data,
        };
    }

    /**
     * Handle API error response
     */
    static handleError(error: any): ApiResponseType {
        const response = error.response;

        if (!response) {
            // Network or other errors
            return {
                code: 'NETWORK_ERROR',
                message: error.message || 'Network error occurred',
                status: false,
                data: null,
            };
        }

        const { status, data } = response;

        // Handle error responses with 'errors' array
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

        // Handle simple error responses
        if (data?.message) {
            return {
                code: status,
                message: data.message,
                status: false,
                data: data.data || null,
            };
        }

        // Default error response
        return {
            code: status,
            message: error.message || 'An error occurred',
            status: false,
            data: null,
        };
    }

    /**
     * Check if response is successful
     */
    static isSuccess(response: ApiResponseType): boolean {
        return response.status === true;
    }

    /**
     * Check if error is validation error (422)
     */
    static isValidationError(response: ApiResponseType): boolean {
        return response.code === 422;
    }

    /**
     * Check if error is authentication error (401/403)
     */
    static isAuthError(response: ApiResponseType): boolean {
        return response.code === 401 || response.code === 403;
    }

    /**
     * Extract validation errors for form handling
     */
    static getValidationErrors(response: ApiResponseType): Record<string, string> {
        if (!response.errors) return {};

        const validationErrors: Record<string, string> = {};

        response.errors.forEach((error: ApiError) => {
            if (error.source?.pointer) {
                const fieldName = error.source.pointer.replace('/', '');
                validationErrors[fieldName] = error.detail;
            }
        });

        return validationErrors;
    }

    /**
     * Get first error message
     */
    static getFirstErrorMessage(response: ApiResponseType): string {
        if (response.errors && response.errors.length > 0) {
            return response.errors[0].detail || response.errors[0].title;
        }
        return response.message;
    }
}