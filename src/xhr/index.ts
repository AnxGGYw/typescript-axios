import { RequestConfig } from '../types'

const xhr = (config: RequestConfig): void => {
  let { url, method = 'get', data = null } = config

  const request = new XMLHttpRequest()

  request.open(method.toUpperCase(), url, true)

  request.send(data)
}

export default xhr
