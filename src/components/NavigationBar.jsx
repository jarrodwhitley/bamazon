import { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import SearchBar from "./SearchBar.jsx";
import BamazonLogo from "../assets/images/bamazon_logo_v1.1.png";

export default function NavigationBar({ onFilterProducts, onEnterPress }) {
    const [isMobile, setIsMobile] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    
    const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);
    const filterProducts = (string) => {
        onFilterProducts(string);
    }
    
    useEffect(() => {
        if (window.innerWidth < 768) {
            setIsMobile(true);
        }
    }, []);
    
    return (
        <nav className={`${isMobile ? 'mobile' : ''} w-full px-4 h-20 top-0 left-0 right-0 bg-blue-900 text-white flex items-center justify-between`}>
            <img className="bamazon-logo" src={BamazonLogo} width="150" alt="BAMazon logo"/>
            <span className={''}>(Under Construction)</span>
            {!isMobile && (
                <>
                    <SearchBar onFilterProducts={filterProducts}/>
                    <div className="nav-links text-sm flex items-center gap-4 justify-end">
                        <a className="nav-links__link" href="https://github.com/jarrodwhitley/bamazon">See project on Github</a>
                        <a className="nav-links__link" href="https://jarrodwhitley.com">JW</a>
                    </div>
                </>
            )}
            {isMobile && (
                <div className="mobile-menu-btn" onClick={toggleMobileMenu}>
                    <i className={`text-2xl fa-solid ${showMobileMenu ? 'fa-times' : 'fa-bars'}`}></i>
                </div>
            )}
        </nav>
    );
}

NavigationBar.propTypes = {
    onFilterProducts: PropTypes.func.isRequired
};