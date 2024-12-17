import React from 'react'
import {useMemo, useEffect} from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { clearFilters, filtersActive } from '../store/filtersSlice'
import { filteredProducts, productsLoaded } from '../store/productsSlice'
import { setIsLoading } from '../store/uiSlice'
import ProductCard from '../components/ProductCard'
import Sidebar from '../components/Sidebar'
import SearchBar from '../components/SearchBar'
import BamazonAd from '../assets/images/bamazon_ad.png'
import HeaderImage from '../assets/images/header_image.png'
import {capitalizeFirstLetter} from '../utils/functions'
import { Link } from 'react-router-dom'

export default function Home() {
    const dispatch = useDispatch()
    const isLoading = useSelector((state) => state.ui.isLoading)
    const isMobile = useSelector((state) => state.ui.isMobile)
    const products = useSelector((state) => state.products) // store.js state values accessed this way
    const productsLoadDone = useSelector(productsLoaded) // other values accessed this way
    const filteredProductsState = useSelector(filteredProducts) // other values accessed this way
    const selectedFilters = useSelector((state) => state.filters)
    const filtersActiveState = useSelector(filtersActive)
    const selectedCategory = useSelector((state) => state.filters.category)
    const selectedProduct = useSelector((state) => state.selectedProduct)
    const featuredProducts = useMemo(() => {
        return products?.filter((product) => product.featured)
    }, [products])
    const categories = products.reduce((acc, product) => {
        const categorySet = new Set(acc.map((item) => item.category))
        if (!categorySet.has(product.category)) {
            acc.push(product)
        }
        return acc
    }, [])
    const handleClearFilters = () => {
        dispatch(clearFilters())
    }
    useEffect(() => {
        if (selectedFilters.category) {
            const rootElement = document.getElementById('root')
            if (rootElement) {
                rootElement.scrollIntoView({
                    behavior: 'instant',
                    block: 'start',
                })
            }
        }
    }, [selectedFilters.category])
    useEffect(() => {
        if (products.length > 0 && isLoading) {
            dispatch(setIsLoading(false));
        }
    }, [products, isLoading, dispatch]);

    return (
        <main className={'overflow-x-hidden relative scroll-mt-[80px] pb-2 '}>
            {isMobile && (
                <div className={'home__search-bar__container bg-blue-950 w-full flex justify-center'}>
                    <SearchBar classes={'search-bar w-full relative p-4'} />
                </div>
            )}
            
                <div className={'home__header h-[65vh] lg:h-full lg:px-6 lg:py-10'}>
                    <div className={'home__header-grid grid grid-cols-1 md:grid-cols-3 grid-rows-1 items-center max-w-[1400px] mx-auto'}>
                        <div className={'home__header-text h-full w-fit flex flex-col items-start place-self-start lg:place-self-end justify-center text-white col-span-full lg:col-start-2 lg:col-span-2 row-start-1 pl-4 lg:pl-20 pr-6 z-[1] font-semibold'}>
                            <div className="home__header-text__title font-bold text-5xl md:text-7xl">
                                Find Your <br className={'md:hidden'}></br>
                                Fashion
                            </div>
                            <div className="home__header-text__subtitle text-lg md:text-4xl">Starting at only $19.99</div>
                            <div className={'w-fit mt-4 px-4 py-2 text-lg rounded bg-blue-500 text-white font-semibold flex items-center cursor-not-allowed'}>Shop Now</div>
                        </div>
                        <figure className="home__header-image w-full h-full col-span-full row-span-full overflow-hidden">
                            <img src={HeaderImage} alt="Bamazon Ad" className="w-full h-[65vh] lg:h-[400px] lg:min-h-[600px] max-w-[unset] object-cover object-left md:object-fit" />
                        </figure>
                    </div>
                </div>
                <div className="home__featured featured-items w-full lg:max-h-fit bg-gradient-to-tr from-blue-800 to-blue-500 lg:p-6">
                    <div className="home__featured-grid lg:grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-8 pt-6 pb-8 max-w-[1400px] mx-auto">
                        <div className="home__featured__cta text-8xl flex items-center w-fit lg:w-full text-white mt-4 p-2 lg:p-6 mx-auto rounded font-bold">
                            <div className="cta__text">
                                <div className="w-full text-3xl lg:text-7xl">
                                    Today&#39;s
                                    <br className={'hidden lg:block'} /> Deals
                                </div>
                                <div className="w-full hidden lg:block text-xl lg:text-[1.5vw]">Get em&#39; before they&#39;re gone!</div>
                            </div>
                        </div>
                        <div className="home__featured__grid flex lg:grid grid-cols-4 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 col-span-2 lg:max-w-6xl my-6 md:mt-4 mx-auto px-6 lg:pl-0 overflow-x-auto lg:overflow-hidden snap-x snap-mandatory">
                            {featuredProducts.map((product) => (
                                <Link to={`/product/${product.id}`} key={product.id + 1}>
                                    <ProductCard key={product.id} product={product} showDiscount={true} showLowStock={true} featuredCard={true} />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            
                {/* Categories Section */}
            <div className="home__categories">
                <div className={'home__categories__grid-outer'}>
                    <h2 className={'home__categories__title'}>Categories</h2>
                    <div className={'home__categories__grid-inner'}>
                        {categories.map((product) => (
                            <ProductCard key={product.id} product={product} size="lg" categoryCard={true} showDiscount={true} showLowStock={true} />
                        ))}
                    </div>
                    <div className={'home__categories-ad'}>
                        <img src={BamazonAd} alt="Bamazon Ad" className="w-full" />
                    </div>
                </div>
            </div>
        </main>
    )
}