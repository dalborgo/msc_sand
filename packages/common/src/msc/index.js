import reduce from 'lodash/reduce'
import sortBy from 'lodash/sortBy'

export const getTypeOfGoods = () => {
  return require('./files/typeOfGoods.json')
}

export const getTypeOfGood = code => {
  const types = require('./files/typeOfGoods.json')
  return types[code]
}

export const getCountryList = () => {
  const ports = require('./files/ports.json')
  return sortBy(reduce(ports, (prev, _, key) => {
    prev.push({ value: key })
    return prev
  }, []), 'value')
}

export const getPortList = country => {
  const ports = require('./files/ports.json')
  return sortBy(ports[country], 'value')
}
