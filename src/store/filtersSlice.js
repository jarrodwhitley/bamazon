import { createSlice } from '@reduxjs/toolkit';

const storedFilters = JSON.parse(localStorage.getItem('filters'));
const initialFiltersState = storedFilters || { searchString: '', categories: [], brands: [], price: '' };

const filtersSlice = createSlice({
    name: 'filters',
    initialState: initialFiltersState,
    reducers: {
        setFilters(state, action) {
            return action.payload;
        },
        updateFilters(state, action) {
            return { ...state, ...action.payload };
        },
        clearFilters() {
            return { searchString: '', categories: [], brands: [], price: '' };
        },
        filtersActive(state) {
            return Object.values(state).some(value => value !== '' || []);
        }
    }
});

export const { setFilters, updateFilters, clearFilters, filtersActive } = filtersSlice.actions;
export default filtersSlice.reducer;