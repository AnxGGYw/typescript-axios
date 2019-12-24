export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

export interface RequestConfig {
  url?: string
  method?: Method
  params?: any
  data?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
  transformRequest?: AxiosTransformer | AxiosTransformer[]
  transformResponse?: AxiosTransformer | AxiosTransformer[]

  [propName: string]: any
}

export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: RequestConfig
  request: any
}

export interface AxiosPromiseResponse<T = any> extends Promise<AxiosResponse<T>> {}

export interface AxiosResponseError extends Error {
  config: RequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
  isAxiosError: boolean
}

export interface Axios {
  defaults: RequestConfig

  interceptors: {
    request: AxiosInterceptorManager<RequestConfig>
    response: AxiosInterceptorManager<AxiosResponse>
  }

  request<T = any>(config: RequestConfig): AxiosPromiseResponse<T>

  get<T = any>(url: string, config?: RequestConfig): AxiosPromiseResponse<T>

  delete<T = any>(url: string, config?: RequestConfig): AxiosPromiseResponse<T>

  head<T = any>(url: string, config?: RequestConfig): AxiosPromiseResponse<T>

  options<T = any>(url: string, config?: RequestConfig): AxiosPromiseResponse<T>

  post<T = any>(url: string, data?: any, config?: RequestConfig): AxiosPromiseResponse<T>

  put<T = any>(url: string, data?: any, config?: RequestConfig): AxiosPromiseResponse<T>

  patch<T = any>(url: string, data?: any, config?: RequestConfig): AxiosPromiseResponse<T>
}

export interface AxiosInstance extends Axios {
  <T = any>(config: RequestConfig): AxiosPromiseResponse<T>

  <T = any>(url: string, config?: RequestConfig): AxiosPromiseResponse<T>
}

export interface AxiosStaticInstance extends AxiosInstance {
  create(config?: RequestConfig): AxiosInstance
}

export interface AxiosInterceptorManager<T> {
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number

  eject(id: number): void
}

export interface ResolvedFn<T> {
  (val: T): T | Promise<T>
}

export interface RejectedFn {
  (error: any): void
}

export interface AxiosTransformer {
  (data: any, headers?: any): any
}
