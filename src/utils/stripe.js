import {loadStripe} from '@stripe/stripe-js'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_KEY || 'pk_test_51QQFArLOwLWNjqkI0KrBFGwJXyUdtP9XRxtMrBm5bHdnFhAKhDYPDLDZFrfhyp7HA3X0rE2vqhH2pGE5VfkN5j1e00nh7IpZaN')

export default stripePromise

// Test card numbers for Stripe testing
export const TEST_CARDS = {
    VISA: '4242424242424242',
    VISA_DEBIT: '4000056655665556',
    MASTERCARD: '5555555555554444',
    AMERICAN_EXPRESS: '378282246310005',
    DECLINED_CARD: '4000000000000002',
    INSUFFICIENT_FUNDS: '4000000000009995',
    EXPIRED_CARD: '4000000000000069',
    INCORRECT_CVC: '4000000000000127',
}
