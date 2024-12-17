import React from 'react'
import {useMemo, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {setCart, updateItem, removeItem, clearCart} from '../store/cartSlice'
import Boombam from '../assets/images/bamazon_logo_boombam.png'

export default function Checkout() {
    const dispatch = useDispatch()
    const isMobile = useSelector((state) => state.ui.isMobile)
    const cart = useSelector((state) => state.cart)
    const navigate = useNavigate()
    const [showBam, setShowBam] = useState(false)
    const shippingCost = 7.99
    const subTotal = useMemo(() => {
        return cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)
    }, [cart.items])
    const total = useMemo(() => {
        return (parseFloat(subTotal) + shippingCost).toFixed(2)
    }, [subTotal])
    const handleQuantityChange = (e, id) => {
        dispatch(updateItem({ id, quantity: parseInt(e.target.value) }))
    }
    const handleRemoveFromCart = (e, id) => {
        dispatch(removeItem(id))
    }
    const handleCheckoutClick = () => {
        dispatch(clearCart())
        setShowBam(true)
        setTimeout(() => {
            setShowBam(false)
            navigate('/')
        }, 1000)
    }
    
    // Redirect to home if cart is empty
    if (cart.items.length < 1) {
        navigate('/')
    }
    
    return (
        <div className={'checkout__page'}>
            <div className={'checkout__page-grid'}>
                <div className={'checkout__info'}>
                    <h2 className={'text-xl font-semibold'}>Deliver to:</h2>
                    <div>John Doe</div>
                    <div>123 Main St</div>
                    <div>Anytown, USA 12345</div>
                </div>
                <div className={'checkout__items'}>
                    {cart.items.map((product, index) => (
                        <div key={index} className={'checkout-cart__item'}>
                            <figure className={'checkout-cart__item__image-container'}>
                                <img src={product.images[0]} alt={product.title} className={'checkout-cart__item__image'} />
                            </figure>
                            <div className={'checkout-cart__item__details'}>
                                <div className={'checkout-cart__item__title-price'}>
                                    <span className={'checkout-cart__item__details__title'}>{product.title}</span>
                                    <span className={'checkout-cart__item__details__price'}>${product.price.toFixed(2)}</span>
                                </div>
                                <div className={'checkout-cart__item__quantity'}>
                                    <div className={'cart__item__quantity__selector'}>
                                        <select className={'font-base bg-gray-100 rounded'} value={product.quantity || ''} onChange={(e) => handleQuantityChange(e, product.id)}>
                                            {[...Array(10).keys()].map((i) => (
                                                <option key={i + 1} value={i + 1}>
                                                    {i + 1}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <i className={'checkout-cart__item__remove-btn fa-solid fa-trash-alt'} onClick={(e) => handleRemoveFromCart(e, product.id)}></i>
                                </div>
                            </div>
                        </div>
                    ))}
                    {showBam &&
                        <img src={Boombam} alt={'Bamazon logo'} className={'checkout__bam animate__animated animate__bounceIn animate__faster'} />}
                </div>
                <div className={'checkout__sidebar'}>
                    <div className={'checkout__sidebar__subtotal checkout__sidebar__row'}>
                        <div className={'checkout__sidebar__label'}>Total:</div>
                        <div className={'checkout__sidebar__value'}>{`$${subTotal}`}</div>
                    </div>
                    <div className={'checkout__sidebar__shipping checkout__sidebar__row'}>
                        <div className={'checkout__sidebar__label'}>Shipping:</div>
                        <div className={'checkout__sidebar__value'}>{`$${shippingCost}`}</div>
                    </div>
                    <div className={'checkout__sidebar__total checkout__sidebar__row'}>
                        <div className={'checkout__sidebar__label'}>Total:</div>
                        <div className={'checkout__sidebar__value'}>{`$${total}`}</div>
                    </div>
                    <div className={'checkout__sidebar__button-container checkout__sidebar__row'}>
                        <div className={'checkout__sidebar__checkout-btn'} onClick={handleCheckoutClick}>Submit Payment</div>
                    </div>
                </div>
            </div>
        </div>
    )
}