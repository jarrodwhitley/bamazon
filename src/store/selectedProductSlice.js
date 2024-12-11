import { createSlice } from '@reduxjs/toolkit';

const selectedProductSlice = createSlice({
    name: 'selectedProduct',
    initialState: {},
    reducers: {
        setSelectedProduct(state, action) {
            return action.payload;
        },
        clearSelectedProduct() {
            return {};
        }
    }
})

export const { setSelectedProduct, clearSelectedProduct } = selectedProductSlice.actions;
export default selectedProductSlice.reducer;