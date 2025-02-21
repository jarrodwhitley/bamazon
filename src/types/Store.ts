import Product from './Product'
import Filters from './Filters'
import CartItem from './CartItem'

export default interface RootState {
    cart: CartItem[]
    products: Product[]
    filters: Filters
    selectedProduct: Product | null
    ui: {
        isMobile: boolean
        isLoading: boolean
        showCart: boolean
        showMobileMenu: boolean
        showMobileSearch: boolean
        modal: string | null
    }
}
