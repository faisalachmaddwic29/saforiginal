// services/api/api_service.ts
import type { AxiosResponse } from 'axios';
import { ApiInstance, setApiBaseUrl } from '~/services/api/api_instance';
import { ApiResponseHandler } from '~/services/api/api_response';
import type { ApiResponseType } from '~/types/api';
import type { ApiService } from '~/types/api/service';

class ApiSafOriginal implements ApiService {
  // private authToken: AuthToken = {};

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
    if (endpoint.includes('/auth')) {
      return endpoint;
    }

    // const config = useRuntimeConfig()
    // const apiVersion = config.public.apiVersion;

    // if (apiVersion) {
    // 	return `/${apiVersion}${endpoint}`;
    // }

    return endpoint;
  }

  /**
   * Make HTTP request with error handling
   */
  private async makeRequest<TResponse = any, TBody = unknown, TParams = unknown>(
    method: 'get' | 'post' | 'put' | 'delete' | 'patch',
    endpoint: string,
    data?: TBody,
    params?: Record<string, TParams>,
    customHeaders?: Record<string, string>
  ): Promise<TResponse> {
    try {

      const config = useRuntimeConfig();
      setApiBaseUrl(config.public.apiUrl as string);

      const authHeaders = this.getAuthHeaders();
      const headers = { ...authHeaders, ...(customHeaders || {}) };

      const finalEndpoint = this.buildEndpointUrl(endpoint);
      const response: AxiosResponse = await ApiInstance.request({
        method,
        url: finalEndpoint,
        data,
        params,
        headers,
      });

      // Berhasil, proses response
      return ApiResponseHandler.handleSuccess(response) as TResponse;
    } catch (error: unknown) {
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
      navigateTo('/auth/login');
    }
    // For Next.js or other routers, implement accordingly
    // window.location.href = '//login';
  }

  /**
     * GET request
     */
  async get<TData, TParams = unknown>(
    endpoint: string,
    params?: Record<string, TParams>,
    headers?: Record<string, string>
  ): Promise<ApiResponseType<TData>> {
    return this.makeRequest<ApiResponseType<TData>>('get', endpoint, null, params, headers);
  }

  async post<TData, TBody = unknown, TParams = unknown>(
    endpoint: string,
    data: TBody,
    params?: Record<string, TParams>,
    headers?: Record<string, string>
  ): Promise<ApiResponseType<TData>> {
    return this.makeRequest<ApiResponseType<TData>>('post', endpoint, data, params, headers);
  }

  async put<TData, TBody = unknown, TParams = unknown>(
    endpoint: string,
    data: TBody,
    params?: Record<string, TParams>,
    headers?: Record<string, string>
  ): Promise<ApiResponseType<TData>> {
    return this.makeRequest<ApiResponseType<TData>>('put', endpoint, data, params, headers);
  }

  async patch<TData, TBody = unknown, TParams = unknown>(
    endpoint: string,
    data: TBody,
    params?: Record<string, TParams>,
    headers?: Record<string, string>
  ): Promise<ApiResponseType<TData>> {
    return this.makeRequest<ApiResponseType<TData>>('patch', endpoint, data, params, headers);
  }

  async delete<TData, TParams = unknown>(
    endpoint: string,
    params?: Record<string, TParams>,
    headers?: Record<string, string>
  ): Promise<ApiResponseType<TData>> {
    return this.makeRequest<ApiResponseType<TData>>('delete', endpoint, null, params, headers);
  }

}

// Export singleton instance
const apiSalammu = new ApiSafOriginal();
export default apiSalammu;
