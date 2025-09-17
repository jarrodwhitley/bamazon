import React from 'react'
import {useMemo, useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {Elements} from '@stripe/react-stripe-js'
import {setCart, updateItem, removeItem, clearCart} from '../store/cartSlice'
import Boombam from '../assets/images/bamazon_logo_boombam.png'
import ProductCard from '../components/ProductCard.jsx'
import BamazonAd from '../assets/images/bamazon_ad.png'
import StripeCheckoutForm from '../components/StripeCheckoutForm.jsx'
import stripePromise from '../utils/stripe.js'

export default function Checkout() {
    const dispatch = useDispatch()
    const isMobile = useSelector((state) => state.ui.isMobile)
    const cart = useSelector((state) => state.cart)
    const navigate = useNavigate()
    const [showBam, setShowBam] = useState(false)
    const [showStripeForm, setShowStripeForm] = useState(false)
    const [paymentError, setPaymentError] = useState('')
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
    const handleQuantityChange = (e, id) => {
        dispatch(updateItem({id, quantity: parseInt(e.target.value)}))
    }
    const handleRemoveFromCart = (e, id) => {
        dispatch(removeItem(id))
    }
    const handleCheckoutClick = () => {
        setShowStripeForm(true)
        setPaymentError('')
    }

    const handlePaymentSuccess = () => {
        setShowBam(true)
        setShowStripeForm(false)
        setTimeout(() => {
            setShowBam(false)
            dispatch(clearCart())
            navigate('/payment-success')
        }, 2000)
    }

    const handlePaymentError = (error) => {
        setPaymentError(error)
        setShowStripeForm(false)
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            {cart.items.length > 0 && (
                <div className={'checkout__page'}>
                    <div className={'checkout__page-grid'}>
                        {showBam && <img src={Boombam} alt={'Bamazon logo'} className={'checkout__bam row-span-full col-span-full animate__animated animate__bounceIn animate__faster'} />}
                        <div className={'text-3xl font-semibold mt-6'}>Your Cart</div>
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
                                                <label htmlFor={`checkout-quantity-${product.id}`} className="sr-only">
                                                    Quantity for {product.title}
                                                </label>
                                                <select id={`checkout-quantity-${product.id}`} className={'font-base bg-gray-100 rounded select-normalized'} value={product.quantity || ''} onChange={(e) => handleQuantityChange(e, product.id)} aria-label={`Change quantity for ${product.title}`}>
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
                        </div>
                        <div className={'checkout__summary'}>
                            <div className={'checkout__summary__subtotal checkout__summary__row'}>
                                <div className={'checkout__summary__label'}>Total:</div>
                                <div className={'checkout__summary__value'}>{`$${subTotal}`}</div>
                            </div>
                            <div className={'checkout__summary__shipping checkout__summary__row'}>
                                <div className={'checkout__summary__label'}>Shipping:</div>
                                <div className={'checkout__summary__value'}>{`$${shippingCost}`}</div>
                            </div>
                            <div className={'checkout__summary__total checkout__summary__row'}>
                                <div className={'checkout__summary__label'}>Total:</div>
                                <div className={'checkout__summary__value'}>{`$${total}`}</div>
                            </div>
                        </div>
                        <div className={'checkout__sidebar'}>
                            <div className={'checkout__stripe-section'}>
                                {paymentError && <div className="my-3 p-3 bg-red-100 border border-red-400 text-red-700 rounded">Payment failed: {paymentError}</div>}

                                <Elements stripe={stripePromise}>
                                    <StripeCheckoutForm total={total} onSuccess={handlePaymentSuccess} onError={handlePaymentError} />
                                </Elements>
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
