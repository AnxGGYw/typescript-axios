import { isPlainObject } from './util'

// 转换header中的属性名为我们定义的属性名
const normalizeHeaderName = (headers: any, normalizeName: any): void => {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (name !== normalizeName && name.toUpperCase() === normalizeName.toUppercase()) {
      headers[normalizeName] = headers[name]
      delete headers[name]
    }
  })
}

export const processHeaders = (headers: any, data: any): any => {
  normalizeHeaderName(headers, 'Content-Type')

  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }

  return headers
}

export const parseHeaders = (headers: string): any => {
  let parsedHeaders = Object.create(null)

  if (!headers) {
    return parsedHeaders
  }
  headers.split('\r\n').forEach(perLine => {
    let [key, value] = perLine.split(':')
    if (!key) {
      return
    }
    key.trim().toLowerCase()
    if (value) {
      value = value.trim()
    }
    parsedHeaders[key] = value
  })

  return parsedHeaders
}
