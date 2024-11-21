import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const ProductsContext = createContext(null);
const SelectedProductContext = createContext(null);
const SetSelectedProductContext = createContext(null);
const SelectedCategoryContext = createContext(null);
const SetSelectedCategoryContext = createContext(null);
const FilteredProductsContext = createContext(null);
const FilteringContext = createContext(false);
const SetFilteringContext = createContext(null);
const SearchStringContext = createContext(null)
const SetSearchStringContext = createContext(null);

export const Context = ({ products, filteredProducts, selectedProduct, selectedCategory, filtering, searchString, children }) => {
    const [selectedProductState, setSelectedProductState] = useState(selectedProduct);
    const [selectedCategoryState, setSelectedCategoryState] = useState(selectedCategory);
    const [filteringState, setFilteringState] = useState(filtering);
    const [searchStringState, setSearchStringState] = useState(searchString);
    
    // console.log("Selected Product State:", selectedProductState);
    // console.log("Selected Category State:", selectedCategoryState);
    // console.log("Filtering State:", filteringState);
    console.log("ContextProvider.jsx => Search String State:", searchStringState);
    
    return (
        <ProductsContext.Provider value={products}>
            <FilteredProductsContext.Provider value={filteredProducts}>
                <SelectedProductContext.Provider value={selectedProductState}>
                    <SetSelectedProductContext.Provider value={setSelectedProductState}>
                        <SelectedCategoryContext.Provider value={selectedCategoryState}>
                            <SetSelectedCategoryContext.Provider value={setSelectedCategoryState}>
                                <FilteringContext.Provider value={filteringState}>
                                    <SetFilteringContext.Provider value={setFilteringState}>
                                        <SearchStringContext.Provider value={searchStringState}>
                                            <SetSearchStringContext.Provider value={setSearchStringState}>
                                                {children}
                                            </SetSearchStringContext.Provider>
                                        </SearchStringContext.Provider>
                                    </SetFilteringContext.Provider>
                                </FilteringContext.Provider>
                            </SetSelectedCategoryContext.Provider>
                        </SelectedCategoryContext.Provider>
                    </SetSelectedProductContext.Provider>
                </SelectedProductContext.Provider>
            </FilteredProductsContext.Provider>
        </ProductsContext.Provider>
    );
};

export const useProducts = () => useContext(ProductsContext);
export const useFilteredProducts = () => useContext(FilteredProductsContext);
export const useSelectedProduct = () => useContext(SelectedProductContext);
export const useSetSelectedProduct = () => useContext(SetSelectedProductContext);
export const useSelectedCategory = () => useContext(SelectedCategoryContext);
export const useSetSelectedCategory = () => useContext(SetSelectedCategoryContext);
export const useIsFiltering = () => useContext(FilteringContext);
export const useSetIsFiltering = () => useContext(SetFilteringContext);
export const useSearchString = () => useContext(SearchStringContext);
export const useSetSearchString = () => useContext(SetSearchStringContext);

Context.propTypes = {
    products: PropTypes.array.isRequired,
    filteredProducts: PropTypes.array.isRequired,
    selectedProduct: PropTypes.object,
    selectedCategory: PropTypes.string,
    filtering: PropTypes.bool,
    searchString: PropTypes.string,
    children: PropTypes.node.isRequired,
};