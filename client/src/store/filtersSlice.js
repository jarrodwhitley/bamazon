import { createSlice, createSelector } from '@reduxjs/toolkit';

export const initialFiltersState = { searchString: '', category: '', brands: [], price: '' };

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
            return { searchString: '', category: '', brands: [], price: '' };
        }
    }
});

export const { setFilters, updateFilters, clearFilters } = filtersSlice.actions;
export default filtersSlice.reducer;

export const filtersActive = createSelector(
    (state) => state.filters,
    () => initialFiltersState,
    (filters, initialFilters) => JSON.stringify(filters) !== JSON.stringify(initialFilters)
);