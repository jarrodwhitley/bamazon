import {createSlice, createSelector} from '@reduxjs/toolkit'
import {useSelector} from 'react-redux'

const storedProducts = JSON.parse(localStorage.getItem('products'))
const initialProductsState = storedProducts || []

const productsSlice = createSlice({
    name: 'products',
    initialState: initialProductsState,
    reducers: {
        setProducts(state, action) {
            return action.payload
        },
        addProduct(state, action) {
            state.push(action.payload)
        },
        removeProduct(state, action) {
            return state.filter((product) => product.id !== action.payload)
        },
        setSelectedProduct(state, action) {
            return action.payload || {}
        },
        setFilteredProducts(state, action) {
            return state.filter((product) => product[action.payload.key] === action.payload.value)
        },
    },
})

export const {setProducts, addProduct, removeProduct, setSelectedProduct, setFilteredProducts} = productsSlice.actions
export default productsSlice.reducer

export const filteredProducts = createSelector(
    (state) => state.products,
    (state) => state.filters,
    (products, filters) => {
        if (filters.searchString && typeof filters.searchString === 'string' && filters.searchString.length > 3) {
            products = products.filter((product) => product.title.toLowerCase().includes(filters.searchString.toLowerCase()))
        }
        if (filters.categories.length > 0) {
            products = products.filter((product) => filters.categories.includes(product.category))
        }
        if (filters.brands.length > 0) {
            products = products.filter((product) => filters.brands.includes(product.brand))
        }
        if (filters.price) {
            const [min, max] = filters.price.split('_')
            products = products.filter((product) => product.price >= min && product.price <= max)
        }
        return products
    }
)
