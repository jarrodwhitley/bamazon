import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isMobile: false,
    isLoading: true,
    showMobileMenu: false,
    showMobileSearch: false,
    modal: null
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
        },
        setShowMobileSearch(state, action) {
            state.showMobileSearch = action.payload;
        },
        setModal(state, action) {
            state.modal = action.payload;
        },
        clearModal(state) {
            console.log('clearing modal')
            state.modal = null;
        }
    }
});

export const { setIsMobile, setIsLoading, setShowMobileMenu, setShowMobileSearch, setModal, clearModal } = uiSlice.actions;
export default uiSlice.reducer;