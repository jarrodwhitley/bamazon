import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from '../components/ProductCard'

export default function RelatedProductsView() {
    const dispatch = useDispatch()
    const selectedProduct = useSelector((state) => state.selectedProduct)
    const products = useSelector((state) => state.products)
    
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
        <div className={'max-w-[1400px] mx-auto'}>
            <h1 className="text-2xl font-semibold text-center mt-4">BAMazon recommends:</h1>
            <h2 className="text-xl text-center mt-4">People who bought &#34;{selectedProduct.title}&#34; also bought these items</h2>
            <div className="related-cats__grid w-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 mx-auto">
                {selectedProduct && selectedProduct.category && selectedProduct.category.length > 0 ? (
                    products
                        .filter((product) => product.category === selectedProduct.category)
                        .map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                ) : (
                    <div className="text-center">No related categories found</div>
                )}
            </div>
        </div>
    )
}