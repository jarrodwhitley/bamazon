import { useState, useEffect } from 'react';
import NavigationBar from './components/NavigationBar.jsx';
import Content from './components/Content.jsx';
import Footer from './components/Footer.jsx';
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import { Context, useSelectedCategory } from "./components/ContextProvider.jsx";
import productsData from './assets/data/products.json';
import LoadingOverlay from "./components/LoadingOverlay.jsx";

export default function App() {
    const isMobile = window.innerWidth < 768;
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState({});
    const [filteredProducts, setFilteredProducts] = useState([]);
    const selectedCategory = useSelectedCategory();
    function enterPress() {
        console.log('Enter pressed');
    }
    
    useEffect(() => {
        setProducts(productsData.map(product => {
            let newObj = {...product, featured: false};
            if (product.id === 10 || product.id === 15 || product.id === 20 || (product.id === 25 && isMobile)) {
                newObj.featured = true;
            }
            return newObj;
        }));
    }, [isMobile]);
    
    // TODO: Actually use window load state
    useEffect(() => {
        if (products.length > 0 && isLoading) {
            setTimeout(() => {
                console.log('Setting loading to false');
                setIsLoading(false);
            },2000);
        }
    },[products]);
    
    
    return (
        <ErrorBoundary>
            <Context cart={cart} products={products} filteredProducts={filteredProducts} selectedProduct={selectedProduct} selectedCategory={selectedCategory}>
                <NavigationBar onEnterPress={enterPress}/>
                <LoadingOverlay isLoading={isLoading}/>
                <Content />
                <Footer/>
            </Context>
        </ErrorBoundary>
    );
}