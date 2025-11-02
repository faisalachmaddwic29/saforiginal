// services/api/api_service.ts
import type { AxiosResponse } from 'axios';
import { ApiInstance } from '~/services/api/api_instance';
import { ApiResponseHandler } from '~/services/api/api_response';
import type { ApiService, ApiResponseType } from '~/types/api';

class ApiServiceImpl implements ApiService {
	private async makeRequest<T>(
		method: 'get' | 'post' | 'put' | 'delete' | 'patch',
		endpoint: string,
		data?: unknown,
		params?: Record<string, unknown>,
		customHeaders?: Record<string, string>
	): Promise<ApiResponseType<T>> {
		try {
			const headers = { ...(customHeaders || {}) };

			const response: AxiosResponse = await ApiInstance.request({
				method,
				url: endpoint,
				data,
				params,
				headers,
			});

			// Berhasil, proses response
			return ApiResponseHandler.handleSuccess(response);
		} catch (error: unknown) {
			const errorResponse = ApiResponseHandler.handleError(error);
			// Lempar error agar ditangkap di level yang lebih tinggi
			throw errorResponse;
		}
	}

	/**
		 * GET request
		 */
	async get<T>(endpoint: string, params?: Record<string, unknown>, headers?: Record<string, string>): Promise<ApiResponseType<T>> {
		return this.makeRequest('get', endpoint, null, params, headers);
	}

	/**
	 * POST request
	 */
	async post<T>(endpoint: string, data: unknown, params?: Record<string, unknown>, headers?: Record<string, string>): Promise<ApiResponseType<T>> {
		return this.makeRequest('post', endpoint, data, params, headers);
	}

	/**
	 * PUT request
	 */
	async put<T>(endpoint: string, data: unknown, params?: Record<string, unknown>, headers?: Record<string, string>): Promise<ApiResponseType<T>> {
		return this.makeRequest('put', endpoint, data, params, headers);
	}

	/**
	 * DELETE request
	 */
	async delete<T>(endpoint: string, params?: Record<string, unknown>, headers?: Record<string, string>): Promise<ApiResponseType<T>> {
		return this.makeRequest('delete', endpoint, null, params, headers);
	}

	/**
	 * PATCH request
	 */
	async patch<T>(endpoint: string, data: unknown, params?: Record<string, unknown>, headers?: Record<string, string>): Promise<ApiResponseType<T>> {
		return this.makeRequest('patch', endpoint, data, params, headers);
	}
}

// Export singleton instance
const apiService = new ApiServiceImpl();
export default apiService;