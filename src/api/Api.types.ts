export interface ApiResponse<R = any> {
  data?: R;
  status: number;
  error?: Error;
  isCanceled?: boolean;
}

export type ApiRequest<T extends object = {}> = T & {
  skip?: number;
  limit?: number;
};

export interface BaseResponse {
  total: number;
  skip: number;
  limit: number;
}
