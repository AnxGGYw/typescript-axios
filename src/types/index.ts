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
}

export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: RequestConfig
  request: any
}

export interface AxiosPromiseResponse extends Promise<AxiosResponse> {}

export interface AxiosResponseError extends Error {
  config: RequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
  isAxiosError: boolean
}

export interface Axios {
  request(config: RequestConfig): AxiosPromiseResponse

  get(url: string, config?: RequestConfig): AxiosPromiseResponse

  delete(url: string, config?: RequestConfig): AxiosPromiseResponse

  head(url: string, config?: RequestConfig): AxiosPromiseResponse

  options(url: string, config?: RequestConfig): AxiosPromiseResponse

  post(url: string, data?: any, config?: RequestConfig): AxiosPromiseResponse

  put(url: string, data?: any, config?: RequestConfig): AxiosPromiseResponse

  patch(url: string, data?: any, config?: RequestConfig): AxiosPromiseResponse
}

export interface AxiosInstance extends Axios {
  (config: RequestConfig): AxiosPromiseResponse
}
