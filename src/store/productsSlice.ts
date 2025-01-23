import {createSlice, createSelector} from '@reduxjs/toolkit'
import {useSelector} from 'react-redux'
import Product from '../types/Product.ts'
import Filters from '../types/Filters.ts'
import RootState from '../types/Store.ts'

const storedProducts = JSON.parse(localStorage.getItem('products') as string)
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
            return state.filter((product: Product) => product.id !== action.payload)
        },
        setSelectedProduct(state, action) {
            return action.payload || {}
        },
        setFilteredProducts(state, action) {
            const {key, value} = action.payload as {key: keyof Product; value: any}
            return state.filter((product: Product) => product[key] === value)
        },
    },
})

export const {setProducts, addProduct, removeProduct, setSelectedProduct, setFilteredProducts} = productsSlice.actions
export default productsSlice.reducer

export const filteredProducts = createSelector(
    (state: RootState) => state.products,
    (state: RootState) => state.filters,
    (products: Product[], filters: Filters) => {
        if (filters.searchString && typeof filters.searchString === 'string' && filters.searchString.length > 3) {
            if (filters.searchString && typeof filters.searchString === 'string' && filters.searchString.length > 3) {
                products = products.filter((product: Product) => filters.searchString && product.title.toLowerCase().includes(filters.searchString.toLowerCase()))
            }
        }
        if (filters.category) {
            products = products.filter((product: Product) => filters.category === product.category)
        }
        if (filters.brands.length > 0) {
            products = products.filter((product: Product) => filters.brands.includes(product.brand))
        }
        if (filters.price) {
            const [min, max] = filters.price.split('_').map(Number)
            products = products.filter((product: Product) => product.price >= min && product.price <= max)
        }
        return products
    }
)

export const productsLoaded = createSelector(
    (state) => state.products,
    (products) => products.length > 0
)
