import { useMemo } from 'react';
import FontAwesomeIcon from './FontAwesomeIcon.jsx';
import ProductCard from './ProductCard.jsx';
import { useProducts } from './ContextProvider.jsx';

function Content() {
    const products = useProducts();
    const featuredProducts = useMemo(() => {
        return products.filter(product => product.featured);
    }, [products]);
    
    return (
        <main className="main-grid h-full min-h-screen">
            <div className="main-grid__featured featured-items bg-gray-400 p-4">
                <h2 className="text-3xl mb-4 font-bold text-center">Featured Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {featuredProducts.map(product => (
                        <ProductCard key={product.id} product={product} size="lg"/>
                    ))}
                </div>
            </div>
            <div className="main-grid__content">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product}/>
                    ))}
                </div>
            </div>
            <div className="main-grid__sidebar p-4 h-fit sticky top-0 left-0">
                <div className="filter-section">
                    <h3 className="text-xl font-semibold">Categories</h3>
                    <div className="filter-section__content">
                        <label htmlFor="category-1">
                            <input type="checkbox" id="category-1"/>
                            Category 1
                        </label>
                        <label htmlFor="category-2">
                            <input type="checkbox" id="category-2"/>
                            Category 2
                        </label>
                        <label htmlFor="category-3">
                            <input type="checkbox" id="category-3"/>
                            Category 3
                        </label>
                    </div>
                </div>
                <div className="filter-section">
                    <h3 className="text-xl font-semibold">Brands</h3>
                    <div className="filter-section__content">
                        <label htmlFor="brand-1">
                            <input type="checkbox" id="brand-1"/>
                            Brand 1
                        </label>
                        <label htmlFor="brand-2">
                            <input type="checkbox" id="brand-2"/>
                            Brand 2
                        </label>
                        <label htmlFor="brand-3">
                            <input type="checkbox" id="brand-3"/>
                            Brand 3
                        </label>
                    </div>
                </div>
                <div className="filter-section">
                    <h3 className="text-xl font-semibold">Price</h3>
                    <div className="filter-section__content">
                        <label htmlFor="price-1">
                            <input type="checkbox" id="price-1"/>
                            $0 - $50
                        </label>
                        <label htmlFor="price-2">
                            <input type="checkbox" id="price-2"/>
                            $51 - $100
                        </label>
                        </div>
                </div>
            </div>
            {/*<div className="chat-widget-btn flex items-center justify-center w-14 h-14 bg-blue-600 border-blue-400 border-2 rounded-full top-[90%] mb-4 right-4 float-right sticky">*/}
            {/*    <FontAwesomeIcon icon="fa-comments" classes="text-white text-2xl"/>*/}
            {/*</div>*/}
        </main>
    )
}

export default Content;