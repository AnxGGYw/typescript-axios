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

export const isObject = (value: any): value is Object => {
  return !isNull(value) && objectToString.call(value) === '[object Object]'
}
