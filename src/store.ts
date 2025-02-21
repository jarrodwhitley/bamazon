import {configureStore, EnhancedStore} from '@reduxjs/toolkit'
import cartReducer from './store/cartSlice.ts'
import productsReducer from './store/productsSlice.ts'
import selectedProductReducer from './store/selectedProductSlice.ts'
import filtersReducer from './store/filtersSlice.ts'
import uiReducer from './store/uiSlice.ts'
import RootState from './types/Store.ts'

const localStorageMiddleware = (storeAPI: any) => (next: any) => (action: any) => {
    const result = next(action)

    // Save cart state to localStorage
    const state = storeAPI.getState()
    if (action.type.startsWith('cart/')) {
        localStorage.setItem('cart', JSON.stringify(state.cart))
    }
    return result
}

const store: EnhancedStore = configureStore({
    reducer: {
        cart: cartReducer,
        products: productsReducer,
        selectedProduct: selectedProductReducer,
        filters: filtersReducer,
        ui: uiReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
})

export default store
