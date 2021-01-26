import { numeric, validation } from '@adapter/common'

const numberField = ['numberContainers']
const inMillisFields = ['weight', 'goodsValue', 'rate']
export const checkValues = values => {
  const newValues = validation.objectRemoveEmpty(values)
  for (let key in newValues) {
    const val = newValues[key]
    if (val) {
      if (numberField.includes(key)) {
        newValues[key] = numeric.toFloat(val)
      }
      if (inMillisFields.includes(key)) {
        newValues[key] = numeric.normNumb(val)
      }
    }
  }
  return newValues
}
