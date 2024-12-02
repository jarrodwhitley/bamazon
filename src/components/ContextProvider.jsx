import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ProductsContext = createContext(null);
const SelectedProductContext = createContext(null);
const SetSelectedProductContext = createContext(null);
const SelectedCategoryContext = createContext(null);
const SetSelectedCategoryContext = createContext(null);
const FilteredProductsContext = createContext(null);
const SetFilteredProductsContext = createContext(null);
const FilteringContext = createContext(false);
const SetFilteringContext = createContext(null);
const SearchStringContext = createContext(null)
const SetSearchStringContext = createContext({});
const SelectedFiltersContext = createContext({});
const SetSelectedFiltersContext = createContext(null);

export const Context = ({ products, filteredProducts, selectedProduct, selectedCategory, searchString, children }) => {
    const [selectedProductState, setSelectedProductState] = useState(selectedProduct);
    const [filteredProductsState, setFilteredProductsState] = useState(filteredProducts);
    const [selectedCategoryState, setSelectedCategoryState] = useState(selectedCategory);
    const [searchStringState, setSearchStringState] = useState(searchString);
    const [isFilteringState, setIsFilteringState] = useState(false);
    const [selectedFiltersState, setSelectedFiltersState] = useState({ searchString: '', categories: [], brands: [], price: '' });
    
    return (
        <ProductsContext.Provider value={products}>
            <FilteredProductsContext.Provider value={filteredProductsState}>
                <SetFilteredProductsContext.Provider value={setFilteredProductsState}>
                    <SelectedProductContext.Provider value={selectedProductState}>
                        <SetSelectedProductContext.Provider value={setSelectedProductState}>
                            <SelectedCategoryContext.Provider value={selectedCategoryState}>
                                <SetSelectedCategoryContext.Provider value={setSelectedCategoryState}>
                                    <FilteringContext.Provider value={isFilteringState}>
                                        <SetFilteringContext.Provider value={setIsFilteringState}>
                                            <SearchStringContext.Provider value={searchStringState}>
                                                <SetSearchStringContext.Provider value={setSearchStringState}>
                                                    <SelectedFiltersContext.Provider value={selectedFiltersState}>
                                                        <SetSelectedFiltersContext.Provider value={setSelectedFiltersState}>
                                                            {children}
                                                        </SetSelectedFiltersContext.Provider>
                                                    </SelectedFiltersContext.Provider>
                                                </SetSearchStringContext.Provider>
                                            </SearchStringContext.Provider>
                                        </SetFilteringContext.Provider>
                                    </FilteringContext.Provider>
                                </SetSelectedCategoryContext.Provider>
                            </SelectedCategoryContext.Provider>
                        </SetSelectedProductContext.Provider>
                    </SelectedProductContext.Provider>
                </SetFilteredProductsContext.Provider>
            </FilteredProductsContext.Provider>
        </ProductsContext.Provider>
    );
};

export const useProducts = () => useContext(ProductsContext);
export const useFilteredProducts = () => useContext(FilteredProductsContext);
export const useSetFilteredProducts = () => useContext(SetFilteredProductsContext);
export const useSelectedProduct = () => useContext(SelectedProductContext);
export const useSetSelectedProduct = () => useContext(SetSelectedProductContext);
export const useSelectedCategory = () => useContext(SelectedCategoryContext);
export const useSetSelectedCategory = () => useContext(SetSelectedCategoryContext);
export const useIsFiltering = () => useContext(FilteringContext);
export const useSetIsFiltering = () => useContext(SetFilteringContext);
export const useSearchString = () => useContext(SearchStringContext);
export const useSetSearchString = () => useContext(SetSearchStringContext);
export const useSelectedFilters = () => useContext(SelectedFiltersContext);
export const useSetSelectedFilters = () => useContext(SetSelectedFiltersContext);

Context.propTypes = {
    products: PropTypes.array.isRequired,
    filteredProducts: PropTypes.array.isRequired,
    selectedProduct: PropTypes.object,
    selectedCategories: PropTypes.string,
    filtering: PropTypes.bool,
    searchString: PropTypes.string,
    children: PropTypes.node.isRequired,
};