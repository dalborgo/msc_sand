import create from 'zustand'
import immerMiddleware from './immerMiddleware'
import { getTypeOfGoods } from '@adapter/common/src/msc'

const insuranceTypes = [
  'door-to-door',
  'port-to-port',
  'door-to-port',
  'port-to-door',
]

const initialState = {
  typesOfGoods: getTypeOfGoods(),
  insuranceTypes,
  insuranceSelected: '',
}

const useNewBookingStore = create(immerMiddleware(set => ({
  ...initialState,
  reset: () => set(() => initialState),
  setInsuranceSelected: val => set(state => {
    state.insuranceSelected = val
  }),
})))

export default useNewBookingStore
