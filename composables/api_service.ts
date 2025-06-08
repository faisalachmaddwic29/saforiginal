// services/api/api_service.ts
import { type AxiosResponse } from 'axios';
import ApiInstance from '~/services/api/api_instance';
import { ApiResponseHandler } from '~/services/api/api_response';
import type { ApiService, ApiResponseType, AuthToken } from '~/types/api';

class ApiServiceImpl implements ApiService {
	private authToken: AuthToken = {};

	/**
	 * Set authentication token
	 */
	setAuthToken(token: string, tokenType: string = 'Bearer', refreshToken?: string, expiresAt?: Date) {
		this.authToken = {
			token,
			token_refresh: refreshToken,
			token_type: tokenType,
			expires_at: expiresAt,
		};
	}

	/**
	 * Get current auth token
	 */
	getAuthToken(): AuthToken {
		return this.authToken;
	}

	/**
	 * Clear authentication token
	 */
	clearAuthToken() {
		this.authToken = {};
	}

	/**
	 * Get authorization headers
	 */
	private getAuthHeaders(): Record<string, string> {
		if (this.authToken.token) {
			return {
				'x-token': this.authToken.token,
			};
		}
		return {};
	}

	/**
	 * Make HTTP request with error handling
	 */
	private async makeRequest(
		method: 'get' | 'post' | 'put' | 'delete' | 'patch',
		endpoint: string,
		data?: any,
		params?: Record<string, any>,
		requiresAuth: boolean = false
	): Promise<ApiResponseType> {
		try {
			const headers = requiresAuth ? this.getAuthHeaders() : {};

			const response: AxiosResponse = await ApiInstance.request({
				method,
				url: endpoint,
				data,
				params,
				headers,
			});

			// Berhasil, proses response
			return ApiResponseHandler.handleSuccess(response);
		} catch (error: any) {
			const errorResponse = ApiResponseHandler.handleError(error);

			// Cek apakah error adalah auth error dan butuh token refresh
			if (ApiResponseHandler.isAuthError(errorResponse) && requiresAuth) {
				try {
					const refreshed = await this.refreshToken();
					if (refreshed) {
						// Ulangi request dengan token yang baru
						const headers = this.getAuthHeaders();
						const retryResponse: AxiosResponse = await ApiInstance.request({
							method,
							url: endpoint,
							data,
							params,
							headers,
						});
						return ApiResponseHandler.handleSuccess(retryResponse);
					}
				} catch (refreshError) {
					// Refresh token gagal, clear auth dan redirect ke login
					this.clearAuthToken();
					this.redirectToLogin();
				}
			}

			// Lempar error agar ditangkap di level yang lebih tinggi
			throw errorResponse;
		}
	}


	/**
	 * Refresh authentication token
	 */
	private async refreshToken(): Promise<boolean> {
		if (!this.authToken.token_refresh) {
			return false;
		}

		try {
			const response: AxiosResponse = await ApiInstance.post('/auth/refresh', {}, {
				headers: {
					'x-token': this.authToken.token_refresh,
				},
			});

			const data = response.data.data;
			const expiresIn = response.data.expiresIn ?? 299;
			const expiresAt = new Date(Date.now() + expiresIn * 1000);

			this.setAuthToken(
				data.accessToken,
				data.tokenType,
				data.refreshToken,
				expiresAt
			);

			return true;
		} catch (error) {
			return false;
		}
	}

	/**
	 * Redirect to login page (implement based on your routing)
	 */
	private redirectToLogin() {
		// For Nuxt 3
		if (typeof navigateTo !== 'undefined') {
			navigateTo('/auth/login');
		}
		// For Next.js or other routers, implement accordingly
		// window.location.href = '/auth/login';
	}

	/**
	 * GET request
	 */
	async get(endpoint: string, params?: Record<string, any>): Promise<ApiResponseType> {
		return this.makeRequest('get', endpoint, null, params);
	}

	/**
	 * POST request
	 */
	async post(endpoint: string, data: any, params?: Record<string, any>): Promise<ApiResponseType> {
		return this.makeRequest('post', endpoint, data, params);
	}

	/**
	 * PUT request
	 */
	async put(endpoint: string, data: any, params?: Record<string, any>): Promise<ApiResponseType> {
		return this.makeRequest('put', endpoint, data, params);
	}

	/**
	 * DELETE request
	 */
	async delete(endpoint: string, params?: Record<string, any>): Promise<ApiResponseType> {
		return this.makeRequest('delete', endpoint, null, params);
	}

	/**
	 * PATCH request
	 */
	async patch(endpoint: string, data: any, params?: Record<string, any>): Promise<ApiResponseType> {
		return this.makeRequest('patch', endpoint, data, params);
	}
}

// Export singleton instance
const apiService = new ApiServiceImpl();
export default apiService;