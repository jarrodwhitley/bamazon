import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {useStripe, useElements, CardElement, CardNumberElement, CardExpiryElement, CardCvcElement} from '@stripe/react-stripe-js'
import {TEST_CARDS} from '../utils/stripe'

const cardElementOptions = {
    style: {
        base: {
            fontSize: '16px',
            color: '#424770',
            '::placeholder': {
                color: '#aab7c4',
            },
            padding: '12px',
        },
        invalid: {
            color: '#9e2146',
        },
    },
    hidePostalCode: true,
}

export default function StripeCheckoutForm({total, onSuccess, onError}) {
    const stripe = useStripe()
    const elements = useElements()
    const [processing, setProcessing] = useState(false)
    const [selectedTestCard, setSelectedTestCard] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!stripe || !elements) {
            return
        }

        setProcessing(true)

        const cardElement = elements.getElement(CardElement)

        const {error: paymentMethodError, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: {
                name: 'John Doe',
                address: {
                    line1: '123 Main St',
                    city: 'Anytown',
                    state: 'USA',
                    postal_code: '12345',
                },
            },
        })

        if (paymentMethodError) {
            console.error('Payment method creation failed:', paymentMethodError)
            onError(paymentMethodError.message)
            setProcessing(false)
            return
        }

        setTimeout(() => {
            if (paymentMethod.card.last4 === '0002') {
                // Generic decline
                onError('Your card was declined.')
            } else if (paymentMethod.card.last4 === '9995') {
                // Insufficient funds
                onError('Your card has insufficient funds.')
            } else if (paymentMethod.card.last4 === '0069') {
                // Expired card
                onError('Your card has expired.')
            } else if (paymentMethod.card.last4 === '0127') {
                // Incorrect CVC
                onError("Your card's security code is incorrect.")
            } else {
                // Successful payment for other cards
                console.log('Payment succeeded:', paymentMethod)
                onSuccess()
            }
            setProcessing(false)
        }, 1500) // Simulate processing time
    }

    const fillTestCard = (cardNumber) => {
        setSelectedTestCard(cardNumber)
    }

    return (
        <div className="stripe-checkout-form">
            <div className="test-cards-section mb-6">
                <h3 className="text-lg font-semibold mb-3">Test Cards (For Development)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div className="test-card-item">
                        <span className="font-medium">Visa:</span>
                        <span className="font-mono ml-2 text-blue-600 cursor-pointer" onClick={() => fillTestCard(TEST_CARDS.VISA)}>
                            {TEST_CARDS.VISA}
                        </span>
                    </div>
                    <div className="test-card-item">
                        <span className="font-medium">Mastercard:</span>
                        <span className="font-mono ml-2 text-blue-600 cursor-pointer" onClick={() => fillTestCard(TEST_CARDS.MASTERCARD)}>
                            {TEST_CARDS.MASTERCARD}
                        </span>
                    </div>
                    <div className="test-card-item">
                        <span className="font-medium">Amex:</span>
                        <span className="font-mono ml-2 text-blue-600 cursor-pointer" onClick={() => fillTestCard(TEST_CARDS.AMERICAN_EXPRESS)}>
                            {TEST_CARDS.AMERICAN_EXPRESS}
                        </span>
                    </div>
                    <div className="test-card-item">
                        <span className="font-medium">Declined:</span>
                        <span className="font-mono ml-2 text-red-600 cursor-pointer" onClick={() => fillTestCard(TEST_CARDS.DECLINED_CARD)}>
                            {TEST_CARDS.DECLINED_CARD}
                        </span>
                    </div>
                </div>
                <p className="text-xs text-gray-600 mt-2">Click on any card number to copy it. Use any future date for expiry and any 3-4 digit CVC.</p>
            </div>

            <form onSubmit={handleSubmit} className="stripe-form">
                <div className="customer-info mb-6">
                    <h3 className="text-lg font-semibold mb-3">Billing Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-field">
                            <label className="block text-sm font-medium mb-1">Full Name</label>
                            <input type="text" value="John Doe" readOnly className="w-full p-3 border border-gray-300 rounded bg-gray-50 cursor-not-allowed" />
                        </div>
                        <div className="form-field">
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <input type="email" value="john.doe@example.com" readOnly className="w-full p-3 border border-gray-300 rounded bg-gray-50 cursor-not-allowed" />
                        </div>
                        <div className="form-field md:col-span-2">
                            <label className="block text-sm font-medium mb-1">Address</label>
                            <input type="text" value="123 Main St, Anytown, USA 12345" readOnly className="w-full p-3 border border-gray-300 rounded bg-gray-50 cursor-not-allowed" />
                        </div>
                    </div>
                </div>

                <div className="payment-info">
                    <h3 className="text-lg font-semibold mb-3">Payment Information</h3>
                    <div className="card-element-container">
                        <label className="block text-sm font-medium mb-2">Card Details</label>
                        <div className="card-element p-3 border border-gray-300 rounded focus-within:border-blue-500">
                            <CardElement options={cardElementOptions} />
                        </div>
                    </div>
                </div>

                <div className="order-summary mt-6 p-4 bg-gray-50 rounded">
                    <div className="flex justify-between items-center text-lg font-semibold">
                        <span>Total:</span>
                        <span>${total}</span>
                    </div>
                </div>

                <button type="submit" aria-disabled={!stripe || processing} className={`w-full mt-6 py-3 px-4 rounded font-semibold text-white ${processing ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'}`}>
                    {processing ? 'Processing...' : `Pay $${total}`}
                </button>
            </form>
        </div>
    )
}

StripeCheckoutForm.propTypes = {
    total: PropTypes.string.isRequired,
    onSuccess: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
}
