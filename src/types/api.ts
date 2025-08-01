export interface ApiResponse<T> {
  success: boolean;
  message: string;
  errors?: Record<string, any>;
  data: T;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    nextPage: number | null;
    prevPage: number | null;
  };
}

export interface AddAndUpdateResponse {
  success: boolean;
  message: string;
  errors?: Record<string, any>;
  data?: any;
}
