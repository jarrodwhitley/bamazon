import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './store/cartSlice.js';
import productsReducer from './store/productsSlice.js';
import selectedProductReducer from './store/selectedProductSlice.js';
import filtersReducer from './store/filtersSlice.js';
import uiReducer from "./store/uiSlice.js";

const localStorageMiddleware = (storeAPI) => (next) => (action) => {
    const result = next(action);
    
    // Save cart state to localStorage
    const state = storeAPI.getState();
    if (action.type.startsWith('cart/')) {
        localStorage.setItem('cart', JSON.stringify(state.cart));
    }
    
    return result;
};

const store = configureStore({
    reducer: {
        cart: cartReducer,
        products: productsReducer,
        selectedProduct: selectedProductReducer,
        filters: filtersReducer,
        ui: uiReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;