import { RequestConfig, AxiosPromiseResponse } from '../types'
import xhr from './xhr'
import { buildURL } from '../helpers/url'
import { flatHeaders } from '../helpers/headers'
import transform from './transform'

// dispatch entry
const dispatchRequest = (config: RequestConfig): AxiosPromiseResponse => {
  processConfig(config)
  return xhr(config)
}
// 处理配置
const processConfig = (config: RequestConfig): void => {
  config.url = transformURL(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flatHeaders(config.headers, config.method!)
}
// 转换url
const transformURL = (config: RequestConfig): string => {
  const { url, params } = config
  return buildURL(url!, params)
}

export default dispatchRequest
