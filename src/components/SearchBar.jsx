import PropTypes from "prop-types";
import { useRef, useEffect } from "react";
import {useProducts, useSearchString, useSetSearchString, useSetIsFiltering, useSetSelectedProduct} from "./ContextProvider.jsx";
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

export default function SearchBar() {
    const isMobile = window.innerWidth < 768;
    const products = useProducts();
    const searchInputRef = useRef(null);
    const searchString =  useSearchString();
    const setSearchString = useSetSearchString();
    const setSelectedProduct = useSetSelectedProduct();
    const setIsFiltering = useSetIsFiltering();
    
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
    
    const handleOnSelect = (product) => {
        setSelectedProduct(product);
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
    
    useEffect(() => {
        if (!searchString) return;
        if (searchString.length < 3) {
            setIsFiltering(false);
        }
        if (searchString === '') {
            if (searchInputRef.current) {
                searchInputRef.current.value = '';
            }
        }
    }, [searchString]);
    
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
                    height: '40px',
                    borderRadius: '30px',
                    boxShadow: '0',
                    fontSize: '18px',
                    zIndex: 10,
                } : {
                    height: '40px',
                    borderRadius: '20px',
                    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
                    fontSize: '16px',
                    zIndex: 10,
                }}
                showNoResults={true}
                formatResult={formatResult}
                inputRef={searchInputRef}/>
        </div>
    );
}

SearchBar.propTypes = {
    onEnterPress: PropTypes.func
};