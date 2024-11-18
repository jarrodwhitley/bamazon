import { useMemo } from 'react';
import FontAwesomeIcon from './FontAwesomeIcon.jsx';
import ProductCard from './ProductCard.jsx';
import { useProducts } from './ContextProvider.jsx';

function Content() {
    const products = useProducts();
    console.log('Content => products', products);
    const featuredProducts = useMemo(() => {
        return products.filter(product => product.featured);
    }, [products]);
    
    return (
        <main className="h-screen">
            <div className="featured-items">
                <h2 className="text-3xl font-bold text-center">Featured Items</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {featuredProducts.map(product => (
                        <ProductCard key={product.id} product={product}/>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {products.map(product => (
                    <ProductCard key={product.id} product={product}/>
                ))}
            </div>
            <div className="chat-widget-btn flex items-center justify-center w-14 h-14 bg-blue-600 border-blue-400 border-2 rounded-full top-[90%] mb-4 right-4 float-right sticky">
                <FontAwesomeIcon icon="fa-comments" classes="text-white text-2xl"/>
            </div>
        </main>
    )
}

export default Content;