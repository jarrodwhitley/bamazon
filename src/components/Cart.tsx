import React, {useMemo, useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {setShowCart, updateItem, removeItem, toggleCart} from '../store/cartSlice.ts'
import {Link} from 'react-router-dom'
import type RootState from '../types/Store.ts'
import type CartType from '../types/Cart.ts'
import type CartItem from '../types/CartItem.ts'

export default function Cart() {
    const cart: CartType = useSelector((state: RootState) => state.cart)
    const dispatch = useDispatch()
    const [showBam, setShowBam] = useState<boolean>(false)

    const handleRemoveFromCart = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
        dispatch(removeItem(id))
    }

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        dispatch(updateItem({id, quantity: parseInt(e.target.value)}))
    }

    const handleCheckout = () => {
        dispatch(setShowCart(false))
    }

    const totalSavings = useMemo(() => {
        return cart.items.reduce((acc: number, product: CartItem) => {
            return acc + (product.price * product.discountPercentage) / 100
        }, 0)
    }, [cart.items])

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (!event.target.closest('.cart') && !event.target.closest('.cart__container') && !event.target.closest('.mobile-cart-btn') && cart.showCart) {
                dispatch(setShowCart(false))
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [cart.showCart, dispatch])

    return (
        <div className="cart">
            <h2>Shopping Cart</h2>
            {cart.items.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <ul>
                    {cart.items.map((item: CartItem) => (
                        <li key={item.id}>
                            <h3>{item.name}</h3>
                            <p>Price: ${item.price}</p>
                            <p>Quantity: {item.purchaseQuantity}</p>
                            <button onClick={(e) => handleRemoveFromCart(e, item.id)}>Remove</button>
                            <input type="number" value={item.purchaseQuantity} onChange={(e) => handleQuantityChange(e, item.id)} />
                        </li>
                    ))}
                </ul>
            )}
            <button onClick={handleCheckout}>Checkout</button>
            <p>Total Savings: ${totalSavings.toFixed(2)}</p>
        </div>
    )
}
