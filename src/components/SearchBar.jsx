import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { setSelectedProduct } from "../store/selectedProductSlice.js";
import { updateFilters, clearFilters, filtersActive } from "../store/filtersSlice.js";
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { useSelector, useDispatch } from "react-redux";

export default function SearchBar({classes}) {
    const dispatch = useDispatch();
    const isMobile = useSelector(state => state.ui.isMobile);
    const products = useSelector(state => state.products);
    const filtersActiveState = useSelector(filtersActive);
    const selectedFiltersState = useSelector(state => state.filters);
    const parentAutocompleteRef = useRef(null);
    
    const handleSelectProduct = (product) => {
        dispatch(setSelectedProduct(product));
    }
    
    const handleSetFilters = (filters) => {
        dispatch(updateFilters(filters));
    }
    
    const handleOnSearch = (string) => {
        handleSetFilters((prevFilters) => ({
            ...prevFilters,
            searchString: string || ''
        }));
    };
    
    const handleOnSelect = (product) => {
        handleSetFilters((prevFilters) => ({
            ...prevFilters,
            searchString: product.title
        }));
        handleSelectProduct(product);
        parentAutocompleteRef.current.querySelector('input').blur();
    };
    const handleOnClear = () => {
        dispatch(clearFilters());
    }
    
    // useEffect(() => {
    //     if (selectedFiltersState.searchString.length < 3) {
    //         setIsFiltering(false);
    //     }
    // }, [selectedFilters.searchString, setIsFiltering]);
    
    return (
        <div className={classes} ref={parentAutocompleteRef}>
            <ReactSearchAutocomplete
                items={products}
                inputSearchString={selectedFiltersState.searchString || ''}
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
    classes: PropTypes.string,
};