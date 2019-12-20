import { RequestConfig, AxiosPromiseResponse, Method } from '../types'
import dispatchRequest from './dispatchRequest'

export default class Axios {
  request(config: RequestConfig): AxiosPromiseResponse {
    return dispatchRequest(config)
  }
  get(url: string, config: RequestConfig): AxiosPromiseResponse {
    return this._requestWithoutData('get', url, config)
  }
  delete(url: string, config: RequestConfig): AxiosPromiseResponse {
    return this._requestWithoutData('delete', url, config)
  }
  head(url: string, config: RequestConfig): AxiosPromiseResponse {
    return this._requestWithoutData('head', url, config)
  }
  options(url: string, config: RequestConfig): AxiosPromiseResponse {
    return this._requestWithoutData('options', url, config)
  }
  post(url: string, data?: any, config?: RequestConfig): AxiosPromiseResponse {
    return this._requestWithData('post', url, data, config)
  }
  put(url: string, data?: any, config?: RequestConfig): AxiosPromiseResponse {
    return this._requestWithData('put', url, data, config)
  }
  patch(url: string, data?: any, config?: RequestConfig): AxiosPromiseResponse {
    return this._requestWithData('patch', url, data, config)
  }
  _requestWithoutData(method: Method, url: string, config?: RequestConfig): AxiosPromiseResponse {
    return this.request(
      Object.assign(config || {}, {
        method,
        url
      })
    )
  }
  _requestWithData(
    method: Method,
    url: string,
    data?: any,
    config?: RequestConfig
  ): AxiosPromiseResponse {
    return this.request(
      Object.assign(config || {}, {
        method,
        url,
        data
      })
    )
  }
}
