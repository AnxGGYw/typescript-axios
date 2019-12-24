import {
  RequestConfig,
  AxiosPromiseResponse,
  AxiosResponse,
  ResolvedFn,
  RejectedFn,
  Method
} from '../types'
import dispatchRequest from './dispatchRequest'
import InterceptorManager from './interceptorManager'
import mergeConfig from './mergeConfig'

interface Interceptors {
  request: InterceptorManager<RequestConfig>
  response: InterceptorManager<AxiosResponse>
}

interface PromiseChain<T> {
  resolved: ResolvedFn<T> | ((config: RequestConfig) => AxiosPromiseResponse)
  rejected?: RejectedFn
}

export default class Axios {
  defaults: RequestConfig

  interceptors: Interceptors

  constructor(initDefaultConfig: RequestConfig) {
    this.defaults = initDefaultConfig

    this.interceptors = {
      request: new InterceptorManager<RequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
  }
  request(url: any, config?: any): AxiosPromiseResponse {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }
    // merge config
    config = mergeConfig(this.defaults, config)

    const chain: PromiseChain<any>[] = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ]
    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor)
    })
    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })

    let promise = Promise.resolve(config)

    while (chain.length) {
      const { resolved, rejected } = chain.shift()!
      promise = promise.then(resolved, rejected)
    }

    return promise
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
