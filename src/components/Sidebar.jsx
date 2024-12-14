import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { setFilters, updateFilters, clearFilters, filtersActive } from '../store/filtersSlice'
import { capitalizeFirstLetter, arrayMatch } from '../utils/functions'
import { filteredProducts } from '../store/productsSlice.js'
import { Link } from 'react-router-dom'
import selectedProductSlice from '../store/selectedProductSlice.js'

export default function Sidebar({ productsArray = null }) {
    const dispatch = useDispatch()
    const isMobile = useSelector((state) => state.ui.isMobile)
    const products = useSelector((state) => state.products)
    const selectedFilters = useSelector((state) => state.filters)
    const filteredProductsState = useSelector(filteredProducts)
    const filtersActiveState = useSelector(filtersActive)
    const [categoryLinks, setCategoryLinks] = useState([])
    const [prevCategory, setPrevCategory] = useState('')
    const [brands, setBrands] = useState([])
    const prices = [
        { min: 0, max: 50 },
        { min: 51, max: 100 },
        { min: 101, max: 1000 },
    ]
    const [showFilters, setShowFilters] = useState(false)
    const isRouteActive = (path) => location.pathname.startsWith(path)
    
    console.log('------------------------------')
    
    useEffect(() => {
        if (!arrayMatch(brands, selectedFilters.brands)) {
            setBrands(selectedFilters.brands)
        }
    },[selectedFilters])
    
    useEffect(() => {
        let productsArr = productsArray || products
        if (categoryLinks.length === 0) {
            const newCategories = products.reduce((acc, product) => {
                if (!acc.includes(product.category) && product.category !== undefined) {
                    acc.push(product.category)
                }
                return acc
            }, [])
            setCategoryLinks(newCategories)
            setPrevCategory(newCategories[0])
        }
        const selectedCategoryHasBrands = productsArr.some((product) => {
            return product.category === selectedFilters.categories[0] && product.brand !== undefined
        })
        console.log('productsArr', productsArr)
        console.log('productsArray', productsArray)
        console.log('selectedCategoryHasBrands', selectedCategoryHasBrands)
        console.log('brands array empty => ', brands.length === 0)
        console.log('isRouteActive(\'results\')', isRouteActive('/results'))
        console.log('----')
        console.log('prevCategory !== selectedFilters.categories[0]', prevCategory !== selectedFilters.categories[0])
        console.log('prevCategory', prevCategory)
        console.log('selectedFilters.categories[0]', selectedFilters.categories[0])
        
        if (brands.length > 0) {
            // Do nothing
        } else if (isRouteActive('/results') && selectedCategoryHasBrands && brands.length === 0 ||
            brands.length === 0 && selectedCategoryHasBrands ||
            prevCategory !== selectedFilters.categories[0]) {
            console.log('UPDATING BRANDS')
            // console.log('productsArr 2', productsArray)
            const newBrands = productsArray.reduce((acc, product) => {
                if (!acc.includes(product.brand) && product.brand !== undefined) {
                    acc.push(product.brand)
                }
                return acc
            }, [])
            setBrands(newBrands)
            setPrevCategory(selectedFilters.categories[0])
        }
    }, [brands.length, categoryLinks.length, prevCategory, products, productsArray, selectedFilters.categories])
    
    const handleCheckboxChange = () => {
        let checkboxes = document.querySelectorAll('input[type="checkbox"]')
        let checkboxesObj = {
            categories: [],
            brands: [],
            price: '',
        }
        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                let [type, value] = checkbox.id.split('-')
                if (type === 'price') {
                    checkboxesObj[type] = value
                } else {
                    checkboxesObj[type].push(value)
                }
            }
        })
        dispatch(
            setFilters({
                ...checkboxesObj,
                categories: selectedFilters.categories || [],
                searchString: selectedFilters.searchString || '',
            }),
        )
    }
    const handleClearFilters = () => {
        dispatch(clearFilters())
        if (document.querySelector('.clear-icon')) {
            document.querySelector('.clear-icon').click()
        }
    }
    const handleLinkClick = (category) => {
        dispatch(updateFilters({ categories: [category], brands: [] }))
        document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
            checkbox.checked = false
        })
    }
    
    return (
        <>
            <div className={'sidebar px-4 h-fit left-0 min-w-[300px] lg:w-1/5 ' +
                (!isMobile ? 'sticky ' : '') +
                (isMobile ? 'block bg-white fixed top-auto bottom-0 right-0 shadow-2xl shadow-black text-xl p-6 z-10 transition ' : '') +
                (isMobile && !showFilters ? 'translate-y-full' : '') + (isMobile && showFilters ? ' ' : '')}>
                {isMobile && (
                    <div className={'sidebar__mobile-filter-btn w-[160px] flex items-center justify-center absolute -top-10 right-0 z-50 bg-blue-500 text-white text-base font-semibold p-2 rounded-t shadow '} onClick={() => setShowFilters(!showFilters)}>
                        {(showFilters ? 'Hide' : 'Show') + ' filters'}
                        <i className={'text-lg fa-solid fa-filter pl-2'}></i>
                    </div>
                )}
                <div className={'sidebar__filter-title text-xl font-semibold'}>Filters</div>
                <div className={'sidebar__filter-container'}>
                    {/* Category links */}
                    {!isMobile && (
                        <div className={'sidebar__filter-section category-filter mt-2'}>
                            <h3 className={'text-base font-semibold text-gray-400'}>Categories</h3>
                            <div className={'sidebar__filter-list mt-2'}>
                                {categoryLinks.map((category, index) => (
                                    <Link to={`/category/${category}`} key={index} className={'w-fit flex text-blue-600 hover:underline items-center select-none gap-2'} onClick={() => (handleLinkClick(category))}>
                                        <span className={'text-base'}>{capitalizeFirstLetter(category)}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                    {/* Brand filters */}
                    {brands.filter(Boolean).length > 0 && (
                        <div className={'sidebar__filter-section brand-filter mt-2'}>
                            <h3 className={'text-base font-semibold text-gray-400'}>Brands</h3>
                            <div className={'sidebar__filter-list'}>
                                {brands.map((brand, index) => (
                                    <label className={'w-fit flex items-center select-none gap-2'} key={index} htmlFor={`brands-${brand}`}>
                                        <input type={'checkbox'} id={`brands-${brand}`} onChange={handleCheckboxChange} />
                                        <span className={'text-base'}>{capitalizeFirstLetter(brand)}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className={'sidebar__filter-section mt-2'}>
                        <h3 className={'text-base font-semibold text-gray-400'}>Price</h3>
                        <div className={'sidebar__filter-list'}>
                            {prices.map((price, index) => (
                                <label className={'w-fit flex items-center select-none gap-2'} key={index} htmlFor={`price-${price.min}_${price.max}`}>
                                    <input
                                        type={'checkbox'}
                                        id={`price-${price.min}_${price.max}`}
                                        onChange={(e) => {
                                            // Uncheck all other checkboxes
                                            document.querySelectorAll('input[type="checkbox"][id^="price-"]').forEach((checkbox) => {
                                                if (checkbox !== e.target) {
                                                    checkbox.checked = false
                                                }
                                            })
                                            handleCheckboxChange()
                                        }}
                                    />
                                    <span className={'text-base'}>
                                        ${price.min} - ${price.max}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

Sidebar.propTypes = {
    productsArray: PropTypes.array,
}
