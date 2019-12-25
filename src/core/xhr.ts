import { RequestConfig, AxiosResponse, AxiosPromiseResponse } from '../types'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'
import transform from './transform'

const xhr = (config: RequestConfig): AxiosPromiseResponse => {
  return new Promise((resolve, reject) => {
    let {
      url,
      method = 'get',
      data = null,
      headers,
      responseType,
      timeout,
      transformResponse,
      cancelToken
    } = config

    const request = new XMLHttpRequest()

    definedRequest(request, config)

    request.open(method.toUpperCase(), url!, true)

    request.onreadystatechange = () => {
      if (request.readyState !== 4) {
        return
      }
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData = responseType === 'text' ? request.responseText : request.response
      const response: AxiosResponse = {
        data: transform(responseData, responseHeaders, transformResponse),
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      handleResponse(response)
    }

    request.onerror = (): void => {
      reject(createError('Network Error', config, null, request))
    }
    request.ontimeout = (): void => {
      reject(createError(`Timeout of ${timeout} ms`, config, 'ECONNABORTED', request))
    }

    // 设置headers需要在open方法之后
    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[data]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    // 配置自定义参数
    function definedRequest(request: XMLHttpRequest, config: RequestConfig): void {
      const { responseType, timeout } = config

      if (responseType) {
        request.responseType = responseType
      }
      if (timeout) {
        request.timeout = timeout
      }
    }
    // 处理返回结果
    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with status code: ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }

    if (cancelToken) {
      cancelToken.promise.then(
        reason => {
          // 取消请求
          request.abort()
          reject(reason)
        },
        err => {
          reject(err)
        }
      )
    }

    request.send(data)
  })
}

export default xhr
