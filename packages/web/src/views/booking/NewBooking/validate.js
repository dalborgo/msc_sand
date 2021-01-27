import { numeric, validation } from '@adapter/common'
import moment from 'moment'

const numberField = ['numberContainers']
const inMillisFields = ['weight', 'goodsValue', 'rate']
const dateFields = ['bookingDate']
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
      if (dateFields.includes(key)) {
        if(!val.isValid()){throw Error('booking_error_bookingDate')}
        newValues[key] = moment(val).format('YYYY-MM-DD')
      }
    }
  }
  return newValues
}
