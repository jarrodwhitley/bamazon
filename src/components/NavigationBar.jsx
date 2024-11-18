import { useState } from 'react';
import PropTypes from "prop-types";
import SearchBar from "./SearchBar.jsx";

function NavigationBar() {
    const [isMobile, setIsMobile] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    
    const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);
    
    // On load
    if (!isMobile && window.innerWidth < 768) {
        setIsMobile(true);
    }
    
    return (
        <nav className={`${isMobile ? 'mobile' : ''}` + 'fixed w-full px-4 py-2 top-0 left-0 right-0 bg-blue-900 text-white flex items-center justify-between'}>
            <div className="bamazon-logo text-3xl font-bold"><span className="text-yellow-400">BAM</span>azon</div>
            <SearchBar/>
            {isMobile && (
                <div className="mobile-menu-btn" onClick={toggleMobileMenu}>
                    <i className={`fa-solid ${showMobileMenu ? 'fa-times' : 'fa-bars'}`}></i>
                </div>
            )}
            <div className="nav-links flex items-center gap-4 justify-end">
                <a className="nav-links__link" href="#">JW</a>
                <a className="nav-links__link" href="#">Contact</a>
                <a className="nav-links__link" href="#">Login</a>
            </div>
        </nav>
    );
}

PropTypes.propTypes = {
    products: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default NavigationBar;