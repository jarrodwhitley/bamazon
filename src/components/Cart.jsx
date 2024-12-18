import {useSelector, useDispatch} from 'react-redux'
import {setShowCart, updateItem, removeItem, toggleCart} from '../store/cartSlice'
import {useMemo, useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

export default function Cart() {
    const cart = useSelector((state) => state.cart)
    const dispatch = useDispatch()
    const [showBam, setShowBam] = useState(false)
    const handleRemoveFromCart = (e, id) => {
        dispatch(removeItem(id))
    }
    const handleQuantityChange = (e, id) => {
        dispatch(updateItem({id, quantity: parseInt(e.target.value)}))
    }
    const handleCheckout = () => {
        dispatch(setShowCart(false))
    }
    const totalSavings = useMemo(() => {
        return cart.items.reduce((acc, product) => {
            return acc + (product.price * product.discountPercentage) / 100
        }, 0)
    }, [cart.items])
    
    // if the use clicks outside the cart, close it
    useEffect(() => {
        function handleClickOutside(event) {
            if (event.target.closest('.cart') === null && cart.showCart) {
                dispatch(setShowCart(false))
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [cart, dispatch])

    return (
        <div className={'cart__container fixed w-full lg:w-[400px] h-full overflow-hidden pb-32 top-[100px] right-0 bg-white shadow-lg animate__animated animate__faster z-10 px-4 ' + (cart.showCart ? 'animate__slideInRight ' : 'animate__slideOutRight ')}>
            {cart.items.length > 0 && <div className={'text-base lg:text-2xl font-semibold pl-6 py-2 lg:py-4 border-b'}>Your cart</div>}

            {cart.items.length > 0 && (
                <>
                    {/* Cart Items */}
                    <div className={'cart__items'}>
                        {cart.items.map((product, index) => (
                            <div key={index} className={'cart__product grid grid-cols-[20%_1fr_auto_auto] items-center gap-4 p-4 border-b border-gray-200'}>
                                <img src={product.images[0]} alt={product.title} className={'w-16 h-16 object-cover row-start-1'} />
                                <div className={'details flex flex-col row-start-1 self-start gap-2 leading-[1]'}>
                                    <span className={'text-sm whitespace-nowrap max-w-[150px] text-ellipsis overflow-hidden'}>{product.title}</span>
                                    <span className={'font-semibold'}>${product.price.toFixed(2)}</span>
                                </div>
                                <div className={'quantity flex items-center row-start-1 gap-2'}>
                                    <select className={'font-base bg-gray-100 rounded'} value={product.quantity || ''} onChange={(e) => handleQuantityChange(e, product.id)}>
                                        {[...Array(10).keys()].map((i) => (
                                            <option key={i + 1} value={i + 1}>
                                                {i + 1}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <i className={'fa-solid fa-trash-alt text-gray-300 cursor-pointer row-start-1'} onClick={(e) => handleRemoveFromCart(e, product.id)}></i>
                            </div>
                        ))}
                    </div>

                    {/* Subtotal and Checkout Button */}
                    <div className={'flex flex-col justify-evenly items-center h-fit w-full bg-white p-4 pr-6 lg:pb-10 shadow-2xl absolute top-auto left-0 right-0 bottom-[100px] overflow-auto shadow-[0_0_8px_rgba(0,0,0,0.2)]'}>
                        <div className={'cart__savings w-full flex items-center justify-between pt-2'}>
                            <span className={'text-sm font-semibold'}>Total Savings:</span>
                            <span className={'font-semibold'}>-${totalSavings.toFixed(2)}</span>
                        </div>
                        <div className={'cart__subtotal w-full flex items-center justify-between pt-2'}>
                            <span className={'text-sm font-semibold'}>Subtotal:</span>
                            <span className={'font-semibold'}>${cart.items.reduce((acc, product) => acc + product.price * product.quantity, 0).toFixed(2)}</span>
                        </div>
                        <Link to={'/checkout'} className={'cart__checkout-btn'} onClick={handleCheckout}>
                           Checkout
                        </Link>
                    </div>
                </>
            )}

            {/* Cart empty */}
            {cart.items.length === 0 && (
                <div className={'cart__empty flex flex-col items-center justify-center h-full select-none'}>
                    <span className={'text-2xl font-semibold text-center'}>Your cart is empty 😅</span>
                    <span className={'text-xl font-base text-center mt-4 mx-6 leading-[1]'}>Come back after you add a few things!</span>
                </div>
            )}
        </div>
    )
}
