import {
  isNull,
  isUndefined,
  isDate,
  isPlainObject,
  isFormData,
  isURLSearchParams,
  extend,
  deepMerge
} from '../../src/helpers/util'

describe('helpers: util', () => {
  describe('is XXX', () => {
    test('isNull', () => {
      expect(isNull(null)).toBeTruthy()
      expect(isNull('null')).toBeFalsy()
    })
    test('isUndefined', () => {
      expect(isUndefined(undefined)).toBeTruthy()
      expect(isUndefined('undefined')).toBeFalsy()
    })
    test('isDate', () => {
      expect(isDate(new Date())).toBeTruthy()
      expect(isDate(Date.now())).toBeFalsy()
    })
    test('isPlainObject', () => {
      expect(isPlainObject({
        'a': 1,
        'b': 2
      })).toBeTruthy()
      expect(isPlainObject('{a: 1, b: 2}')).toBeFalsy()
    })
    test('isFormData', () => {
      expect(isFormData(new FormData())).toBeTruthy()
      expect(isFormData({})).toBeFalsy
    })
    test('isURLSearchParams', () => {
      expect(isURLSearchParams(new URLSearchParams())).toBeTruthy()
      expect(isURLSearchParams({})).toBeFalsy()
    })
  })
  describe('extend', () => {
    test('one of null', () => {
      const a = Object.create(null)
      const b = {
        foo: 123
      }
      extend(a, b)
      expect(a.foo).toBe(123)
    })
    test('has same property', () => {
      const a = {
        foo: 123,
        bar: 456
      }
      const b = {
        foo: 789
      }
      const c = extend(a, b)
      expect(c.foo).toBe(789)
      expect(c.bar).toBe(456)
    })
  })
  describe('deepMerge', () => {
    // test()
  })
})