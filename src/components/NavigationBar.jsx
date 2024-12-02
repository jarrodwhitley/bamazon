import { useState } from 'react';
import PropTypes from "prop-types";
import SearchBar from "./SearchBar.jsx";
import BamazonLogo from "../assets/images/bamazon_logo_v1.1.png";
import { useSelectedFilters, useSetSelectedFilters, useSetSelectedProduct } from "./ContextProvider.jsx";

export default function NavigationBar({ onEnterPress }) {
    const isMobile = window.innerWidth < 768;
    const selectedFilters = useSelectedFilters();
    const setSelectedFilters = useSetSelectedFilters();
    const setSelectedProduct = useSetSelectedProduct();
    const [showMobileMenu, setShowMobileMenu] = useState(false);
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
    
    return (
        <nav className={`${isMobile ? 'mobile' : ''} w-full h-auto top-0 left-0 right-0 sticky bg-blue-800 text-white z-[11]`}>
            <div className="upper bg-blue-900 px-6">
                <div className={'grid grid-rows-1 grid-cols-2 items-center py-2 max-w-[1400px] mx-auto'}>
                    <span className={'w-fit justify-self-center col-span-full row-start-1'}>🚧 Under Construction 🚧</span>
                    <div className="text-sm row-start-1 flex items-center gap-4 justify-end">
                        <a className="nav-links__link flex items-center hover:text-blue-400" href="https://github.com/jarrodwhitley/bamazon">
                            <i className="fa-brands fa-github text-lg"></i>
                            <span className={'ml-2'}>See Project</span>
                        </a>
                        <a className="nav-links__link" href="https://jarrodwhitley.com">JW</a>
                    </div>
                </div>
            </div>
            <div className="lower px-6 py-2 lg:py-0">
                <div className={'flex items-center justify-between max-w-[1400px] mx-auto'}>
                    <img className="bamazon-logo" src={BamazonLogo} width={isMobile ? '100': '120'} alt="BAMazon logo"/>
                    {!isMobile && (
                        <>
                            <SearchBar onSetSearchString={handleOnSetSearchString} onSetSelectedProduct={handleOnSetSelectedProduct}/>
                            <div className={'navigation-bar__lower__links w-fit flex items-center'}>
                                <div className={'user cursor-pointer hover:text-blue-400'}>
                                    <i className="fa-solid fa-user"></i>
                                    <span className={'font-semibold ml-2'}>Account</span>
                                </div>
                                <div className={'cart cursor-pointer hover:text-blue-400 ml-2'}>
                                    <i className="fa-solid fa-cart-shopping"></i>
                                    <span className={'font-semibold ml-2'}>Cart</span>
                                </div>
                            </div>
                        </>
                    )}
                    {isMobile && (
                        <div className="mobile-menu-btn" onClick={toggleMobileMenu}>
                            <i className={`text-2xl fa-solid ${showMobileMenu ? 'fa-times' : 'fa-bars'}`}></i>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

NavigationBar.propTypes = {
    onEnterPress: PropTypes.func,
};