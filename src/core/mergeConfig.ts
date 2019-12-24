import { RequestConfig } from '../types'
import { isPlainObject, deepMerge } from '../helpers/util'

const strats = Object.create(null)

const stratDefault = (valOne: any, valTwo: any): any => {
  return typeof valTwo !== 'undefined' ? valTwo : valOne
}
const stratfromValTwo = (valOne: any, valTwo: any): any => {
  if (typeof valTwo !== 'undefined') {
    return valTwo
  }
}
const stratDeepMerge = (valOne: any, valTwo: any): any => {
  if (isPlainObject(valTwo)) {
    return deepMerge(valOne, valTwo)
  } else if (typeof valTwo !== 'undefined') {
    return valTwo
  } else if (isPlainObject(valOne)) {
    return deepMerge(valOne)
  } else if (typeof valOne !== 'undefined') {
    return valOne
  }
}

const stratKeysFromValTwo = ['url', 'data', 'params']

const stratKeysDeepMerge = ['headers']

stratKeysFromValTwo.forEach(stratKeyVal => {
  strats[stratKeyVal] = stratfromValTwo
})

stratKeysDeepMerge.forEach(stratKeyVal => {
  strats[stratKeyVal] = stratDeepMerge
})

export default function mergeConfig(
  configOne: RequestConfig,
  configTwo: RequestConfig = {}
): RequestConfig {
  const config = Object.create(null)

  for (let key in configTwo) {
    merge(key)
  }
  for (let key in configOne) {
    if (!configTwo[key]) {
      merge(key)
    }
  }
  function merge(key: string): void {
    const strat = strats[key] || stratDefault
    config[key] = strat(configOne[key], configTwo[key])
  }

  return config
}
