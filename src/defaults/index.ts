import { RequestConfig } from '../types'
import { processHeaders } from '../helpers/headers'
import { transformRequest, transformResponse } from '../helpers/data'

const axoisDefaults: RequestConfig = {
  method: 'get',

  timeout: 3000,

  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },

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
  ]
}

const methodWithoutData = ['get', 'delete', 'head', 'options']

const methodWithData = ['post', 'put', 'patch']

methodWithoutData.forEach(method => {
  axoisDefaults.headers[method] = {}
})

methodWithData.forEach(method => {
  axoisDefaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default axoisDefaults
