import { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

const ProductsContext = createContext(undefined);

export const Context = ({ products, children }) => (
    <ProductsContext.Provider value={products}>
        {children}
    </ProductsContext.Provider>
);

export const useProducts = () => useContext(ProductsContext);

Context.propTypes = {
    products: PropTypes.array.isRequired,
    children: PropTypes.node.isRequired,
}