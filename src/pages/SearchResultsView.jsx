import React, { useEffect, useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import ProductCard from '../components/ProductCard'
import { scrollToTop } from '../utils/functions.jsx'
import store from '../store.js'
import { updateFilters, clearFilters } from '../store/filtersSlice.js'
import Sidebar from '../components/Sidebar.jsx'
import { arrayMatch } from '../utils/functions.jsx'

export default function SearchResultsView() {
    const dispatch = store.dispatch
    const products = useSelector(state => state.products)
    const searchString = useSelector(state => state.filters.searchString)
    const selectedBrands = useSelector(state => state.filters.brands)
    const selectedPrice = useSelector(state => state.filters.price)
    const [staticSearchString, setStaticSearchString] = useState('')
    const [staticSearchResults, setStaticSearchResults] = useState([])
    const [sideBarFilters, setSideBarFilters] = useState([])
    const [staticFilters, setStaticFilters] = useState({ brands: [], price: '' })
    const [initialClear, setInitialClear] = useState(false)
    //  Update Static Search Results
    useEffect(() => {
        scrollToTop()
        if (!searchString) {
            const search = window.location.hash.split('/')[2]
            setStaticSearchString(search)
        } else {
            setStaticSearchString(searchString)
        }
        
        // First filter products by search string
        const sidebarResults = products.filter(product => {
            return product.title.toLowerCase().includes(staticSearchString.toLowerCase())
        })
        setSideBarFilters(sidebarResults)
        
        const searchResults = products.filter(product => {
            let brandMatch = staticFilters.brands.length < 1 || staticFilters.brands.includes(product.brand)
            const [min, max] = staticFilters.price.split('_')
            let priceMatch = !staticFilters.price || (product.price >= min && product.price <= max)
            let searchMatch = product.title.toLowerCase().includes(staticSearchString.toLowerCase())
            return brandMatch && priceMatch && searchMatch
        })
        setStaticSearchResults(searchResults)
        
        // if initialClear is false, clear filters
        if (!initialClear && staticSearchString && staticSearchResults.length > 0) {
            dispatch(clearFilters())
            setInitialClear(true)
        }
    }, [dispatch, initialClear, products, searchString, staticFilters.brands, staticFilters.price, staticSearchResults.length, staticSearchString])
    // Update Static Filters
    useEffect(() => {
        if (!arrayMatch(selectedBrands, staticFilters.brands)) {
            setStaticFilters({ ...staticFilters, brands: selectedBrands })
        }
        if (staticFilters.price !== selectedPrice) {
            setStaticFilters({ ...staticFilters, price: selectedPrice })
        }
        if (searchString && staticSearchString !== searchString) {
            setStaticSearchString(searchString)
        }
    }, [staticSearchString, selectedBrands, selectedPrice, staticFilters, searchString])

    
    return (
        <div className={'results-view'}>
            <h1 className={'results-view__heading'}>{`Results for "${staticSearchString}"`}</h1>
            <div className={'results-view__content'}>
                <Sidebar initialProducts={sideBarFilters} filterType={'search'} filterString={staticSearchString} />
                {staticSearchResults.length > 0 && (
                    <div className={'results-view__content__grid'}>
                        {staticSearchResults.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
                {staticSearchResults.length < 1 && (
                    <div className={'results-view__no-results flex items-center justify-center absolute-centered'}>
                        <h2 className={'text-xl'}>No results ¯\_(ツ)_/¯</h2>
                    </div>
                )}
            </div>
        </div>
    )
}