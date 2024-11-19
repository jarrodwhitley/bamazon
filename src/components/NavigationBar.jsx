import { useState } from 'react';
import PropTypes from "prop-types";
import SearchBar from "./SearchBar.jsx";

export default function NavigationBar({ onFilterProducts }) {
    const [isMobile, setIsMobile] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    
    const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);
    const filterProducts = (string) => {
        onFilterProducts(string);
    }
    
    // On load
    if (!isMobile && window.innerWidth < 768) {
        setIsMobile(true);
    }
    
    return (
        <nav className={`${isMobile ? 'mobile' : ''}` + ' w-full px-4 py-2 top-0 left-0 right-0 bg-blue-900 text-white flex items-center justify-between'}>
            <div className="bamazon-logo text-3xl font-bold"><span className="text-yellow-500">BAM</span>azon</div>
            <SearchBar onFilterProducts={filterProducts}/>
            {isMobile && (
                <div className="mobile-menu-btn" onClick={toggleMobileMenu}>
                    <i className={`fa-solid ${showMobileMenu ? 'fa-times' : 'fa-bars'}`}></i>
                </div>
            )}
            <div className="nav-links text-sm flex items-center gap-4 justify-end">
                <a className="nav-links__link" href="https://github.com/jarrodwhitley/bamazon">See project on Github</a>
                <a className="nav-links__link" href="https://jarrodwhitley.com">JW</a>
            </div>
        </nav>
    );
}

NavigationBar.propTypes = {
    onFilterProducts: PropTypes.func.isRequired
};