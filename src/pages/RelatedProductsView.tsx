import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useLocation} from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import {setSelectedProduct} from '../store/selectedProductSlice.ts'

export default function RelatedProductsView() {
    const dispatch = useDispatch()
    const selectedProduct = useSelector((state) => state.selectedProduct)
    const products = useSelector((state) => state.products)
    const location = useLocation()

    useEffect(() => {
        // /product/[id]/related
        // that's where the id is
        if (!selectedProduct.id) {
            const id = location.pathname.split('/')[2]
            const product = products.find((product) => product.id === parseInt(id))
            dispatch(setSelectedProduct(product))
        }
    }, [dispatch, selectedProduct, products])

    useEffect(() => {
        const rootElement = document.getElementById('root')
        if (rootElement) {
            rootElement.scrollIntoView({
                behavior: 'instant',
                block: 'start',
            })
        }
    }, [])

    return (
        <div className={'related-categories'}>
            <h1 className="text-2xl font-semibold text-center mt-4">BAMazon recommends:</h1>
            <h2 className="text-xl text-center mt-4">People who bought &#34;{selectedProduct.title}&#34; also bought these items</h2>
            <div className="related-categories__grid">{selectedProduct && selectedProduct.category && selectedProduct.category.length > 0 ? products.filter((product) => product.category === selectedProduct.category).map((product) => <ProductCard key={product.id} product={product} />) : <div className="text-center">No related categories found</div>}</div>
        </div>
    )
}
