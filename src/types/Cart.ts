import CartItem from './CartItem'

export default interface Cart {
    showCart: boolean
    items: CartItem[]
}
