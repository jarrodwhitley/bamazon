import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Boombam from '../assets/images/bamazon_logo_dark_v1.1.png'

export default function PaymentSuccess() {
    const navigate = useNavigate()
    const cart = useSelector((state) => state.cart)

    useEffect(() => {
        // Redirect to home after 5 seconds
        const timer = setTimeout(() => {
            navigate('/')
        }, 5000)

        return () => clearTimeout(timer)
    }, [navigate])

    const handleContinueShopping = () => {
        navigate('/')
    }

    return (
        <div className="payment-success">
            <div className="payment-success__container">
                <div className="payment-success__content">
                    <img src={Boombam} alt="Bamazon logo" className="payment-success__logo w-full animate__animated animate__bounceIn" />

                    <div className="payment-success__message">
                        <h1 className="payment-success__title">Payment Successful!</h1>
                        <p className="payment-success__subtitle">Thank you for your order! Your payment has been processed successfully.</p>
                    </div>

                    <div className="payment-success__details">
                        <div className="payment-success__order-info">
                            <h3>Order Summary</h3>
                            <p>Order Number: #BAM-{Date.now().toString().slice(-6)}</p>
                            <p>Email confirmation will be sent to: john.doe@example.com</p>
                            <p>Estimated delivery: 3-5 business days</p>
                        </div>
                    </div>

                    <div className="payment-success__actions">
                        <button onClick={handleContinueShopping} className="payment-success__continue-btn">
                            Continue Shopping
                        </button>
                    </div>

                    <div className="payment-success__redirect-notice">
                        <p>You will be automatically redirected to the homepage in 5 seconds...</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
