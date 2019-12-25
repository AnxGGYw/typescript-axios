import { RequestConfig, AxiosPromiseResponse } from '../types'
import xhr from './xhr'
import { buildURL, isAbsoluteURL, combineURL } from '../helpers/url'
import { flatHeaders } from '../helpers/headers'
import transform from './transform'

// dispatch entry
const dispatchRequest = (config: RequestConfig): AxiosPromiseResponse => {
  // 检测当前请求是否手动取消过
  throwCancelRequestedError(config)

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
export const transformURL = (config: RequestConfig): string => {
  let { url, params, paramsSerializer, baseURL } = config
  if (baseURL && !isAbsoluteURL(url!)) {
    url = combineURL(baseURL, url)
  }
  return buildURL(url!, params, paramsSerializer)
}

const throwCancelRequestedError = (config: RequestConfig) => {
  if (config.cancelToken) {
    config.cancelToken.throwRequestedError()
  }
}

export default dispatchRequest
