import { isUndefined, isNull, isDate, isPlainObject, isURLSearchParams } from './util'

interface URLOrigin {
  protocol: string
  host: string
}

/**
 * 拼接url参数
 *
 * @param {string} url
 * @param {*} [params]
 * @returns {string}
 */
export const buildURL = (
  url: string,
  params?: any,
  paramsSerializer?: (params: any) => string
): string => {
  if (!params) {
    return url
  }

  // params解析后的结果
  let normalizeParams: string

  if (paramsSerializer) {
    normalizeParams = paramsSerializer(params)
  } else if (isURLSearchParams(params)) {
    normalizeParams = params.toString()
  } else {
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
        } else if (isPlainObject(val)) {
          val = JSON.stringify(val)
        }
        parts.push(`${encode(key)}=${encode(val)}`)
      })
    })
    normalizeParams = parts.join('&')
  }
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

// 判断是否同源
export function isURLSameOringin(requestURL: string): boolean {
  const { protocol, host } = resolveURL(requestURL)
  const { protocol: cProtocol, host: cHost } = currentUrlParseNode
  return protocol === cProtocol && host === cHost
}

// 利用创建a标签配置href属性, 获取protocol, host
const urlParseNode = document.createElement('a')
// 当前页面
const currentUrlParseNode = resolveURL(window.location.href)

function resolveURL(url: string): URLOrigin {
  urlParseNode.setAttribute('href', url)
  const { protocol, host } = urlParseNode
  return {
    protocol,
    host
  }
}

// 绝对路径
export const isAbsoluteURL = (url: string): boolean => {
  return /(^[a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
}

export const combineURL = (baseURL: string, relativeURL?: string): string => {
  if (!relativeURL) {
    return baseURL
  }
  // 将baseURL后面的/ 以及 relativeURL前面的/ 去掉
  return baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
}
