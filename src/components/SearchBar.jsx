import PropTypes from "prop-types";
import { useEffect, useMemo, useRef } from "react";
import {
    useProducts,
    useSetSelectedProduct,
    useSetIsFiltering,
    useSelectedFilters,
    useSetSelectedFilters
} from "./ContextProvider.jsx";
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

export default function SearchBar({classes}) {
    const isMobile = useMemo(() => window.innerWidth < 768, []);
    const products = useProducts();
    const setSelectedProduct = useSetSelectedProduct();
    const setIsFiltering = useSetIsFiltering();
    const selectedFilters = useSelectedFilters();
    const setSelectedFilters = useSetSelectedFilters();
    const parentAutocompleteRef = useRef(null);
    const handleOnSearch = (string) => {
        // Update the search string in state
        setSelectedFilters((prevFilters) => ({
            ...prevFilters,
            searchString: string || ''
        }));
    };
    const handleOnSelect = (product) => {
        setSelectedFilters((prevFilters) => ({
            ...prevFilters,
            searchString: product.title
        }));
        setSelectedProduct(product);
        parentAutocompleteRef.current.querySelector('input').blur();
    };
    const handleOnClear = () => {
        setSelectedFilters(() => ({
            searchString: '',
            categories: [],
            brands: [],
            price: ''
        }));
    }
    
    useEffect(() => {
        if (selectedFilters.searchString.length < 3) {
            setIsFiltering(false);
        }
    }, [selectedFilters.searchString, setIsFiltering]);
    
    return (
        <div className={classes} ref={parentAutocompleteRef}>
            <ReactSearchAutocomplete
                items={products}
                inputSearchString={selectedFilters.searchString || ''}
                onSearch={handleOnSearch}
                onSelect={handleOnSelect}
                onClear={handleOnClear}
                fuseOptions={{ keys: ['title', 'tags', 'brand'] }}
                resultStringKeyName="title"
                autoFocus={false}
                placeholder="Search products..."
                styling={
                    isMobile
                        ? {
                            height: '40px',
                            borderRadius: '5px',
                            boxShadow: '0',
                            fontSize: '18px',
                            zIndex: 10,
                        }
                        : {
                            height: '40px',
                            borderRadius: '5px',
                            boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
                            fontSize: '16px',
                            zIndex: 10,
                        }
                }
                showNoResults={true}
                formatResult={(item) => (
                    <span style={{ display: 'block', textAlign: 'left' }}>{item.title}</span>
                )}
            />
        </div>
    );
}

SearchBar.propTypes = {
    classes: PropTypes.string
};