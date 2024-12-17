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
    const selectedCategory = useSelector(state => state.filters.category)
    
    useEffect(() => {
        scrollToTop()
        if (!filters.category) {
            const category = window.location.hash.split('/')[2]
            dispatch(updateFilters({category: category}))
        }
    }, [dispatch, filters.category])
    
    return (
        <>
            {selectedCategory && (
                <div className={'results-view'}>
                    <h1 className={'results-view__heading'}>{capitalizeFirstLetter(selectedCategory)}</h1>
                    <div className={'results-view__content'}>
                        <Sidebar initialProducts={filteredProductsState} filterType={'category'} filterString={selectedCategory}/>
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