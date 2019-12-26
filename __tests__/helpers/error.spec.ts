import { createError } from '../../src/helpers/error'
import { RequestConfig, AxiosResponse } from '../../src/types' 

describe('helpers error: ', () => {
  test('createError', () => {
    const request = new XMLHttpRequest()
    const config: RequestConfig = {
      method: 'post'
    }
    const response: AxiosResponse = {
      data: {
        foo: 123
      },
      status: 200,
      statusText: 'success',
      request,
      headers: {
        Connection: 'keep-alive'
      },
      config
    }

    const error = createError('not permisstion', config, 'code', request, response)

    expect(error instanceof Error).toBeTruthy()
    expect(error.message).toBe('not permisstion')
    expect(error.config).toBe(config)
    expect(error.code).toBe('code')
    expect(error.request).toBe(request)
    expect(error.response).toBe(response)
    expect(error.isAxiosError).toBeTruthy()
  })
})