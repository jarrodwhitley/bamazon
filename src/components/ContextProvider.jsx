import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const ProductsContext = createContext(undefined);
const FilteredProductsContext = createContext(undefined);
const SelectedProductContext = createContext(undefined);
const SetSelectedProductContext = createContext(undefined);

export const Context = ({ products, filteredProducts, selectedProduct, children }) => {
    const [selectedProductState, setSelectedProductState] = useState(selectedProduct);
    
    return (
        <ProductsContext.Provider value={products}>
            <FilteredProductsContext.Provider value={filteredProducts}>
                <SelectedProductContext.Provider value={selectedProductState}>
                    <SetSelectedProductContext.Provider value={setSelectedProductState}>
                        {children}
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

Context.propTypes = {
    products: PropTypes.array.isRequired,
    filteredProducts: PropTypes.array.isRequired,
    selectedProduct: PropTypes.object,
    children: PropTypes.node.isRequired,
};