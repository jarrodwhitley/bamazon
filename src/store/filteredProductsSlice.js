import { createSlice } from '@reduxjs/toolkit';

const filteredProductsSlice = createSlice({
    name: 'filteredProducts',
    initialState: [],
    reducers: {
        setFilteredProducts(state, action) {
            return action.payload;
        }
    }
})

export const { setFilteredProducts } = filteredProductsSlice.actions;
export default filteredProductsSlice.reducer;