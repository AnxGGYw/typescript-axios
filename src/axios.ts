import { AxiosInstance, RequestConfig } from './types'
import Axois from './core/Axios'
import { extend } from './helpers/util'
import axiosDefaults from './defaults'

const createInstance = (initDefaultConfig: RequestConfig): AxiosInstance => {
  const context = new Axois(initDefaultConfig)
  const instance = Axois.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxiosInstance
}

const axios = createInstance(axiosDefaults)

export default axios
