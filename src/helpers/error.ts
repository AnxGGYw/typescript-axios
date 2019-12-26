import { RequestConfig, AxiosResponse } from '../types'

class AxiosError extends Error {
  config: RequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
  isAxiosError: boolean

  constructor(
    message: string,
    config: RequestConfig,
    code?: string | null,
    request?: any,
    response?: AxiosResponse
  ) {
    super(message)

    this.config = config
    this.code = code
    this.request = request
    this.response = response
    this.isAxiosError = true

    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

export const createError = (
  message: string,
  config: RequestConfig,
  code?: string | null,
  request?: any,
  response?: AxiosResponse
): AxiosError => {
  return new AxiosError(message, config, code, request, response)
}
