import { RequestConfig, AxiosResponse, AxiosPromiseResponse } from '../types'
import { parseHeaders } from '../helpers/headers'
import { transformResponse } from '../helpers/data'

const xhr = (config: RequestConfig): AxiosPromiseResponse => {
  return new Promise((resolve, reject) => {
    let { url, method = 'get', data = null, headers, responseType } = config

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    request.open(method.toUpperCase(), url, true)

    request.onreadystatechange = () => {
      if (request.readyState !== 4) {
        return
      }
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData = responseType === 'text' ? request.responseText : request.response
      const response: AxiosResponse = {
        data: transformResponse(responseData),
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      resolve(response)
    }

    // 设置headers需要在open方法之后
    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[data]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    request.send(data)
  })
}

export default xhr
