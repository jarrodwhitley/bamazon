import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import ProductCard from '../components/ProductCard'
import Sidebar from '../components/Sidebar'
import store from '../store.js'
import { filteredProducts } from '../store/productsSlice.js'
import { updateFilters } from '../store/filtersSlice.js'
import { capitalizeFirstLetter, scrollToTop } from '../utils/functions.jsx'

export default function CategoryView() {
    const dispatch = store.dispatch
    const filters = useSelector(state => state.filters);
    const products = useSelector(state => state.products);
    const filteredProductsState = useSelector(filteredProducts)
    const selectedCategory = useSelector(state => state.filters.categories[0])
    
    useEffect(() => {
        scrollToTop()
        if (filters.categories.length === 0) {
            const category = window.location.pathname.split('/').pop()
            dispatch(updateFilters({categories: [category]}))
        }
    }, [dispatch, filters])
    
    return (
        <>
            {selectedCategory && (
                <div className={'results-view'}>
                    <h1 className={'results-view__heading'}>{capitalizeFirstLetter(selectedCategory)}</h1>
                    <div className={'results-view__content'}>
                        <Sidebar productsArray={filteredProductsState}/>
                        <div className="results-view__content__grid">
                            {filteredProductsState.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}