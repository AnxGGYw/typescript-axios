import { RequestConfig } from '../types'

const xhr = (config: RequestConfig): void => {
  let { url, method = 'get', data = null, headers } = config

  const request = new XMLHttpRequest()

  request.open(method.toUpperCase(), url, true)

  // 设置headers需要在open方法之后
  Object.keys(headers).forEach(name => {
    if (data === null && name.toLowerCase() === 'content-type') {
      delete headers[data]
    } else {
      request.setRequestHeader(name, headers[name])
    }
  })

  request.send(data)
}

export default xhr
