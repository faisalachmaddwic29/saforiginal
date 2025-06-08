// services/api/api_instance.ts
import axios, { type AxiosInstance } from 'axios';

// Create Axios Instance
const ApiInstance: AxiosInstance = axios.create({
    baseURL: process.env.API_ORENPAY || 'http://157.15.124.158:8080/api',
    timeout: 30000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});

// Request Interceptor
ApiInstance.interceptors.request.use(
    async function (config) {
        // Add API Key to all requests
        if (process.env.API_ORENPAY_API_KEY) {
            config.headers['x-api-key'] = process.env.API_ORENPAY_API_KEY;
        }

        // Log request in development
        if (process.env.NODE_ENV === 'development') {
            console.log('🚀 API Request:', {
                method: config.method?.toUpperCase(),
                url: config.url,
                data: config.data,
                params: config.params,
            });
        }

        return config;
    },
    function (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error('❌ Request Error:', error);
        }
        return Promise.reject(error);
    }
);

// Response Interceptor
ApiInstance.interceptors.response.use(
    function (response) {
        // Log response in development
        if (process.env.NODE_ENV === 'development') {
            console.log('✅ API Response:', {
                status: response.status,
                data: response.data,
            });
        }
        return response;
    },
    function (error) {
        // Log error in development
        if (process.env.NODE_ENV === 'development') {
            console.error('❌ Response Error:', {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message,
            });
        }
        return Promise.reject(error);
    }
);

export default ApiInstance;