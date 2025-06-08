// types/api.ts

// Base API Response Types
export interface ApiSuccessResponse {
    status: number;
    message: string;
    data: any;
}

export interface ApiError {
    status: number;
    title: string;
    detail: string;
    source?: {
        pointer: string;
    };
}

export interface ApiErrorResponse {
    errors: ApiError[];
}

// Custom API Response Type
export interface ApiResponseType {
		success?: boolean;
    code: string | number;
    message: string;
    status: boolean;
    data: any;
    errors?: ApiError[];
}

// API Service Interface
export interface ApiService {
    get(endpoint: string, params?: Record<string, any>): Promise<ApiResponseType>;
    post(
        endpoint: string,
        data: any,
        params?: Record<string, any>
    ): Promise<ApiResponseType>;
    put(
        endpoint: string,
        data: any,
        params?: Record<string, any>
    ): Promise<ApiResponseType>;
    delete(endpoint: string, params?: Record<string, any>): Promise<ApiResponseType>;
    patch(
        endpoint: string,
        data: any,
        params?: Record<string, any>
    ): Promise<ApiResponseType>;
}

// Auth Token Interface
export interface AuthToken {
    token?: string;
    token_refresh?: string;
    token_type?: string;
    expires_at?: Date;
}

// Request Config Interface
export interface RequestConfig {
    method: 'get' | 'post' | 'put' | 'delete' | 'patch';
    endpoint: string;
    data?: any;
    params?: Record<string, any>;
    requiresAuth?: boolean;
}