import { createSlice } from '@reduxjs/toolkit';

const storedProducts = JSON.parse(localStorage.getItem('products'));
const initialProductsState = storedProducts || [];

const productsSlice = createSlice({
    name: 'products',
    initialState: initialProductsState,
    reducers: {
        setProducts(state, action) {
            return action.payload;
        },
        addProduct(state, action) {
            state.push(action.payload);
        },
        removeProduct(state, action) {
            return state.filter(product => product.id !== action.payload);
        },
        setSelectedProduct(state, action) {
            return action.payload || {};
        },
        setFilteredProducts(state, action) {
            return state.filter(product => product[action.payload.key] === action.payload.value);
        }
    }
})

export const { setProducts, addProduct, removeProduct, setSelectedProduct, setFilteredProducts } = productsSlice.actions;
export default productsSlice.reducer;

