import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const ProductsContext = createContext(null);
const FilteredProductsContext = createContext(null);
const SelectedProductContext = createContext(null);
const SetSelectedProductContext = createContext(null);
const SelectedCategoryContext = createContext(null);
const SetSelectedCategoryContext = createContext(null);

export const Context = ({ products, filteredProducts, selectedProduct, selectedCategory, children }) => {
    const [selectedProductState, setSelectedProductState] = useState(selectedProduct);
    const [selectedCategoryState, setSelectedCategoryState] = useState(selectedCategory);
    
    console.log("Selected Product State:", selectedProductState);
    console.log("Selected Category State:", selectedCategoryState);
    
    return (
        <ProductsContext.Provider value={products}>
            <FilteredProductsContext.Provider value={filteredProducts}>
                <SelectedProductContext.Provider value={selectedProductState}>
                    <SetSelectedProductContext.Provider value={setSelectedProductState}>
                        <SelectedCategoryContext.Provider value={selectedCategoryState}>
                            <SetSelectedCategoryContext.Provider value={setSelectedCategoryState}>
                                {children}
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

Context.propTypes = {
    products: PropTypes.array.isRequired,
    filteredProducts: PropTypes.array.isRequired,
    selectedProduct: PropTypes.object,
    selectedCategory: PropTypes.string,
    children: PropTypes.node.isRequired,
};