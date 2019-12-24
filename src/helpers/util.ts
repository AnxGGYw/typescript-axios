const objectToString = Object.prototype.toString

export const isNull = (value: any): value is null => {
  return value === null
}

export const isUndefined = (value: any): value is undefined => {
  return typeof value === 'undefined'
}

export const isDate = (value: any): value is Date => {
  return objectToString.call(value) === '[object Date]'
}

export const isPlainObject = (value: any): value is Object => {
  return !isNull(value) && objectToString.call(value) === '[object Object]'
}

export const extend = <T, U>(to: T, from: U): T & U => {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

export const deepMerge = (...rests: any[]): any => {
  const result = Object.create(null)

  rests.forEach(mergeItem => {
    if (mergeItem) {
      Object.keys(mergeItem).forEach(key => {
        const val = mergeItem[key]
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge(result[key])
          }
        } else {
          result[key] = val
        }
      })
    }
  })

  return result
}
