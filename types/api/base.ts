// types/api/base.ts

export interface ApiSuccessResponse<T> {
	status: number;
	message: string;
	data: T[];
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

export interface ApiResponseType<T> {
	success?: boolean;
	code: string | number;
	message: string;
	status: boolean;
	data: T;
	errors?: ApiError[];
}

export interface PaginatedMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface PaginatedLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

// Misalnya key data-nya dinamakan 'articles' atau lainnya
export type PaginateData<T, K extends string> = {
  [P in K]: T[];
} & {
  meta: PaginatedMeta;
  links: PaginatedLinks;
};