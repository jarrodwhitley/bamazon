import { useEffect, useState } from 'react';
import { useCart, useSetCart } from './ContextProvider.jsx';

export default function Cart() {
    const cart = useCart();
    const setCart = useSetCart();
    
    const handleRemoveFromCart = (e, id) => {
        let newCart = cart.items.filter(product => product.id !== id);
        setCart({
            showCart: cart.showCart,
            items: newCart
        })
    }
    
    const handleQuantityChange = (e, id) => {
        let newCart = [...cart.items];
        let productIndex = newCart.findIndex(product => product.id === id);
        newCart[productIndex].quantity = parseInt(e.target.value);
        setCart({
            showCart: cart.showCart,
            items: newCart
        })
    }
    
    return (
        <div className={(cart.showCart ? 'animate__slideInRight ' : 'animate__slideOutRight ') +
            'cart__container fixed w-full lg:w-[400px] h-full top-[100px] lg:top-[118px] right-0 bg-white shadow-lg animate__animated animate__faster z-10 px-4'}>
            { cart.items.length > 0 && (
                <div className={'text-2xl font-semibold pl-6 py-4 border-b'}>Your cart</div>
            )}
            {cart.items.map((product, index) => (
                <div key={index} className={'cart__product grid grid-cols-[20%_1fr_auto_auto] items-center gap-4 p-4 border-b border-gray-200'}>
                    <img src={product.images[0]} alt={product.title} className={'w-16 h-16 object-cover row-start-1'}/>
                    <div className={'details flex flex-col row-start-1 self-start gap-2 leading-[1]'}>
                        <span className={'text-sm whitespace-nowrap max-w-[150px] text-ellipsis overflow-hidden'}>{product.title}</span>
                        <span className={'font-semibold'}>${product.price.toFixed(2)}</span>
                    </div>
                    <div className={'quantity flex items-center row-start-1 gap-2'}>
                        <select className={'font-base bg-gray-100 rounded'} value={product.quantity} onChange={(e) => handleQuantityChange(e, product.id)}>
                            {[...Array(10).keys()].map(i => (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            ))}
                        </select>
                    </div>
                    <i className={'fa-solid fa-trash-alt text-gray-300 cursor-pointer row-start-1'} onClick={(e) => handleRemoveFromCart(e, product.id)}></i>
                </div>
            ))}
            
            {/* Subtotal */}
            {cart.items.length > 0 && (
                <>
                    <div className={'cart__subtotal flex items-center justify-between p-4'}>
                        <span className={'font-semibold'}>Subtotal:</span>
                        <span className={'font-semibold'}>${cart.items.reduce((acc, product) => acc + (product.price * product.quantity), 0).toFixed(2)}</span>
                    </div>
                    <div className={'cart__checkout w-fit h-fit py-2 px-8 mt-6 cursor-pointer mx-auto text-white bg-orange-400 font-semibold rounded'}>Checkout</div>
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
    );
}