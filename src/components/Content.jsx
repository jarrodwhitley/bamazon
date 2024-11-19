import {useMemo} from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from './FontAwesomeIcon.jsx';
import ProductCard from './ProductCard.jsx';
import Sidebar from "./Sidebar.jsx";
import {useFilteredProducts, useProducts} from './ContextProvider.jsx';

export default function Content({isLoading, filtering}) {
    const products = useProducts();
    const filteredProducts = useFilteredProducts();
    const featuredProducts = useMemo(() => {
        return products.filter(product => product.featured);
    }, [products]);
    // const filteredProducts = useFilteredProducts();
    
    return (
        <main className="main-grid h-full relative">
            {/* Loading Overlay */}
            {isLoading && (
                <div className="main-grid__loading-overlay absolute top-0 left-0 w-full h-full bg-white z-[2] flex items-center justify-center"></div>
            )}
            
            {/* Featured Products */}
            <div className="main-grid__featured featured-items max-h-fit bg-gray-400 p-4 animate__animated">
                <h2 className="text-2xl bg-yellow-500 text-white w-1/2 py-2 mb-4 mx-auto rounded font-bold text-center">Today&#39;s Deals!</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {featuredProducts.map(product => (
                        <ProductCard key={product.id} product={product} size="lg" showDiscount={true} showLowStock={true}/>
                    ))}
                </div>
            </div>
            
            {/* Unfiltered Products */}
            {!filtering && (
                <div className="main-grid__content unfiltered">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} showLowStock={true}/>
                        ))}
                    </div>
                    <img className="main-grid__advertisement" src="https://unsplash.it/300/600" alt=""/>
                </div>
            )}
            
            {/* Filtered Products */}
            {filtering && (
                <div className="main-grid__content filtered">
                    <div className="main-grid__product-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product}/>
                        ))}
                    </div>
                    <Sidebar />
                </div>
            )}
            
            {/*<div className="chat-widget-btn flex items-center justify-center w-14 h-14 bg-blue-600 border-blue-400 border-2 rounded-full top-[90%] mb-4 right-4 float-right sticky">*/}
            {/*    <FontAwesomeIcon icon="fa-comments" classes="text-white text-2xl"/>*/}
            {/*</div>*/}
        </main>
    )
}

Content.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    filtering: PropTypes.bool.isRequired
}