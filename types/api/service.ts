import type { ApiResponseType } from ".";

export interface ApiService {
	get(endpoint: string, params?: Record<string, unknown>): Promise<ApiResponseType>;
	post(
		endpoint: string,
		data: unknown,
		params?: Record<string, unknown>
	): Promise<ApiResponseType>;
	put(
		endpoint: string,
		data: unknown,
		params?: Record<string, unknown>
	): Promise<ApiResponseType>;
	delete(endpoint: string, params?: Record<string, unknown>): Promise<ApiResponseType>;
	patch(
		endpoint: string,
		data: unknown,
		params?: Record<string, unknown>
	): Promise<ApiResponseType>;
}
