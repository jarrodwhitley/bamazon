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
const CartContext = createContext([]);
const SetCartContext = createContext(null);

export const Context = ({ products, filteredProducts, selectedProduct, selectedCategories, searchString, cart, children }) => {
    const [selectedProductState, setSelectedProductState] = useState(selectedProduct);
    const [filteredProductsState, setFilteredProductsState] = useState(filteredProducts);
    const [selectedCategoriesState, setSelectedCategoriesState] = useState(selectedCategories);
    const [searchStringState, setSearchStringState] = useState(searchString);
    const [isFilteringState, setIsFilteringState] = useState(false);
    const [selectedFiltersState, setSelectedFiltersState] = useState({ searchString: '', categories: [], brands: [], price: '' });
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    const initialCartState = storedCart ? storedCart : { showCart: false, items: [] };
    const [cartState, setCartState] = useState(initialCartState);
    
    // useEffect(() => {
    //     const storedCart = JSON.parse(localStorage.getItem('cart'));
    //     if (storedCart && cartState.items.length === 0) {
    //         setCartState({showCart: cartState.showCart, items: cart});
    //     }
    // },[])
    
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartState));
    }, [cartState]);
    
    return (
        <CartContext.Provider value={cartState}>
            <SetCartContext.Provider value={setCartState}>
                <ProductsContext.Provider value={products}>
                    <FilteredProductsContext.Provider value={filteredProductsState}>
                        <SetFilteredProductsContext.Provider value={setFilteredProductsState}>
                            <SelectedProductContext.Provider value={selectedProductState}>
                                <SetSelectedProductContext.Provider value={setSelectedProductState}>
                                    <SelectedCategoryContext.Provider value={selectedCategoriesState}>
                                        <SetSelectedCategoryContext.Provider value={setSelectedCategoriesState}>
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
            </SetCartContext.Provider>
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
export const useSetCart = () => useContext(SetCartContext);
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
    cart: PropTypes.array.isRequired,
    products: PropTypes.array.isRequired,
    filteredProducts: PropTypes.array.isRequired,
    selectedProduct: PropTypes.object,
    selectedCategories: PropTypes.string,
    filtering: PropTypes.bool,
    searchString: PropTypes.string,
    children: PropTypes.node.isRequired,
};