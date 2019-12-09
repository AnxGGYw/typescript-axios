import { RequestConfig } from './types'
import xhr from './xhr'
import { buildURL } from './helpers/url'

// 入口entry
const axois = (config: RequestConfig): void => {
  processConfig(config)
  xhr(config)
}
// 处理配置
const processConfig = (config: RequestConfig): void => {
  config.url = transformURL(config)
}
// 转换url
const transformURL = (config: RequestConfig): string => {
  const { url, params } = config
  return buildURL(url, params)
}

export default axois
