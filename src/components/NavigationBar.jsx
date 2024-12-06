import { useState } from 'react';
import PropTypes from "prop-types";
import SearchBar from "./SearchBar.jsx";
import BamazonLogo from "../assets/images/bamazon_logo_v1.1.png";
import BamazonLogoDark from "../assets/images/bamazon_logo_dark_v1.1.png";
import { useSelectedFilters, useSetSelectedFilters, useSelectedProduct, useSetSelectedProduct, useCart, useSetCart } from "./ContextProvider.jsx";

export default function NavigationBar({isMobile}) {
    const selectedFilters = useSelectedFilters();
    const setSelectedFilters = useSetSelectedFilters();
    const selectedProduct = useSelectedProduct();
    const setSelectedProduct = useSetSelectedProduct();
    const cart = useCart();
    const setCart = useSetCart();
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [upperNavHidden, setUpperNavHidden] = useState(false);
    const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);
    const handleOnSetSearchString = (string) => {
        setSelectedFilters({
            searchString: string,
            categories: selectedFilters.category,
            brands: selectedFilters.brands,
            price: selectedFilters.price
        })
    };
    const handleOnSetSelectedProduct = (product) => {
        setSelectedProduct(product);
    };
    const handleCartClick = () => {
        setCart({
            showCart: !cart.showCart,
            items: cart.items
        })
    }
    
    return (
        <nav className={(isMobile ? 'mobile ' : '') + (isMobile && !selectedProduct.title || !isMobile ? 'sticky ' : 'block ') + 'w-full h-auto top-0 left-0 right-0 bg-blue-900 text-white z-30'}>
            <div className={(upperNavHidden ? 'hidden' : 'block') + ' upper bg-blue-950 px-6'}>
                <div className={'grid grid-rows-1 grid-cols-2 items-center py-2 max-w-[1400px] mx-auto'}>
                    <span className={'w-fit text-sm text-[#EAB308] font-bold justify-self-start col-span-full row-start-1'}>Under Construction</span>
                    <div className="text-sm row-start-1 flex items-center gap-4 justify-end">
                        <a className="nav-links__link flex items-center hover:text-blue-400" href="https://github.com/jarrodwhitley/bamazon">
                            <i className="fa-brands fa-github text-lg"></i>
                            <span className={'ml-2'}>See Project</span>
                        </a>
                        <a className="nav-links__link" href="https://jarrodwhitley.com">JW</a>
                        {/*<i className={'fa-solid fa-times cursor-pointer'} onClick={() => setUpperNavHidden(true)}></i>*/}
                    </div>
                </div>
            </div>
            <div className="lower px-6 py-2">
                <div className={'flex items-center justify-between max-w-[1400px] mx-auto'}>
                    <a href={'/'}><img className="bamazon-logo" src={BamazonLogo} width={isMobile ? '100': '120'} alt="BAMazon logo"/></a>
                    {!isMobile && (
                        <>
                            <SearchBar classes={'search-bar w-1/2 relative'} onSetSearchString={handleOnSetSearchString} onSetSelectedProduct={handleOnSetSelectedProduct}/>
                            <div className={'navigation-bar__lower__links w-fit flex items-center'}>
                                <div className={'user cursor-not-allowed hover:text-blue-400'}>
                                    <i className="fa-solid fa-user"></i>
                                    <span className={'font-semibold ml-2'}>Account</span>
                                </div>
                                <div className={'cart cursor-pointer hover:text-blue-400 ml-2'} onClick={handleCartClick}>
                                    <i className="fa-solid fa-cart-shopping relative">
                                        {cart.items.length > 0 && (
                                            <span className={'cart-count bg-red-600 absolute -top-3 -right-2 w-4 h-4 flex items-center justify-center text-white text-[10px] rounded-full ml-2'}>{cart.items.length}</span>
                                        )}
                                    </i>
                                    <span className={'font-semibold ml-2'}>Cart</span>
                                </div>
                            </div>
                        </>
                    )}
                    {isMobile && (
                        <div className={'grid grid-rows-1 grid-cols-2 gap-6 items-center'}>
                            <div className={'mobile-cart-btn'}>
                                <i className="fa-solid text-lg fa-cart-shopping relative" onClick={handleCartClick}>
                                    {cart.items.length > 0 && (
                                        <span className={'cart-count bg-red-600 absolute -top-3 -right-2 w-4 h-4 flex items-center justify-center text-white text-[10px] rounded-full ml-2'}>{cart.items.length}</span>
                                    )}
                                </i>
                            </div>
                            <div className="mobile-menu-btn" onClick={toggleMobileMenu}>
                            <i className={`text-2xl min-w-[21px] fa-solid ${showMobileMenu ? 'fa-times' : 'fa-bars'}`}></i>
                        </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

NavigationBar.propTypes = {
    isMobile: PropTypes.bool
}

