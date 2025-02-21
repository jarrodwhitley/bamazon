import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import Product from '../types/Product'

type SelectedProductState = Product | {}

const initialState: SelectedProductState = {}

const selectedProductSlice = createSlice({
    name: 'selectedProduct',
    initialState,
    reducers: {
        setSelectedProduct(state: SelectedProductState, action: PayloadAction<Product>) {
            return action.payload
        },
        clearSelectedProduct(state: SelectedProductState) {
            return initialState
        },
    },
})

export const {setSelectedProduct, clearSelectedProduct} = selectedProductSlice.actions
export default selectedProductSlice.reducer
