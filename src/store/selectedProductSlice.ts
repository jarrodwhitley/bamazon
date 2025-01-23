import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import Product from '../types/Product'

interface SelectedProductState {
    product: Product | null
}

const initialState: SelectedProductState = {
    product: null,
}

const selectedProductSlice = createSlice({
    name: 'selectedProduct',
    initialState,
    reducers: {
        setSelectedProduct(state: SelectedProductState, action: PayloadAction<Product>) {
            state.product = action.payload
        },
        clearSelectedProduct(state: SelectedProductState) {
            state.product = null
        },
    },
})

export const {setSelectedProduct, clearSelectedProduct} = selectedProductSlice.actions
export default selectedProductSlice.reducer
