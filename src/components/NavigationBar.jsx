import React, {useEffect, useState} from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {setShowMobileMenu, setShowMobileSearch, setModal} from '../store/uiSlice.js'
import {setShowCart, removeItem, toggleCart} from '../store/cartSlice.js'
import {setSelectedProduct} from '../store/selectedProductSlice.js'
import {updateFilters, clearFilters} from '../store/filtersSlice.js'
import SearchBar from './SearchBar.jsx'
import BamazonLogo from '../assets/images/bamazon_logo_v1.1.png'
import {capitalizeFirstLetter} from '../utils/functions.jsx'

export default function NavigationBar() {
    const dispatch = useDispatch()
    const isMobile = useSelector((state) => state.ui.isMobile)
    const products = useSelector((state) => state.products)
    const showMobileMenu = useSelector((state) => state.ui.showMobileMenu)
    const showMobileSearch = useSelector((state) => state.ui.showMobileSearch)
    const selectedFilters = useSelector((state) => state.filters)
    const selectedProduct = useSelector((state) => state.selectedProduct)
    const cart = useSelector((state) => state.cart)
    const [upperNavHidden, setUpperNavHidden] = useState(false)
    const [categories, setCategories] = useState([])
    const location = useLocation()
    const navigate = useNavigate()
    const handleLogoClick = () => {
        dispatch(clearFilters())
        dispatch(setShowCart(false))
    }
    const handleSetSearchString = (string) => {
        dispatch(
            updateFilters({
                searchString: string,
                categories: selectedFilters.categories,
                brands: selectedFilters.brands,
                price: selectedFilters.price,
            }),
        )
    }
    const handleSetSelectedProduct = (product) => {
        dispatch(setSelectedProduct(product))
    }
    const handleDropDownItemClick = (category) => () => {
        dispatch(updateFilters({category: category}))
    }
    const handleToggleCart = (e) => {
        e.stopPropagation()
        dispatch(setShowMobileMenu(false))
        if (e.target.closest('.cart') || e.target.closest('.mobile-cart-btn')) {
            if (location.pathname === '/checkout') {
                console.log('1')
                navigate('/checkout')
            } else {
                console.log('2')
                dispatch(toggleCart())
            }
        }
    }
    const handleLaunchModal = (modalType) => () => {
        dispatch(setModal(modalType))
    }
    const toggleMobileMenu = () => dispatch(setShowMobileMenu(!showMobileMenu))
    const toggleMobileSearch = () => {
        dispatch(setShowMobileSearch(!showMobileSearch))
    }
    
    useEffect(() => {
        if (Array.isArray(products)) {
            if (categories.length < 1) {
                const newCategories = products.reduce((acc, product) => {
                    if (!acc.includes(product.category) && product.category !== undefined) {
                        acc.push(product.category)
                    }
                    return acc
                }, [])
                setCategories(newCategories)
            }
        }
    }, [products])
    
    return (
        <nav className={''}>
            <div className={(upperNavHidden ? 'hidden' : 'block') + ' upper bg-blue-950 px-6'}>
                <div className={'grid grid-rows-1 grid-cols-2 items-center py-2 max-w-[1400px] mx-auto'}>
                    <span className={'w-fit text-sm text-[#EAB308] font-bold justify-self-center md:justify-self-start col-span-full row-start-1'}>
                        Under Construction
                    </span>
                    <div className={'text-sm row-start-1 hidden md:flex items-center gap-4 justify-end'}>
                        <a className={'nav-links__link flex items-center hover:text-blue-400'}
                           href={'https://github.com/jarrodwhitley/bamazon'}>
                            <i className={'fa-brands fa-github text-lg'}></i>
                            <span className={'ml-2'}>See Project</span>
                        </a>
                        <a className={'nav-links__link'} href={'https://jarrodwhitley.com'}>JW</a>
                    </div>
                </div>
            </div>
            <div className={'lower'}>
                <div className={'lower__wrapper'}>
                    <Link to={'/'} onClick={handleLogoClick}>
                        <figure className={'logo'}>
                            <img
                                className={'bamazon-logo'}
                                src={BamazonLogo}
                                alt={'BAMazon logo'}
                            />
                        </figure>
                    </Link>
                    {!isMobile && (
                        <>
                            <SearchBar
                                classes={'search-bar w-1/2 relative my-auto'}
                                onSetSearchString={handleSetSearchString}
                                onSetSelectedProduct={handleSetSelectedProduct}
                            />
                            <div className={'navigation-bar__lower__links'}>
                                <div className={'nav-links__link categories'}>
                                    <span className={'font-semibold'}>Categories</span>
                                    <div className={'nav-links__link__dropdown'}>
                                        {categories.map((category, index) => (
                                            <Link to={'/category/' + category} key={index}
                                                  className={'nav-links__link__dropdown-item'}
                                                  onClick={handleDropDownItemClick(category)}>
                                                {capitalizeFirstLetter(category)}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                                <div className={'nav-links__link user'} onClick={handleLaunchModal('contact')}>
                                    <span className={'font-semibold'}>
                                        Contact
                                    </span>
                                </div>
                                <div className={'nav-links__link user cursor-not-allowed'} onClick={() => alert('Coming soon!')}>
                                    <span className={'font-semibold'}>
                                        Account
                                    </span>
                                </div>
                                <div className={'nav-links__link cart cursor-pointer'}
                                     onClick={handleToggleCart}>
                                    <span className={'font-semibold relative'}>Cart</span>
                                    {cart.items.length > 0 && (
                                        <span className={'cart-count bg-red-600 absolute top-2 -right-3 w-4 h-4 flex items-center justify-center text-white text-[10px] rounded-full ml-2'}>
                                                {cart.items.length}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                    {isMobile && (
                        <>
                            <div className={'grid grid-rows-1 grid-cols-3 gap-6 items-center'}>
                                <div className={'mobile-search-btn'} onClick={toggleMobileSearch}>
                                    <i className={'text-xl fa-solid fa-search'}></i>
                                </div>
                                <div className={'mobile-cart-btn'}>
                                    <i className={'fa-solid text-lg fa-cart-shopping relative'} onClick={handleToggleCart}>
                                        {cart.items.length > 0 && (
                                            <span className={'cart-count bg-red-600 absolute -top-3 -right-2 w-4 h-4 flex items-center justify-center text-white text-[10px] rounded-full ml-2'}>
                                            {cart.items.length}
                                        </span>
                                        )}
                                    </i>
                                </div>
                                <div className={'mobile-menu-btn'} onClick={toggleMobileMenu}>
                                    <i className={`text-2xl min-w-[21px] fa-solid ${showMobileMenu ? 'fa-times' : 'fa-bars'}`}></i>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className={'search animate__animated animate__faster ' + (showMobileSearch ? 'animate__slideInDown' : 'animate__slideOutUp')}>
                <div className={'home__search-bar__container bg-blue-950 w-full flex justify-center'}>
                    <SearchBar classes={'search-bar w-full relative p-4'} />
                </div>
            </div>
        </nav>
    )
}
