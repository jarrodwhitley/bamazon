import {useMemo} from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from './FontAwesomeIcon.jsx';
import ProductCard from './ProductCard.jsx';
import Sidebar from "./Sidebar.jsx";
import {useFilteredProducts, useProducts, useSelectedProduct} from './ContextProvider.jsx';
import BamazonAd from '../assets/images/bamazon_ad.png';
import BamazonBoom from '../assets/images/bamazon_logo_boom.png';
import BamazonBam from '../assets/images/bamazon_logo_text_bam.png';
import SingleProductView from "./SingleProductView.jsx";

export default function Content({isLoading, filtering}) {
    const products = useProducts();
    const filteredProducts = useFilteredProducts();
    const featuredProducts = useMemo(() => {
        return products.filter(product => product.featured);
    }, [products]);
    
    const selectedProduct = useSelectedProduct();
    
    return (
        <main className="main-grid h-full relative">
            {/* Loading Overlay */}
            {isLoading && (
                <div className="main-grid__loading-overlay absolute top-0 left-0 w-full h-screen bg-white z-[2] grid grid-cols-1 grid-rows-1 items-center justify-items-center">
                    <img src={BamazonBam} alt="Bamazon Bam" className="w-1/6 animate__animated animate__rotateOut animate__infinite row-start-1 col-start-1 z-10"/>
                    <img src={BamazonBoom} alt="Bamazon Boom" className="w-1/6 animate__animated animate__pulse animate__infinite row-start-1 col-start-1"/>
                </div>
            )}
            
            {/* Featured Products */}
            <div className="main-grid__featured featured-items grid grid-cols-1 lg:grid-cols-3 lg:gap-8 max-h-fit bg-gray-400 p-8 animate__animated">
                <div className="main-grid__featured__cta text-8xl bg-gradient-to-br from-yellow-500 to-yellow-300 flex items-center w-full max-w-screen-sm text-white mt-4 p-6 mx-auto rounded font-bold">
                    <div className="cta__text">
                        <div className="w-full text-6xl lg:text-[6vw]">Today&#39;s<br/> Deals</div>
                        <div className="w-full text-xl lg:text-[1.5vw]">Get em&#39; before they&#39;re gone!</div>
                    </div>
                </div>
                <div className="main-grid__featured__grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 col-span-2 max-w-6xl mt-4 mx-auto">
                    {featuredProducts.map(product => (
                        <ProductCard key={product.id} product={product} size="lg" showDiscount={true} showLowStock={true}/>
                    ))}
                </div>
            </div>
            
            {/* Unfiltered Products */}
            {!filtering && (
                <div className="main-grid__content unfiltered px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 pl-4">
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} showLowStock={true}/>
                        ))}
                    </div>
                    <img className="main-grid__advertisement cursor-pointer" src={BamazonAd} alt="fake ad"/>
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
            
            <SingleProductView className={'animate__animated ' + (selectedProduct ? 'zoomIn' : 'zoomOut')} selectedProduct={selectedProduct} />
            
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