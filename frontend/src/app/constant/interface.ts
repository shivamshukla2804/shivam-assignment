export interface ApiResponse<T = {}> {
  statusCode: number;
  message?: string;
  data: T;
}

export interface Iroute {
  path: string;
  fullUrl: string;
}
