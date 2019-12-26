import {
  buildURL,
  isURLSameOringin,
  isAbsoluteURL,
  combineURL
} from '../../src/helpers/url'

describe('helpers url: ', () => {
  describe('isAbsoluteURL', () => {
    test('url is "" ', () => {
      expect(isAbsoluteURL('')).toBeFalsy()
    })
    
    test('should return true', () => {
      expect(isAbsoluteURL('https://www.baidu.com')).toBeTruthy()
      expect(isAbsoluteURL('http://www.baidu.com')).toBeTruthy()
      expect(isAbsoluteURL('//www.baidu.com')).toBeTruthy()
    })

    test('should return false', () => {
      expect(isAbsoluteURL('/index')).toBeFalsy()
      expect(isAbsoluteURL('/index/welcome')).toBeFalsy()
      expect(isAbsoluteURL('/index/welcome/index.html')).toBeFalsy()
    })
  })

  describe('combineURL', () => {
    test('relativeURL is undefined', () => {
      const baseURL = 'https://www.baidu.com'
      expect(combineURL(baseURL, undefined)).toBe('https://www.baidu.com')
    })
    
    test('baseURL with // end, relativeURL with / start', () => {
      const baseURL = 'https://www.baidu.com//'
      const relativeURL = '/index/welcome.html'
      expect(combineURL(baseURL, relativeURL)).toBe('https://www.baidu.com/index/welcome.html')
    })

    test('baseURL with // end, relativeURL with // start', () => {
      const baseURL = 'https://www.baidu.com//'
      const relativeURL = '//index/welcome.html'
      expect(combineURL(baseURL, relativeURL)).toBe('https://www.baidu.com/index/welcome.html')
    })

    test('baseURL with /// end, relativeURL with /// start', () => {
      const baseURL = 'https://www.baidu.com///'
      const relativeURL = '///index/welcome.html'
      expect(combineURL(baseURL, relativeURL)).toBe('https://www.baidu.com/index/welcome.html')
    })
  })
  
  describe('isURLSameOringin', () => {
    test('should return true', () => {
      expect(isURLSameOringin(window.location.href)).toBeTruthy()
    })

    test('should return false', () => {
      expect(isURLSameOringin('https://www.baidu.com')).toBeFalsy()
    })
  })

  describe('buildURL', () => {
    test('has no data and no paramsSerializer', () => {
      expect(buildURL('https://www.baidu.com')).toBe('https://www.baidu.com')
    })

    test('data is Date type', () => {
      let date = new Date()
      expect(buildURL('https://www.baidu.com', {
        date
      })).toBe('https://www.baidu.com?date=' + date.toISOString())
    })

    test('data is plain object type', () => {
      expect(buildURL('https://www.baidu.com', {
        foo: {
          bar: 123
        }
      })).toBe('https://www.baidu.com?foo=' + encodeURI('{"bar":123}'))
    })

    test('data has null or undefined key', () => {
      expect(buildURL('https://www.baidu.com', {
        foo: 123,
        bar: null,
        baz: undefined
      })).toBe('https://www.baidu.com?foo=123')
    })

    test('data should parse to "" ', () => {
      expect(buildURL('https://www.baidu.com', {
        foo: null
      })).toBe('https://www.baidu.com')
    })

    test('data is Array type', () => {
      let data = {
        foo: [123, 456]
      }
      expect(buildURL('https://www.baidu.com', data)).toBe('https://www.baidu.com?foo[]=123&foo[]=456')
    })

    test('url has hash', () => {
      expect(buildURL('https://www.baidu.com#xxx', {
        foo: 123
      })).toBe('https://www.baidu.com?foo=123')
    })

    test('url has no params', () => {
      expect(buildURL('https://www.baidu.com', {
        foo: 123
      })).toBe('https://www.baidu.com?foo=123')
    })

    test('url has params', () => {
      const url = 'https://www.baidu.com?foo=123'
      const data = {
        bar: 456,
        baz: 789
      }
      expect(buildURL(url, data)).toBe('https://www.baidu.com?foo=123&bar=456&baz=789')
    })

    test('data is URLSearchParams', () => {
      const url = 'https://www.baidu.com'
      const data = new URLSearchParams('foo=123')
      
      expect(buildURL(url, data)).toBe('https://www.baidu.com?foo=123')
    })

    test('has paramsSerializer', () => {
      const url = 'https://www.baidu.com'
      const data = {
        bar: 456
      }
      const paramsSerializer = jest.fn(() => {
        return 'foo=123'
      })
      expect(buildURL(url, data, paramsSerializer)).toBe('https://www.baidu.com?foo=123')
      expect(paramsSerializer).toHaveBeenCalled()
      expect(paramsSerializer).toHaveBeenLastCalledWith(data)
    })
  })
})