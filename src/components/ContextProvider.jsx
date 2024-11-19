import { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

const ProductsContext = createContext(undefined);
const FilteredProductsContext = createContext(undefined);

export const Context = ({ products, filteredProducts, children }) => (
    <ProductsContext.Provider value={products}>
        <FilteredProductsContext.Provider value={filteredProducts}>
            {children}
        </FilteredProductsContext.Provider>
    </ProductsContext.Provider>
);

export const useProducts = () => useContext(ProductsContext);
export const useFilteredProducts = () => useContext(FilteredProductsContext);

Context.propTypes = {
    products: PropTypes.array.isRequired,
    filteredProducts: PropTypes.array.isRequired,
    children: PropTypes.node.isRequired,
};