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
  cancelToken?: CancelToken
  withCredentials?: boolean
  xsrfCookieName?: string
  xsrfHeaderName?: string
  auth?: AxiosBasicCredentials
  onUploadProgress?: (e: ProgressEvent) => void
  onDownloadProgress?: (e: ProgressEvent) => void
  validateStatus?: (status: number) => boolean
  paramsSerializer?: (params: any) => string

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

  CancelToken: CancelTokenStatic

  Cancel: CancelStatic

  isCancel: (value: any) => boolean
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

export interface CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  throwRequestedError(): void
}

export interface Canceler {
  (message?: string): void
}

export interface CancelExecutor {
  (cancel: Canceler): void
}

export interface CancelTokenSource {
  token: CancelToken
  cancel: Canceler
}

export interface CancelTokenStatic {
  new (executor: CancelExecutor): CancelToken

  source(): CancelTokenSource
}

export interface Cancel {
  message?: string
}

export interface CancelStatic {
  new (message?: string): Cancel
}

export interface AxiosBasicCredentials {
  username: string
  passowrd: string
}
