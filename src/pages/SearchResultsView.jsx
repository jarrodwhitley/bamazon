import React, { useEffect, useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import ProductCard from '../components/ProductCard'
import { scrollToTop } from '../utils/functions.jsx'
import store from '../store.js'
import { updateFilters, clearFilters } from '../store/filtersSlice.js'
import Sidebar from '../components/Sidebar.jsx'

export default function SearchResultsView() {
    const dispatch = store.dispatch
    const products = useSelector(state => state.products);
    const searchString = useSelector(state => state.filters.searchString);
    const [initialClear, setInitialClear] = useState(false)
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            return product.title.toLowerCase().includes(searchString.toLowerCase())
        })
    }, [products, searchString])
    
    useEffect(() => {
        scrollToTop()
        // if search string is empty, update filters with search string
        if (!searchString) {
            console.log('search string is empty, updating filters with search string')
            const search = window.location.pathname.split('/').pop()
            dispatch(updateFilters({searchString: search}))
        }
        // if initialClear is false, clear filters
        if (!initialClear) {
            console.log('clearing filters and setting initialClear to true')
            dispatch(clearFilters())
            setInitialClear(true)
        }
    }, [dispatch, searchString])
    
    return (
        <div className={'results-view'}>
            <h1 className={'results-view__heading opacity-0'}>test</h1>
            <div className={'results-view__content'}>
                <Sidebar products={filteredProducts}/>
                <div className="results-view__content__grid">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    )
}