import create from 'zustand'
import immerMiddleware from './immerMiddleware'

const initialState = {
  certificateRows: [],
}

const useCertificateStore = create(immerMiddleware(set => ({
  ...initialState,
  reset: () => set(() => initialState),
  setCertificateRows: rows => set(state => {
    state.certificateRows = rows
  }),
})))

export default useCertificateStore
