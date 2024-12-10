import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './store/cartSlice';
import productsReducer from './store/productsSlice';
import filteredProductsReducer from './store/filteredProductsSlice';
import selectedProductReducer from './store/selectedProductSlice';
import filtersReducer from './store/filtersSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        products: productsReducer,
        filteredProducts: filteredProductsReducer,
        selectedProduct: selectedProductReducer,
        filters: filtersReducer,
    }
});

export default store;