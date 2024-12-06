import {useMemo, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard.jsx';
import Sidebar from "./Sidebar.jsx";
import {
    useFilteredProducts,
    useSetFilteredProducts,
    useProducts,
    useSelectedProduct,
    useSelectedCategory,
    useIsFiltering,
    useSetIsFiltering,
    useSelectedFilters,
    useSetSelectedFilters
} from './ContextProvider.jsx';
import BamazonAd from '../assets/images/bamazon_ad.png';
import HeaderImage from '../assets/images/header_image.png';
import SingleProductView from "./SingleProductView.jsx";
import SearchBar from "./SearchBar.jsx";
import Cart from "./Cart.jsx";
import {capitalizeFirstLetter} from "../utils/functions.jsx";

export default function Content({isLoading}) {
    const isMobile = window.innerWidth < 768;
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
    const selectedFilters = useSelectedFilters();
    const setSelectedFilters = useSetSelectedFilters();
    const categories = products.reduce((acc, product) => {
        const categorySet = new Set(acc.map(item => item.category));
        if (!categorySet.has(product.category)) {
            acc.push(product);
        }
        return acc;
    }, []);
    const defaultFilters = {
        categories: [],
        brands: [],
        price: '',
        searchString: ''
    }
    const filterProducts = (filtersActive = false) => {
        let searchString = selectedFilters.searchString;
        if (searchString && searchString.length > 2) {
            let filtered = products.filter(product => {
                return product.title.toLowerCase().includes(searchString.toLowerCase()) ||
                    product.tags.join(' ').toLowerCase().includes(searchString.toLowerCase()) ||
                    (product.brand && product.brand.toLowerCase().includes(searchString.toLowerCase())) ||
                    product.description.toLowerCase().includes(searchString.toLowerCase());
            });
            if (selectedFilters && filtersActive) {
                filtered = filtered.filter(product => {
                    const categoryMatch = selectedFilters.categories.includes(product.category) || selectedFilters.categories.length === 0;
                    const brandMatch = selectedFilters.brands.includes(product.brand) || selectedFilters.brands.length === 0;
                    const priceMatch = (product.price >= parseInt(selectedFilters.price.split('_')[0]) && product.price <= parseInt(selectedFilters.price.split('_')[1])) || selectedFilters.price.length === 0;
                    return categoryMatch && brandMatch && priceMatch;
                });
                setFilteredProducts(filtered);
                setIsFiltering(true);
            }
        } else if (selectedFilters && filtersActive && !searchString) {
            let filtered = products.filter(product => {
                const categoryMatch = selectedFilters.categories.includes(product.category) || selectedFilters.categories.length === 0;
                const brandMatch = selectedFilters.brands.includes(product.brand) || selectedFilters.brands.length === 0;
                const priceMatch = (product.price >= parseInt(selectedFilters.price.split('_')[0]) && product.price <= parseInt(selectedFilters.price.split('_')[1])) || selectedFilters.price.length === 0;
                return categoryMatch && brandMatch && priceMatch;
            });
            setFilteredProducts(filtered);
            setIsFiltering(true);
        } else if (selectedCategory) {
            let filtered = products.filter(product => product.category === selectedCategory);
            setFilteredProducts(filtered);
            setIsFiltering(true);
        } else {
            setFilteredProducts(products);
            setIsFiltering(false);
        }
    };
    
    useEffect(() => {
        if (!selectedFilters) return;
        let activeFilters = [];
        if (selectedFilters) {
            const filterValues = Object.values(selectedFilters);
            const defaultValues = Object.values(defaultFilters);
            activeFilters = filterValues.filter((value, index) => value?.length > 0 && value !== defaultValues[index]);
        }
        filterProducts(activeFilters.length > 0);
    }, [selectedFilters]);
    useEffect(() => {
        if (!selectedFilters.searchString) return;
        setSelectedFilters({
            searchString: selectedFilters.searchString,
            categories: [],
            brands: [],
            price: ''
        })
        filterProducts();
    }, [selectedFilters.searchString]);
    useEffect(() => {
        if (selectedFilters.categories.length > 0) {
            const rootElement = document.getElementById('root');
            if (rootElement) {
                rootElement.scrollIntoView({ behavior: 'instant', block: 'start' });
            }
        }
    }, [selectedFilters.categories]);
    
    return (
        <main className={'overflow-x-hidden relative scroll-mt-[80px] pb-2 ' + (isFiltering ? 'flex md:mt-4 ' : '')}>
            
            {isMobile && (
                <div className={'content__search-bar__container bg-blue-950 w-full flex justify-center'}>
                    <SearchBar classes={'search-bar w-full relative p-4'}/>
                </div>
            )}
            
            {!isFiltering && (
                <>
                    {/* Header Image */}
                    <div className={'content__header h-[65vh] lg:h-full lg:px-6 lg:py-10'}>
                        <div className={'content__header-grid grid grid-cols-1 md:grid-cols-3 grid-rows-1 items-center max-w-[1400px] mx-auto'}>
                            <div className={'content__header-text h-full w-fit flex flex-col items-start place-self-start lg:place-self-end justify-center text-white col-span-full lg:col-start-2 lg:col-span-2 row-start-1 pl-4 lg:pl-20 pr-6 z-[1] font-semibold'}>
                                <div className="content__header-text__title font-bold text-5xl md:text-7xl">Find Your <br className={'md:hidden'}></br>Fashion</div>
                                <div className="content__header-text__subtitle text-lg md:text-4xl">Starting at only $19.99</div>
                                <div className={'w-fit mt-4 px-4 py-2 text-lg rounded bg-blue-500 text-white font-semibold flex items-center cursor-pointer'}>Shop Now</div>
                            </div>
                            <figure className="content__header-image w-full h-full col-span-full row-span-full overflow-hidden">
                                <img src={HeaderImage} alt="Bamazon Ad" className="w-full h-[400px] lg:min-h-[600px] max-w-[unset] object-cover object-left md:object-fit"/>
                            </figure>
                        </div>
                    </div>
                    
                    {/* Featured Products */}
                    <div className="content__featured featured-items w-full max-h-fit bg-gradient-to-tr from-blue-800 to-blue-500 px-6">
                        <div className="content__featured-grid grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-8 py-4 max-w-[1400px] mx-auto">
                            <div className="content__featured__cta text-8xl flex items-center w-fit lg:w-full text-white mt-4 p-2 lg:p-6 mx-auto rounded font-bold">
                                <div className="cta__text">
                                    <div className="w-full text-3xl lg:text-7xl">Today&#39;s<br className={'hidden lg:block'}/> Deals
                                    </div>
                                    <div className="w-full hidden lg:block text-xl lg:text-[1.5vw]">Get em&#39; before they&#39;re gone!</div>
                                </div>
                            </div>
                            <div className="content__featured__grid grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 col-span-2 max-w-6xl my-6 md:mt-4 mx-auto">
                                {featuredProducts.map(product => (
                                    <ProductCard key={product.id} product={product} showDiscount={true} showLowStock={true}/>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    {/* Category Selection */}
                    {!selectedCategory && (
                        <div className="content__categories w-full py-4 px-6 md:px-8">
                            <div className={'content__categories-grid max-w-[1400px] mx-auto'}>
                                <h2 className="content__categories-title text-3xl font-semibold text-blue-950 text-center">Categories</h2>
                                <div className="content__categories-inner lg:flex flex-row md:block w-full mx-auto mt-8">
                                    <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-6 md:pl-8 mt-4 md:mt-0">
                                        {categories.map(product => (
                                            <ProductCard key={product.id} product={product} size="lg" categoryCard={true} showDiscount={true} showLowStock={true}/>
                                        ))}
                                    </div>
                                </div>
                                <div className="content__categories-ad w-full max-w-[1400px] mx-auto mt-8">
                                    <img src={BamazonAd} alt="Bamazon Ad" className="w-full"/>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* Products Filtered By Category*/}
                    {selectedCategory &&  (
                        <div className={'content__category-products w-full pt-4 px-6 md:px-8'}>
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
                <div className={'content__filtered place-self-start w-full max-w-[1400px] mx-auto'}>
                    <div className="content__product-grid w-full grid grid-cols-2 lg:grid-cols-4 gap-4 px-4">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} showLowStock={true}/>
                        ))}
                        {filteredProducts.length === 0 && (
                            <div className="content__no-results text-2xl font-semibold text-center w-full row-span-full col-span-full place-self-center mt-4">No results found</div>
                        )}
                    </div>
                    <Sidebar/>
                </div>
            )}
            
            <SingleProductView className={'animate__animated ' + (selectedProduct ? 'zoomIn' : 'zoomOut')} selectedProduct={selectedProduct}/>
            
            <Cart/>
            
            {/*<div className="chat-widget-btn flex items-center justify-center w-14 h-14 bg-blue-600 border-blue-400 border-2 rounded-full top-[90%] mb-4 right-4 float-right sticky">*/}
            {/*    <FontAwesomeIcon icon="fa-comments" classes="text-white text-2xl"/>*/}
            {/*</div>*/}
        </main>
    )
}

Content.propTypes = {
    isLoading: PropTypes.bool.isRequired
}