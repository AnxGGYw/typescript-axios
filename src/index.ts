import { RequestConfig } from './types'
import xhr from './xhr'

const axois = (config: RequestConfig): void => {
  xhr(config)
}

export default axois
