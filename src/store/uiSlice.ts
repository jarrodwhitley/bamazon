import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    isMobile: false,
    isLoading: true,
    showCart: false,
    showMobileMenu: false,
    showMobileSearch: false,
    modal: null,
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setIsMobile(state, action) {
            state.isMobile = action.payload
        },
        setIsLoading(state, action) {
            state.isLoading = action.payload
        },
        setShowCart(state, action) {
            state.showCart = action.payload
        },
        toggleCart(state) {
            state.showCart = !state.showCart
        },
        setShowMobileMenu(state, action) {
            state.showMobileMenu = action.payload
        },
        setShowMobileSearch(state, action) {
            state.showMobileSearch = action.payload
        },
        setModal(state, action) {
            state.modal = action.payload
        },
        clearModal(state) {
            console.log('clearing modal')
            state.modal = null
        },
    },
})

export const {setIsMobile, setIsLoading, setShowCart, toggleCart, setShowMobileMenu, setShowMobileSearch, setModal, clearModal} = uiSlice.actions
export default uiSlice.reducer
