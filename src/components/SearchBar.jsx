import PropTypes from "prop-types";
import { useRef, useEffect } from "react";
import { useProducts, useSetSearchString } from "./ContextProvider.jsx";
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

function selectItem(item) {
    console.log(item);
}

export default function SearchBar() {
    const isMobile = window.innerWidth < 768;
    const products = useProducts();
    const searchInputRef = useRef(null);
    const setSearchString = useSetSearchString();
    
    const formatResult = (item) => {
        return (
            <>
                <span style={{display: 'block', textAlign: 'left'}}>{item.title}</span>
            </>
        )
    }
    
    const handleOnSearch = (string) => {
        setSearchString(string);
    };
    
    const handleOnSelect = (item) => {
        selectItem(item);
    };
    
    useEffect(() => {
        const handleKeyDown = (event) => {
            let searchInputRef = document.querySelector('.search-bar input');
            if (event.key === 'Enter' && document.activeElement === searchInputRef) {
                searchInputRef.blur();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
    
    return (
        <div className="search-bar w-full md:w-1/2 m-6 mb-4 relative">
            <ReactSearchAutocomplete
                items={products}
                onSearch={query => {
                    handleOnSearch(query);
                }}
                onSelect={item => {
                    handleOnSelect(item);
                }}
                fuseOptions={{keys: ['title', 'tags', 'brand']}}
                autoFocus
                placeholder="Search products..."
                styling={isMobile ? {
                    height: '60px',
                    borderRadius: '5px',
                    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
                    fontSize: '18px',
                    zIndex: 10,
                } : {
                    height: '40px',
                    borderRadius: '5px',
                    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
                    fontSize: '16px',
                    zIndex: 10,
                }}
                formatResult={formatResult}
                inputRef={searchInputRef}/>
        </div>
    );
}

SearchBar.propTypes = {
    onEnterPress: PropTypes.func
};