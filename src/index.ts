import { RequestConfig } from './types'
import xhr from './xhr'
import { buildURL } from './helpers/url'
import { transformRequest } from './helpers/data'
import { processHeaders } from './helpers/headers'

// 入口entry
const axois = (config: RequestConfig): void => {
  processConfig(config)
  xhr(config)
}
// 处理配置
const processConfig = (config: RequestConfig): void => {
  config.url = transformURL(config)
  // transformHeaders处理需要放到transformRequestData之前
  // 因为transformRequestData会将符合要求的data数据转成字符串
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}
// 转换url
const transformURL = (config: RequestConfig): string => {
  const { url, params } = config
  return buildURL(url, params)
}
// 转换data
const transformRequestData = (config: RequestConfig): any => {
  return transformRequest(config.data)
}
// 转化headers
const transformHeaders = (config: RequestConfig): any => {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

export default axois
