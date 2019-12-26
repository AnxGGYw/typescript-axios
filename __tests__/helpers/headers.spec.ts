import {
  processHeaders,
  parseHeaders,
  flatHeaders
} from '../../src/helpers/headers'

describe('helpers headers: ', () => {
  describe('processHeaders', () => {
    test('processHeaders with no data', () => {
      const headers = {
        'content-type': 'application/json;charset=utf-8',
        'Content-Type': '',
        'Content-Length': 1024
      }
      processHeaders(headers, {})
      expect(headers['Content-Type']).toBe('application/json;charset=utf-8')
      expect(typeof headers['content-type']).toBe('undefined')
      expect(headers['Content-Length']).toBe(1024)
    })
  
    test('processHeaders with plain data', () => {
      const headers: any = {}
      processHeaders(headers, { foo: 123 })
      expect(headers['Content-Type']!).toBe('application/json;charset=utf-8')
    })
  
    test('processHeaders with not plain data', () => {
      const headers: any = {}
      processHeaders(headers, new URLSearchParams('foo=bar'))
      expect(typeof headers['Content-Type']).toBe('undefined')
    })
  
    test('processHeaders with null or undefined headers', () => {
      expect(processHeaders(null, {})).toBeNull()
      expect(processHeaders(undefined, {})).toBeUndefined()
    })
  })
  
describe('parseHeaders', () => {
    test('should parse headers', () => {
      const headers =
        'Content-Type: application/json\r\n' +
        'Connection: keep-alive\r\n' +
        'Content-Encoding: gzip\r\n' +
        'Server: Apache\r\n' +
        'Vary: Accept-Encoding\r\n' +
        'Date: Thu, 26 Dec 2019 01:57:15 GMT\r\n' +
        ': max-age=2628000\r\n' + 
        'ETag:'
  
      const parsedHeaders = parseHeaders(headers)
      expect(parsedHeaders['Content-Type']).toBe('application/json')
      expect(parsedHeaders['Connection']).toBe('keep-alive')
      expect(parsedHeaders['Content-Encoding']).toBe('gzip')
      expect(parsedHeaders['Server']).toBe('Apache')
      expect(parsedHeaders['Vary']).toBe('Accept-Encoding')
      expect(parsedHeaders['Date']).toBe('Thu, 26 Dec 2019 01:57:15 GMT')
      expect(parsedHeaders['ETag']).toBe('')
    })

    test('headers is "" ', () => {
      expect(parseHeaders('')).toEqual({})
    })
  })

  describe('flatHeaders', () => {
    test('should flat headers', () => {
      const headers = {
        common: {
          accept: 'application/json'
        },
        get: {
          foo: 'bar'
        }
      }
      expect(flatHeaders(headers, 'post')).toEqual({
        accept: 'application/json'
      })
      expect(flatHeaders(headers, 'get')).toEqual({
        accept: 'application/json',
        foo: 'bar'
      })
    })

    test('flat with null or undefined headers', () => {
      expect(flatHeaders(null, 'post')).toBeNull()
      expect(flatHeaders(undefined, 'get')).toBeUndefined()
    })
  })
})