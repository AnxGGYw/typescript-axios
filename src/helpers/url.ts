import { isUndefined, isNull, isDate, isObject } from './util'

/**
 * 拼接url参数
 *
 * @param {string} url
 * @param {*} [params]
 * @returns {string}
 */
export const buildURL = (url: string, params?: any): string => {
  if (!params) {
    return url
  }
  const parts: string[] = []

  Object.keys(params).forEach(key => {
    const value = params[key]
    if (isUndefined(value) || isNull(value)) {
      return
    }
    // 因为需要涉及到数组参数, 这里统一用[]处理
    let values = []
    if (Array.isArray(value)) {
      values = value
      key += '[]'
    } else {
      values = [value]
    }
    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })
  let normalizeParams = parts.join('&')
  if (normalizeParams) {
    // 忽略url的哈希值
    if (url.includes('#')) {
      let sliceIndex = url.indexOf('#')
      url = url.slice(0, sliceIndex)
    }
    url += (url.includes('?') ? '&' : '?') + normalizeParams
  }

  return url
}

/**
 * %20 空格 --> +
 * %24 --> $
 * %2C --> ,
 * %3A --> :
 * %40 --> @
 * %5b --> [
 * %5d --> ]
 *
 * @param {string} value
 * @returns {string}
 */
const encode = (value: string): string => {
  return encodeURIComponent(value)
    .replace(/%20/g, '+')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%3A/gi, ':')
    .replace(/%40/g, '@')
    .replace(/%5b/gi, '[')
    .replace(/%5d/gi, ']')
}
