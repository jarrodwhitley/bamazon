import { createSlice } from '@reduxjs/toolkit'

const storedCart = JSON.parse(localStorage.getItem('cart'))
const initialCartState = storedCart
    ? { showCart: false, items: storedCart.items }
    : { showCart: false, items: [] }

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        setCart(state, action) {
            return action.payload
        },
        clearCart() {
            return { showCart: false, items: [] }
        },
        addItem(state, action) {
            const { id } = action.payload
            const item = state.items.find((item) => item.id === id)
            if (item) {
                item.quantity += 1
            } else {
                state.items.push({ ...action.payload, quantity: 1 })
            }
        },
        updateItem(state, action) {
            const { id, quantity } = action.payload
            const item = state.items.find((item) => item.id === id)
            if (item) {
                item.quantity = quantity
            }
        },
        removeItem(state, action) {
            state.items = state.items.filter(
                (item) => item.id !== action.payload
            )
        },
        toggleCart(state) {
            state.showCart = !state.showCart
        },
        setShowCart(state, action) {
            state.showCart = action.payload
        }
    },
})

export const {
    setCart,
    clearCart,
    addItem,
    updateItem,
    removeItem,
    toggleCart,
    setShowCart,
} = cartSlice.actions
export default cartSlice.reducer
