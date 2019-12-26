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

    test('validate isNull', () => {
      expect(isNull(null)).toBeTruthy()
      expect(isNull('null')).toBeFalsy()
    })

    test('validate isUndefined', () => {
      expect(isUndefined(undefined)).toBeTruthy()
      expect(isUndefined('undefined')).toBeFalsy()
    })

    test('validate isDate', () => {
      expect(isDate(new Date())).toBeTruthy()
      expect(isDate(Date.now())).toBeFalsy()
    })

    test('validate isPlainObject', () => {
      expect(isPlainObject({
        'a': 1,
        'b': 2
      })).toBeTruthy()
      expect(isPlainObject('{a: 1, b: 2}')).toBeFalsy()
    })

    test('validate isFormData', () => {
      expect(isFormData(new FormData())).toBeTruthy()
      expect(isFormData({})).toBeFalsy()
    })

    test('validate isURLSearchParams', () => {
      expect(isURLSearchParams(new URLSearchParams())).toBeTruthy()
      expect(isURLSearchParams('foo=1&bar=2')).toBeFalsy()
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
    test('not change', () => {
      const a = Object.create(null)
      const b = {
        foo: 123
      }
      const c = {
        bar: 456
      }
      deepMerge(a, b, c)

      expect(typeof a.foo).toBe('undefined')
      expect(typeof a.bar).toBe('undefined')
      expect(b.foo === 123).toBeTruthy()
      expect(c.bar === 456).toBeTruthy()
    })

    test('merge property', () => {
      const a = {
        foo: 123
      }
      const b = {
        foo: 456
      }
      const c = {
        bar: 789
      }
      const d = deepMerge(a, b, c)

      expect(d.foo).toBe(456)
      expect(d.bar).toBe(789)
    })

    test('merge recursive', () => {
      const a = {
        foo: {
          bar: 123
        }
      }
      const b = {
        foo: {
          baz: 456
        },
        bar: {
          lux: 789
        }
      }
      const c = deepMerge(a, b)

      expect(c).toEqual({
        foo: {
          bar: 123,
          baz: 456
        },
        bar: {
          lux: 789
        }
      })
    })

    test('null undefined', () => {
      const a = {
        foo: {
          baz: 123
        }
      }
      const c = deepMerge(a, null, undefined)

      expect(c).toEqual({
        foo: {
          baz: 123
        }
      })
    })
  })
})