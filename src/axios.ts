import { AxiosStaticInstance, RequestConfig } from './types'
import Axois from './core/Axios'
import { extend } from './helpers/util'
import axiosDefaults from './defaults'
import mergeConfig from './core/mergeConfig'
import CancelToken from './cancel/CancelToken'
import Cancel, { isCancel } from './cancel/Cancel'

const createInstance = (initDefaultConfig: RequestConfig): AxiosStaticInstance => {
  const context = new Axois(initDefaultConfig)
  const instance = Axois.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxiosStaticInstance
}

const axios = createInstance(axiosDefaults)

axios.create = (config?: RequestConfig): AxiosStaticInstance => {
  return createInstance(mergeConfig(axiosDefaults, config))
}

axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel

export default axios
