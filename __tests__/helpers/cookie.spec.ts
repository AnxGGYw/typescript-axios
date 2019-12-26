import cookie from '../../src/helpers/cookie'

describe('helpers cookie: ', () => {
  test('cookie exist', () => {
    document.cookie = 'foo=123'
    expect(cookie.read('foo')).toBe('123')
  })

  test('cookie not exist', () => {
    document.cookie = 'foo=123'
    expect(cookie.read('bar')).toBeNull()
  })
})