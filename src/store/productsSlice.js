import { createSlice, createSelector } from '@reduxjs/toolkit';
import { useSelector} from "react-redux";

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

export const filteredProducts = createSelector(
    (state) => state.products,
    (state) => state.filters,
    (products, filters) => {
        if (filters.searchString && filters.searchString.length > 3) {
            products = products.filter(product => product.name.toLowerCase().includes(filters.searchString.toLowerCase()));
        }
        if (filters.categories.length > 0) {
            products = products.filter(product => filters.categories.includes(product.category));
        }
        if (filters.brands.length > 0) {
            products = products.filter(product => filters.brands.includes(product.brand));
        }
        if (filters.price) {
            products = products.filter(product => product.price <= parseInt(filters.price));
        }
        return products;
    }
);



