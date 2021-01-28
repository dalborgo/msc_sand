import { cDate, numeric } from '@adapter/common'
import { getTypeOfGood } from '@adapter/common/src/msc'
import { ToWords } from 'to-words'

export const generateInput = cert => {
  const toWords = new ToWords()
  const typeOfGoods = getTypeOfGood(cert.typeOfGoods)
  let from, to
  switch (cert.insuranceType) {
    case 'port-to-door':
      from = `${cert.countryPortLoading.value}\n${cert.portLoading.value} (${cert.portLoading.key})`
      to = `${cert.countryDeliveryPoint.value} - ${cert.cityDeliveryPoint}`
      break
    case 'port-to-port':
      from = `${cert.countryPortLoading.value}\n${cert.portLoading.value} (${cert.portLoading.key})`
      to = `${cert.countryPortDischarge.value}\n${cert.portDischarge.value} (${cert.portDischarge.key})`
      break
    case 'door-to-port':
      from = `${cert.countryCollectionPoint.value} - ${cert.cityCollectionPoint}`
      to = `${cert.countryPortDischarge.value}\n${cert.portDischarge.value} (${cert.portDischarge.key})`
      break
    default: //door-to-door
      from = `${cert.countryCollectionPoint.value} - ${cert.cityCollectionPoint}`
      to = `${cert.countryDeliveryPoint.value} - ${cert.cityDeliveryPoint}`
  }
  return {
    ...cert,
    bookingDate: cDate.mom(cert.bookingDate, null, 'DD/MM/YYYY'),
    from,
    goodsValue: numeric.printDecimal(cert.goodsValue / 1000),
    goodsWeight: numeric.printDecimal(cert.goodsWeight / 1000, 0),
    notReeferContainer: cert.reeferContainer ? '   ' : 'X',
    reeferContainer: cert.reeferContainer ? 'X' : '   ',
    to,
    today: cDate.mom(null, null, 'DD/MM/YYYY'),
    typeOfGoods: typeOfGoods.value || '',
    valueInLetters: toWords.convert(cert.goodsValue / 1000),
  }
}
