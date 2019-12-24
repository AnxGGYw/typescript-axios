import { RequestConfig } from '../types'

const axoisDefaults: RequestConfig = {
  method: 'get',

  timeout: 3000,

  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  }
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
