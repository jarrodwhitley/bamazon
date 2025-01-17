import React from 'react'
import {useMemo, useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import {setCart, updateItem, removeItem, clearCart} from '../store/cartSlice'
import Boombam from '../assets/images/bamazon_logo_boombam.png'
import ProductCard from '../components/ProductCard.jsx'
import BamazonAd from '../assets/images/bamazon_ad.png'

export default function Checkout() {
    const dispatch = useDispatch()
    const isMobile = useSelector((state) => state.ui.isMobile)
    const cart = useSelector((state) => state.cart)
    const navigate = useNavigate()
    const [showBam, setShowBam] = useState(false)
    const products = useSelector((state) => state.products)
    const categories = products.reduce((acc, product) => {
        const categorySet = new Set(acc.map((item) => item.category))
        if (!categorySet.has(product.category)) {
            acc.push(product)
        }
        return acc
    }, [])
    const shippingCost = 7.99
    const subTotal = useMemo(() => {
        return cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)
    }, [cart.items])
    const total = useMemo(() => {
        return (parseFloat(subTotal) + shippingCost).toFixed(2)
    }, [subTotal])
    const checkAndUpdateQuantities = async (cartItems) => {
        const response = await fetch('/api/check-quantities', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ items: cartItems }),
        });

        if (!response.ok) {
            throw new Error('Failed to check quantities');
        }

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }

        data.items.forEach((item) => {
            dispatch(updateItem({ id: item.id, quantity: item.quantity }));
        });
    };
    const handleCheckout = async () => {
        try {
            const response = await fetch('/api/checkout', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    items: cart.items.map(item => ({
                        id: item.id,
                        quantity: item.quantity,
                        sku: item.sku,
                        price: item.price,
                        warrantyInformation: item.warrantyInformation,
                        returnPolicy: item.returnPolicy
                    }))
                }),
            });
    
            if (!response.ok) {
                throw new Error('Checkout failed');
            }
    
            const data = await response.json();
            navigate('/order-complete')
        } catch (error) {
            console.error('Error during checkout:', error);
            alert('Checkout failed: ' + error.message);
        }
    };
    const handleQuantityChange = (e, id) => {
        dispatch(updateItem({ id, quantity: parseInt(e.target.value) }))
    }
    const handleRemoveFromCart = (e, id) => {
        dispatch(removeItem(id))
    }
    
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
    return (
        <>
            {cart.items.length > 0 && (
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
                                <div className={'checkout__sidebar__checkout-btn'} onClick={handleCheckout}>Submit Payment</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {cart.items.length === 0 && (
                <>
                    <div className={'checkout__empty-page'}>
                        <span className={'checkout__empty__title'}>Your cart is empty 😅</span>
                        <span className={'checkout__empty__subtitle'}>Come back after you add a few things!</span>
                        <div className="checkout__categories">
                            <div className={'checkout__categories__grid-outer'}>
                                <h2 className={'checkout__categories__title'}>Categories</h2>
                                <div className={'checkout__categories__grid-inner'}>
                                    {categories.map((product) => (
                                        <ProductCard key={product.id} product={product} size="lg" categoryCard={true} showDiscount={true} showLowStock={true} />
                                    ))}
                                </div>
                                <div className={'checkout__categories-ad'}>
                                    <img src={BamazonAd} alt="Bamazon Ad" className="w-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    
    )
}