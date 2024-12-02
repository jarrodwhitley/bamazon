import PropTypes from "prop-types";
import { useEffect } from "react";
import {
    useProducts,
    useSetSelectedProduct,
    useSetIsFiltering,
    useSelectedFilters,
    useSetSelectedFilters
} from "./ContextProvider.jsx";
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

export default function SearchBar() {
    const isMobile = window.innerWidth < 768;
    const products = useProducts();
    const setSelectedProduct = useSetSelectedProduct();
    const setIsFiltering = useSetIsFiltering();
    const selectedFilters = useSelectedFilters();
    const setSelectedFilters = useSetSelectedFilters();
    
    const handleOnSearch = (string) => {
        // Update the search string in state
        setSelectedFilters((prevFilters) => ({
            ...prevFilters,
            searchString: string || ''
        }));
    };
    
    const handleOnSelect = (product) => {
        console.log('Product selected:', product);
        
        // Immediately set the selected product
        setSelectedProduct(product);
        
        // Update the search string with the selected product's title
        setSelectedFilters((prevFilters) => ({
            ...prevFilters,
            searchString: product.title || ''
        }));
    };
    
    useEffect(() => {
        // Handle filtering logic when searchString changes
        console.log('Updated searchString:', selectedFilters.searchString);
        
        if (selectedFilters.searchString.length < 3) {
            setIsFiltering(false);
        }
    }, [selectedFilters.searchString, setIsFiltering]);
    
    return (
        <div className="search-bar w-full md:w-1/2 m-6 mb-4 relative">
            <ReactSearchAutocomplete
                items={products}
                inputSearchString={selectedFilters.searchString || ''} // Fully controlled input
                onSearch={handleOnSearch}
                onSelect={handleOnSelect}
                fuseOptions={{ keys: ['title', 'tags', 'brand'] }}
                resultStringKeyName="title"
                autoFocus
                placeholder="Search products..."
                styling={
                    isMobile
                        ? {
                            height: '40px',
                            borderRadius: '30px',
                            boxShadow: '0',
                            fontSize: '18px',
                            zIndex: 10,
                        }
                        : {
                            height: '40px',
                            borderRadius: '20px',
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
    onEnterPress: PropTypes.func
};