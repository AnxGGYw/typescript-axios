import {
  transformRequest,
  transformResponse
} from '../../src/helpers/data'

describe('helpers data: ', () => {
  describe('transformRequest', () => {
    test('transformRequest with plain object', () => {
      let foo = {
        bar: 123
      }
      expect(transformRequest(foo)).toBe('{"bar":123}')
    })
  
    test('transformRequest with others', () => {
      let foo = new URLSearchParams('bar=123')
      expect(transformRequest(foo)).toBe(foo)
    })
  })
  
  describe('transformResponse', () => {
    test('transformResponse with json type', () => {
      const a = '{"foo": 123 }'
      expect(transformResponse(a)).toEqual({
        foo: 123
      })
    })
  
    test('transformResponse with string', () => {
      const a = '{ foo: 123 }'
      expect(transformResponse(a)).toBe('{ foo: 123 }')
    })
  
    test('transformResponse with others type', () => {
      const a = { foo: 123 }
      expect(transformResponse(a)).toBe(a)
    })
  })
})