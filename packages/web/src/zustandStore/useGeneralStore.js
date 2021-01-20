import create from 'zustand'
import immerMiddleware from './immerMiddleware'

const initialState = {
  loading: false,
  locales: [],
  priority: 0,
}

const useGeneralStore = create(immerMiddleware((set, get) => ({
  ...initialState,
  setLoading: val => set(state => {
    state.loading = val
  }),
  reset: () => set(() => initialState),
})))

export default useGeneralStore
