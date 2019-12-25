import { RequestConfig, AxiosResponse, AxiosPromiseResponse } from '../types'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'
import transform from './transform'
import { isURLSameOringin } from '../helpers/url'
import cookie from '../helpers/cookie'
import { isFormData } from '../helpers/util'

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
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
      onUploadProgress,
      onDownloadProgress,
      auth,
      validateStatus
    } = config

    const request = new XMLHttpRequest()

    request.open(method.toUpperCase(), url!, true)

    configureRequest()

    configureEvents()

    processHeaders()

    processCancel()

    request.send(data)

    function configureRequest(): void {
      if (responseType) {
        request.responseType = responseType
      }
      if (timeout) {
        request.timeout = timeout
      }
      if (withCredentials) {
        request.withCredentials = withCredentials
      }
    }

    function configureEvents(): void {
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
      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress
      }
      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress
      }
    }
    // 处理返回结果
    function handleResponse(response: AxiosResponse): void {
      if (!validateStatus || validateStatus(response.status)) {
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

    function processHeaders(): void {
      if (isFormData(data)) {
        delete headers['Content-Type']
      }
      if ((withCredentials || isURLSameOringin(url!)) && xsrfCookieName) {
        const xsrfCookieValue = cookie.read(xsrfCookieName)
        if (xsrfCookieValue && xsrfHeaderName) {
          headers[xsrfHeaderName] = xsrfCookieValue
        }
      }
      if (auth) {
        headers['Authorization'] = `Basic ${btoa(auth.username + ':' + auth.passowrd)}`
      }
      // 设置headers需要在open方法之后
      Object.keys(headers).forEach(name => {
        if (data === null && name.toLowerCase() === 'content-type') {
          delete headers[data]
        } else {
          request.setRequestHeader(name, headers[name])
        }
      })
    }

    function processCancel(): void {
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
    }
  })
}

export default xhr
