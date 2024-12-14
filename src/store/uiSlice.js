import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isMobile: false,
    isLoading: true,
    showMobileMenu: false,
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
        },
        setShowMobileMenu(state, action) {
            state.showMobileMenu = action.payload;
        }
    }
});

export const { setIsMobile, setIsLoading, setShowMobileMenu } = uiSlice.actions;
export default uiSlice.reducer;