import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import CartItem from '../types/CartItem'

interface CartState {
    items: CartItem[]
    showCart: boolean
}

const storedCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart') as string) : null
const initialCartState: CartState = storedCart ? {showCart: false, items: storedCart.items} : {showCart: false, items: []}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        setCart(state: CartState, action: PayloadAction<CartItem[]>) {
            state.items = action.payload
        },
        clearCart(state: CartState) {
            state.items = []
            state.showCart = false
        },
        addItem(state: CartState, action: PayloadAction<CartItem>) {
            const {id} = action.payload
            const item = state.items.find((item: CartItem) => item.id === id)
            if (item) {
                item.purchaseQuantity += 1
            } else {
                state.items.push({...action.payload, purchaseQuantity: 1})
            }
        },
        updateItem(state: CartState, action: PayloadAction<{id: number; quantity: number}>) {
            const {id, quantity} = action.payload
            const item = state.items.find((item: CartItem) => item.id === id)
            if (item) {
                item.purchaseQuantity = quantity
            }
        },
        removeItem(state: CartState, action: PayloadAction<number>) {
            state.items = state.items.filter((item: CartItem) => item.id !== action.payload)
        },
        toggleCart(state: CartState) {
            state.showCart = !state.showCart
        },
        setShowCart(state: CartState, action: PayloadAction<boolean>) {
            state.showCart = action.payload
        },
    },
})

export const {setCart, clearCart, addItem, updateItem, removeItem, toggleCart, setShowCart} = cartSlice.actions
export default cartSlice.reducer
