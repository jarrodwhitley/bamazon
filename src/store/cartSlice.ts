import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import type Cart from '../types/Cart'
import CartItem from '../types/CartItem'

const storedCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart') as string) : null
const initialCartState: Cart = storedCart ? storedCart.items : []

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        setCart(state: Cart, action: PayloadAction<CartItem[]>) {
            state = action.payload
        },
        clearCart(state: Cart) {
            state = []
        },
        addItem(state: Cart, action: PayloadAction<CartItem>) {
            const {id} = action.payload
            const item = state.find((item: CartItem) => item.id === id)
            if (item) {
                item.quantity += 1
            } else {
                state.push({...action.payload, quantity: 1})
            }
        },
        updateItem(state: Cart, action: PayloadAction<{id: number; quantity: number}>) {
            const {id, quantity} = action.payload
            const item = state.find((item: CartItem) => item.id === id)
            if (item) {
                item.quantity = quantity
            }
        },
        removeItem(state: Cart, action: PayloadAction<number>) {
            console.log('removing item')
            state = state.filter((item: CartItem) => item.id !== action.payload)
        },
    },
})

export const {setCart, clearCart, addItem, updateItem, removeItem} = cartSlice.actions
export default cartSlice.reducer
