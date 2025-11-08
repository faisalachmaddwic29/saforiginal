// services/api/api_service.ts
import type { AxiosResponse } from 'axios';
import { ApiInstance } from '~/services/api/api_instance';
import { ApiResponseHandler } from '~/services/api/api_response';
import type { ApiResponseType } from '~/types/api';
import type { ApiService } from '~/types/api/service';

class ApiSafOriginal implements ApiService {
  /**
   * Get authorization headers from auth store
   */
  private getAuthHeaders(): Record<string, string> {
    // Check if we're on client side
    if (import.meta.client) {
      const authStore = useAuthStore();
      if (authStore.accessToken) {
        return {
          'Authorization': authStore.authHeader,
        };
      }
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
      const authHeaders = this.getAuthHeaders();
      const headers = {
        ...authHeaders,
        ...(customHeaders || {}),
      };

      const response: AxiosResponse = await ApiInstance.request({
        method,
        baseURL: config.public.apiUrl as string,
        url: endpoint,
        data,
        params,
        headers,
        timeout: 30000, // 30 second timeout
      });

      return ApiResponseHandler.handleSuccess(response) as TResponse;
    } catch (error: unknown) {
      // Log error untuk debugging
      if (import.meta.server) {
        console.error('[API Server Error]', {
          method,
          endpoint,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }

      const errorResponse = ApiResponseHandler.handleError(error);
      throw errorResponse;
    }
  }

  /**
   * Redirect to login page
   */
  private redirectToLogin() {
    if (import.meta.client && typeof navigateTo !== 'undefined') {
      navigateTo('/auth/login');
    }
  }

  /**
   * GET request
   */
  async get<TData, TParams = unknown>(
    endpoint: string,
    params?: Record<string, TParams>,
    headers?: Record<string, string>
  ): Promise<ApiResponseType<TData>> {
    return this.makeRequest<ApiResponseType<TData>>('get', endpoint, undefined, params, headers);
  }

  /**
   * POST request
   */
  async post<TData, TBody = unknown, TParams = unknown>(
    endpoint: string,
    data: TBody,
    params?: Record<string, TParams>,
    headers?: Record<string, string>
  ): Promise<ApiResponseType<TData>> {
    return this.makeRequest<ApiResponseType<TData>>('post', endpoint, data, params, headers);
  }

  /**
   * PUT request
   */
  async put<TData, TBody = unknown, TParams = unknown>(
    endpoint: string,
    data: TBody,
    params?: Record<string, TParams>,
    headers?: Record<string, string>
  ): Promise<ApiResponseType<TData>> {
    return this.makeRequest<ApiResponseType<TData>>('put', endpoint, data, params, headers);
  }

  /**
   * PATCH request
   */
  async patch<TData, TBody = unknown, TParams = unknown>(
    endpoint: string,
    data: TBody,
    params?: Record<string, TParams>,
    headers?: Record<string, string>
  ): Promise<ApiResponseType<TData>> {
    return this.makeRequest<ApiResponseType<TData>>('patch', endpoint, data, params, headers);
  }

  /**
   * DELETE request
   */
  async delete<TData, TParams = unknown>(
    endpoint: string,
    params?: Record<string, TParams>,
    headers?: Record<string, string>
  ): Promise<ApiResponseType<TData>> {
    return this.makeRequest<ApiResponseType<TData>>('delete', endpoint, undefined, params, headers);
  }
}

// Export singleton instance
const apiSaforiginal = new ApiSafOriginal();
export default apiSaforiginal;
