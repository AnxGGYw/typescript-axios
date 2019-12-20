import { AxiosInstance } from './types'
import Axois from './core/Axios'
import { extend } from './helpers/util'

const createInstance = (): AxiosInstance => {
  const context = new Axois()
  const instance = Axois.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxiosInstance
}

const axios = createInstance()

export default axios
