import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isMobile: false,
    isLoading: true,
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setIsMobile(state, action) {
            state.isMobile = action.payload;
        },
        setIsLoading(state, action) {
            state.isLoading = action.payload;
        }
    }
});

export const { setIsMobile, setIsLoading } = uiSlice.actions;
export default uiSlice.reducer;