import { useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { clearFilters, filtersActive } from '../store/filtersSlice'
import { filteredProducts } from '../store/productsSlice'
import ProductCard from './ProductCard'
import Sidebar from './Sidebar'
import BamazonAd from '../assets/images/bamazon_ad.png'
import HeaderImage from '../assets/images/header_image.png'
import SingleProductView from './SingleProductView'
import SearchBar from './SearchBar'
import Cart from './Cart'
import { capitalizeFirstLetter } from '../utils/functions'

export default function Content({ isLoading }) {
    const dispatch = useDispatch()
    const isMobile = useSelector((state) => state.ui.isMobile)
    const products = useSelector((state) => state.products) // store.js state values accessed this way
    const filteredProductsState = useSelector(filteredProducts) // other values accessed this way
    const selectedFilters = useSelector((state) => state.filters)
    const filtersActiveState = useSelector(filtersActive)
    const selectedCategories = useSelector((state) => state.filters.categories)
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
        if (selectedFilters.categories.length > 0) {
            const rootElement = document.getElementById('root')
            if (rootElement) {
                rootElement.scrollIntoView({
                    behavior: 'instant',
                    block: 'start',
                })
            }
        }
    }, [selectedFilters.categories])

    return (
        <main
            className={
                'overflow-x-hidden relative scroll-mt-[80px] pb-2 ' +
                (filtersActiveState ? 'flex md:mt-4 ' : '')
            }
        >
            {isMobile && !filtersActiveState && (
                <div
                    className={
                        'content__search-bar__container bg-blue-950 w-full flex justify-center'
                    }
                >
                    <SearchBar classes={'search-bar w-full relative p-4'} />
                </div>
            )}

            {!filtersActiveState && (
                <>
                    <div
                        className={
                            'content__header h-[65vh] lg:h-full lg:px-6 lg:py-10'
                        }
                    >
                        <div
                            className={
                                'content__header-grid grid grid-cols-1 md:grid-cols-3 grid-rows-1 items-center max-w-[1400px] mx-auto'
                            }
                        >
                            <div
                                className={
                                    'content__header-text h-full w-fit flex flex-col items-start place-self-start lg:place-self-end justify-center text-white col-span-full lg:col-start-2 lg:col-span-2 row-start-1 pl-4 lg:pl-20 pr-6 z-[1] font-semibold'
                                }
                            >
                                <div className="content__header-text__title font-bold text-5xl md:text-7xl">
                                    Find Your <br className={'md:hidden'}></br>
                                    Fashion
                                </div>
                                <div className="content__header-text__subtitle text-lg md:text-4xl">
                                    Starting at only $19.99
                                </div>
                                <div
                                    className={
                                        'w-fit mt-4 px-4 py-2 text-lg rounded bg-blue-500 text-white font-semibold flex items-center cursor-pointer'
                                    }
                                >
                                    Shop Now
                                </div>
                            </div>
                            <figure className="content__header-image w-full h-full col-span-full row-span-full overflow-hidden">
                                <img
                                    src={HeaderImage}
                                    alt="Bamazon Ad"
                                    className="w-full h-[65vh] lg:h-[400px] lg:min-h-[600px] max-w-[unset] object-cover object-left md:object-fit"
                                />
                            </figure>
                        </div>
                    </div>
                    <div className="content__featured featured-items w-full lg:max-h-fit bg-gradient-to-tr from-blue-800 to-blue-500 lg:p-6">
                        <div className="content__featured-grid lg:grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-8 pt-6 pb-8 max-w-[1400px] mx-auto">
                            <div className="content__featured__cta text-8xl flex items-center w-fit lg:w-full text-white mt-4 p-2 lg:p-6 mx-auto rounded font-bold">
                                <div className="cta__text">
                                    <div className="w-full text-3xl lg:text-7xl">
                                        Today&#39;s
                                        <br
                                            className={'hidden lg:block'}
                                        />{' '}
                                        Deals
                                    </div>
                                    <div className="w-full hidden lg:block text-xl lg:text-[1.5vw]">
                                        Get em&#39; before they&#39;re gone!
                                    </div>
                                </div>
                            </div>
                            <div className="content__featured__grid flex lg:grid grid-cols-4 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 col-span-2 lg:max-w-6xl my-6 md:mt-4 mx-auto px-6 lg:pl-0 overflow-x-auto lg:overflow-hidden snap-x snap-mandatory">
                                {featuredProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        showDiscount={true}
                                        showLowStock={true}
                                        featuredCard={true}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {selectedCategories.length < 1 && (
                        <div className="content__categories w-full py-8 px-6 md:px-8">
                            <div
                                className={
                                    'content__categories-grid max-w-[1400px] mx-auto'
                                }
                            >
                                <h2 className="content__categories-title text-3xl font-semibold text-blue-950 text-center">
                                    Categories
                                </h2>
                                <div className="content__categories-inner lg:flex flex-row md:block w-full mx-auto mt-8">
                                    <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-6 md:pl-8 mt-4 md:mt-0">
                                        {categories.map((product) => (
                                            <ProductCard
                                                key={product.id}
                                                product={product}
                                                size="lg"
                                                categoryCard={true}
                                                showDiscount={true}
                                                showLowStock={true}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="content__categories-ad w-full max-w-[1400px] mx-auto mt-12">
                                    <img
                                        src={BamazonAd}
                                        alt="Bamazon Ad"
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {selectedCategories.length > 0 && (
                        <div
                            className={
                                'content__category-products w-full pt-4 px-6 md:px-8'
                            }
                        >
                            <div className="content__category-products-title text-3xl font-semibold text-center">
                                {capitalizeFirstLetter(
                                    selectedFilters.categories[0]
                                )}
                            </div>
                            <div className="content__category-products-inner w-full max-w-[1400px] mx-auto mt-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:pl-4 mt-4 md:mt-0">
                                    {filteredProductsState.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                            showLowStock={true}
                                        />
                                    ))}
                                </div>
                                <Sidebar />
                            </div>
                        </div>
                    )}
                </>
            )}

            {filtersActiveState && (
                <div
                    className={
                        'content__filtered flex-col place-self-start w-full max-w-[1400px] mx-auto'
                    }
                >
                    <div className="content__product-grid w-full grid grid-cols-2 lg:grid-cols-4 gap-4 px-4">
                        {filteredProductsState.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                showLowStock={true}
                            />
                        ))}
                        {filteredProductsState.length === 0 && (
                            <div className="content__no-results text-2xl font-semibold text-center w-full row-span-full col-span-full place-self-center mt-4">
                                No results found
                            </div>
                        )}
                    </div>
                    {isMobile && (
                        <div
                            className={
                                'content__filter-clear flex items-center justify-center text-base font-semibold text-gray-400 cursor-pointer w-fit hover:text-blue-400 p-4'
                            }
                            onClick={handleClearFilters}
                        >
                            <i className={'fa-solid fa-arrow-left pr-2'}></i>
                            Back
                        </div>
                    )}
                    <Sidebar />
                </div>
            )}

            <SingleProductView
                className={
                    'animate__animated ' +
                    (selectedProduct ? 'zoomIn' : 'zoomOut')
                }
            />

            <Cart />
        </main>
    )
}

Content.propTypes = {
    isLoading: PropTypes.bool.isRequired,
}
