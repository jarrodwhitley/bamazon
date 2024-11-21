import { useState } from 'react';
import PropTypes from "prop-types";
import SearchBar from "./SearchBar.jsx";
import BamazonLogo from "../assets/images/bamazon_logo_v1.1.png";
// import { useSetIsFiltering } from "./ContextProvider.jsx";

export default function NavigationBar({ onEnterPress }) {
    const isMobile = window.innerWidth < 768;
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);
    
    return (
        <nav className={`${isMobile ? 'mobile' : ''} w-full px-4 h-20 top-0 left-0 right-0 bg-blue-900 text-white flex items-center justify-between`}>
            <img className="bamazon-logo" src={BamazonLogo} width={isMobile ? '100': '120'} alt="BAMazon logo"/>
            <span className={''}>🚧 Under Construction 🚧</span>
            {!isMobile && (
                <>
                    <SearchBar/>
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
    onEnterPress: PropTypes.func,
};