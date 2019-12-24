import { RequestConfig, AxiosPromiseResponse } from '../types'
import xhr from './xhr'
import { buildURL } from '../helpers/url'
import { transformRequest } from '../helpers/data'
import { processHeaders, flatHeaders } from '../helpers/headers'

// dispatch entry
const dispatchRequest = (config: RequestConfig): AxiosPromiseResponse => {
  processConfig(config)
  return xhr(config)
}
// 处理配置
const processConfig = (config: RequestConfig): void => {
  config.url = transformURL(config)
  // transformHeaders处理需要放到transformRequestData之前
  // 因为transformRequestData会将符合要求的data数据转成字符串
  config.headers = transformRequestHeaders(config)
  config.data = transformRequestData(config)
  config.headers = flatHeaders(config.headers, config.method!)
}
// 转换url
const transformURL = (config: RequestConfig): string => {
  const { url, params } = config
  return buildURL(url!, params)
}
// 转换请求data
const transformRequestData = (config: RequestConfig): any => {
  return transformRequest(config.data)
}
// 转换请求headers
const transformRequestHeaders = (config: RequestConfig): any => {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

export default dispatchRequest
