import { RequestConfig } from '../types'
import { processHeaders } from '../helpers/headers'
import { transformRequest, transformResponse } from '../helpers/data'

const axiosDefaults: RequestConfig = {
  method: 'get',

  timeout: 3000,

  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },

  xsrfCookieName: 'XSRF-TOKEN',

  // xsrfHeaderName 是承载 xsrf token 的值的 HTTP 头的名称
  xsrfHeaderName: 'X-XSRF-TOKEN',

  transformRequest: [
    (data: any, headers?: any): any => {
      processHeaders(headers, data)
      return transformRequest(data)
    }
  ],

  transformResponse: [
    (data: any): any => {
      return transformResponse(data)
    }
  ],

  validateStatus: (status: number): boolean => {
    return status >= 200 && status < 300
  }
}

const methodWithoutData = ['get', 'delete', 'head', 'options']

const methodWithData = ['post', 'put', 'patch']

methodWithoutData.forEach(method => {
  axiosDefaults.headers[method] = {}
})

methodWithData.forEach(method => {
  axiosDefaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default axoisDefaults
