import { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from './FontAwesomeIcon.jsx';
import ProductCard from './ProductCard.jsx';
import Sidebar from "./Sidebar.jsx";
import { useFilteredProducts, useSetFilteredProducts , useProducts, useSelectedProduct, useSelectedCategory, useIsFiltering, useSetIsFiltering, useSearchString, useSelectedFilters } from './ContextProvider.jsx';
import BamazonAd from '../assets/images/bamazon_ad.png';
import BamazonBoom from '../assets/images/bamazon_logo_boom.png';
import BamazonBam from '../assets/images/bamazon_logo_text_bam.png';
import SingleProductView from "./SingleProductView.jsx";
import SearchBar from "./SearchBar.jsx";
import {capitalizeFirstLetter} from "../utils/functions.jsx";

export default function Content({ isLoading }) {
    const isMobile = window.innerWidth < 768;
    const [sidebarFilters, setSidebarFilters] = useState([]);
    const products = useProducts();
    const filteredProducts = useFilteredProducts();
    const setFilteredProducts = useSetFilteredProducts();
    const featuredProducts = useMemo(() => {
        return products?.filter(product => product.featured);
    }, [products]);
    const selectedProduct = useSelectedProduct();
    const selectedCategory = useSelectedCategory();
    const isFiltering = useIsFiltering();
    const setIsFiltering = useSetIsFiltering();
    const searchString = useSearchString();
    const selectedFilters = useSelectedFilters();
    const [filtersActive, setFiltersActive] = useState(false);
    
    // Create array for categories section
    const categories = products.reduce((acc, product) => {
        const categorySet = new Set(acc.map(item => item.category));
        if (!categorySet.has(product.category)) {
            acc.push(product);
        }
        return acc;
    }, []);

    const defaultFilters = {
        category: '',
        brands: [],
        price: '',
        searchString: ''
    }
    
    useEffect(() => {
        if (selectedFilters) {
            const filterValues = Object.values(selectedFilters);
            const defaultValues = Object.values(defaultFilters);
            const activeFilters = filterValues.filter((value, index) => value?.length > 0 && value !== defaultValues[index]);
            setFiltersActive(activeFilters.length > 0);
        }
    },[selectedFilters]);
    
    
    const filterProducts = () => {
        if (searchString && searchString.length > 2) {
            console.log('1');
            let filtered = products.filter(product => {
                return product.title.toLowerCase().includes(searchString.toLowerCase()) ||
                    product.tags.join(' ').toLowerCase().includes(searchString.toLowerCase()) ||
                    (product.brand && product.brand.toLowerCase().includes(searchString.toLowerCase())) ||
                    product.description.toLowerCase().includes(searchString.toLowerCase());
            });
            if (selectedFilters && filtersActive) {
                filtered = filtered.filter(product => {
                    console.log('product brand:', product.brand);
                    const categoryMatch = selectedFilters.category === product.category || selectedFilters.category.length === 0;
                    const brandMatch = selectedFilters.brands.includes(product.brand) || selectedFilters.brands.length === 0;
                    return categoryMatch && brandMatch;
                });
                setFilteredProducts(filtered);
                setIsFiltering(true);
            }
        } else if (selectedFilters && filtersActive) {
            console.log('2');
            let filtered = products.filter(product => {
                const categoryMatch = selectedFilters.category === product.category || selectedFilters.category.length === 0;
                const brandMatch = selectedFilters.brands.includes(product.brand) || selectedFilters.brands.length === 0;
                // the value of selectedFilters.price is returning a string
                // the value of that string will be in this format "0_50" which represents the min and max price, dollars only no cents
                // product.price will be a decimal value so we'll need to convert it to an integer ignoring the cents
                console.log('price', selectedFilters.price);
                const priceMatch = selectedFilters.price === '' || (product.price >= parseInt(selectedFilters.price.split('_')[0]) && product.price <= parseInt(selectedFilters.price.split('_')[1]));
                // const priceMatch = selectedFilters.price?.some(price => product.price >= price.min && product.price <= price.max) || selectedFilters.price?.length === 0;
                return categoryMatch && brandMatch && priceMatch;
            });
            setFilteredProducts(filtered);
            setIsFiltering(true);
        } else if (selectedCategory) {
            console.log('3');
            let filtered = products.filter(product => product.category === selectedCategory);
            setFilteredProducts(filtered);
            setIsFiltering(true);
        } else {
            console.log('4');
            setFilteredProducts(products);
            setIsFiltering(false);
        }
    };
    
    useEffect(() => {
        if (!selectedFilters) return;
        filterProducts();
    },[selectedFilters]);
    
    useEffect(() => {
        if (!searchString) return;
        filterProducts();
    }, [searchString]);

    // useEffect(() => {
    //     if (!selectedCategory) return;
    //     filterProducts();
    // }, [selectedCategory]);
    
    return (
        <main className={'relative ' + (isFiltering ? 'flex md:mt-4' : '')}>
            {/* Loading Overlay */}
            {isLoading && (
                <div className="content__loading-overlay absolute top-0 left-0 w-full h-screen bg-white z-[2] grid grid-cols-1 grid-rows-1 items-center justify-items-center">
                    <img src={BamazonBam} alt="Bamazon Bam" className="w-1/6 animate__animated animate__rotateOut animate__infinite row-start-1 col-start-1 z-10"/>
                    <img src={BamazonBoom} alt="Bamazon Boom" className="w-1/6 animate__animated animate__pulse animate__infinite row-start-1 col-start-1"/>
                </div>
            )}
            
            {isMobile && (
                <div className={'content__search-bar__container bg-gray-400 w-full flex justify-center'}>
                    <SearchBar/>
                </div>
            )}
            
            {!isFiltering && (
                <>
                    {/* Featured Products */}
                    <div className="content__featured featured-items w-full max-h-fit bg-gray-400 px-6 pb-4 md:p-8">
                        <div className="content__featured-inner grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-8 max-w-[1400px] mx-auto">
                            <div className="content__featured__cta text-8xl bg-gradient-to-br from-yellow-500 to-yellow-300 flex items-center w-fit lg:w-full text-white mt-4 p-2 lg:p-6 mx-auto rounded font-bold">
                                <div className="cta__text">
                                    <div className="w-full text-2xl lg:text-7xl">Today&#39;s<br className={'hidden lg:block'}/> Deals</div>
                                    <div className="w-full hidden lg:block text-xl lg:text-[1.5vw]">Get em&#39; before they&#39;re gone!</div>
                                </div>
                            </div>
                            <div className="content__featured__grid grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 gap-y-4 md:gap-8 col-span-2 max-w-6xl mt-6 md:mt-4 mx-auto">
                                {featuredProducts.map(product => (
                                    <ProductCard key={product.id} product={product} size="lg" showDiscount={true} showLowStock={true}/>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    {/* Category Selection */}
                    {!selectedCategory && (
                        <div className="content__categories w-full pt-4 px-6 md:px-8 max-w-[1400px] mx-auto">
                            <h2 className="content__categories-title text-3xl font-semibold text-center">Categories</h2>
                            <div className="content__categories-inner lg:flex flex-row md:block w-full mx-auto mt-4">
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:pl-4 mt-4 md:mt-0">
                                    {categories.map(product => (
                                        <ProductCard key={product.id} product={product} size="lg" categoryCard={true} showDiscount={true} showLowStock={true}/>
                                    ))}
                                </div>
                            </div>
                            <div className="content__categories-ad w-full max-w-[1400px] mx-auto mt-4">
                                <img src={BamazonAd} alt="Bamazon Ad" className="w-full"/>
                            </div>
                        </div>
                    )}
                    
                    {/* Products Filtered By Category*/}
                    {selectedCategory && (
                        <div className="content__category-products w-full pt-4 px-6 md:px-8">
                            <div className="content__category-products-title text-3xl font-semibold text-center">{capitalizeFirstLetter(selectedCategory)}</div>
                            <div className="content__category-products-inner w-full max-w-[1400px] mx-auto mt-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:pl-4 mt-4 md:mt-0">
                                    {filteredProducts.map(product => (
                                        <ProductCard key={product.id} product={product} showLowStock={true}/>
                                    ))}
                                </div>
                                <Sidebar/>
                            </div>
                        </div>
                    )}
                </>
            )}
            {/* Filtered Products */}
            {isFiltering && (
                <div className={'content__filtered place-self-start w-full max-w-[1400px] ' + (filteredProducts.length === 0 ? '' : 'mx-auto')}>
                    <div className="content__product-grid w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product}/>
                        ))}
                        {filteredProducts.length === 0 && (
                            <div className="content__no-results text-2xl font-semibold text-center w-full row-span-full col-span-full place-self-center mt-4">No results found</div>
                        )}
                    </div>
                    <Sidebar filtering={isFiltering}/>
                </div>
            )}
            
            <SingleProductView className={'animate__animated ' + (selectedProduct ? 'zoomIn' : 'zoomOut')} selectedProduct={selectedProduct}/>
            
            {/*<div className="chat-widget-btn flex items-center justify-center w-14 h-14 bg-blue-600 border-blue-400 border-2 rounded-full top-[90%] mb-4 right-4 float-right sticky">*/}
            {/*    <FontAwesomeIcon icon="fa-comments" classes="text-white text-2xl"/>*/}
            {/*</div>*/}
        </main>
    )
}

Content.propTypes = {
    isLoading: PropTypes.bool.isRequired,
}