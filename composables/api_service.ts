// services/api/api_service.ts
import { type AxiosResponse } from 'axios';
import {ApiInstance,setApiBaseUrl} from '~/services/api/api_instance';
import { ApiResponseHandler } from '~/services/api/api_response';
import type { ApiService, ApiResponseType, AuthToken } from '~/types/api';

class ApiServiceImpl implements ApiService {
	private authToken: AuthToken = {};


	/**
	 * Get authorization headers from auth store
	 */
	private getAuthHeaders(): Record<string, string> {
		const authStore = useAuthStore();

		if (authStore.accessToken) {
			return {
				'Authorization': authStore.authHeader,
				// 'x-token': authStore.accessToken, // jika API menggunakan x-token
			};
		}
		return {};
	}

	/**
	 * Build endpoint URL with version prefix
	 */
	private buildEndpointUrl(endpoint: string): string {
		 const config = useRuntimeConfig()
		if (endpoint.includes('/auth')) {
			return endpoint;
		}

		const apiVersion = config.public.apiVersion;

		if (apiVersion) {
			return `/${apiVersion}${endpoint}`;
		}

		return endpoint;
	}

	/**
	 * Make HTTP request with error handling
	 */
	/**
	 * Make HTTP request with error handling
	 */
	private async makeRequest(
		method: 'get' | 'post' | 'put' | 'delete' | 'patch',
		endpoint: string,
		data?: any,
		params?: Record<string, any>,
		customHeaders?: Record<string, string>
	): Promise<ApiResponseType> {
		try {
			const authHeaders = this.getAuthHeaders();
			const headers = { ...authHeaders, ...(customHeaders || {}) };

			const finalEndpoint = this.buildEndpointUrl(endpoint);
			const config = useRuntimeConfig()
			setApiBaseUrl(config.public.apiUrl);
			const response: AxiosResponse = await ApiInstance.request({
				method,
				url: finalEndpoint,
				data,
				params,
				headers,
			});

			// Berhasil, proses response
			return ApiResponseHandler.handleSuccess(response);
		} catch (error: any) {
			const errorResponse = ApiResponseHandler.handleError(error);

			// Cek apakah error adalah auth error dan butuh token refresh
			// if (ApiResponseHandler.isAuthError(errorResponse) && requiresAuth) {
			// 	try {
			// 		const refreshed = await this.refreshToken();
			// 		if (refreshed) {
			// 			// Ulangi request dengan token yang baru
			// 			const headers = this.getAuthHeaders();
			// 			const retryResponse: AxiosResponse = await ApiInstance.request({
			// 				method,
			// 				url: endpoint,
			// 				data,
			// 				params,
			// 				headers,
			// 			});
			// 			return ApiResponseHandler.handleSuccess(retryResponse);
			// 		}
			// 	} catch (refreshError) {
			// 		// Refresh token gagal, clear auth dan redirect ke login
			// 		this.redirectToLogin();
			// 	}
			// }

			// Lempar error agar ditangkap di level yang lebih tinggi
			throw errorResponse;
		}
	}


	/**
	 * Redirect to login page (implement based on your routing)
	 */
	private redirectToLogin() {
		// For Nuxt 3
		if (typeof navigateTo !== 'undefined') {
			navigateTo('//login');
		}
		// For Next.js or other routers, implement accordingly
		// window.location.href = '//login';
	}

	/**
		 * GET request
		 */
	async get(endpoint: string, params?: Record<string, any>, headers?: Record<string, string>): Promise<ApiResponseType> {
		return this.makeRequest('get', endpoint, null, params, headers);
	}

	/**
	 * POST request
	 */
	async post(endpoint: string, data: any, params?: Record<string, any>, headers?: Record<string, string>): Promise<ApiResponseType> {
		return this.makeRequest('post', endpoint, data, params, headers);
	}

	/**
	 * PUT request
	 */
	async put(endpoint: string, data: any, params?: Record<string, any>, headers?: Record<string, string>): Promise<ApiResponseType> {
		return this.makeRequest('put', endpoint, data, params, headers);
	}

	/**
	 * DELETE request
	 */
	async delete(endpoint: string, params?: Record<string, any>, headers?: Record<string, string>): Promise<ApiResponseType> {
		return this.makeRequest('delete', endpoint, null, params, headers);
	}

	/**
	 * PATCH request
	 */
	async patch(endpoint: string, data: any, params?: Record<string, any>, headers?: Record<string, string>): Promise<ApiResponseType> {
		return this.makeRequest('patch', endpoint, data, params, headers);
	}
}

// Export singleton instance
const apiService = new ApiServiceImpl();
export default apiService;
