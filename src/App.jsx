import { useCallback, useState, useEffect} from 'react';
import NavigationBar from './components/NavigationBar.jsx';
import Content from './components/Content.jsx';
import Footer from './components/Footer.jsx';
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import {Context, useSelectedCategory } from "./components/ContextProvider.jsx";
import productsData from './assets/data/products.json';

export default function App() {
    const isMobile = window.innerWidth < 768;
    const [isLoading, setIsLoading] = useState(false); //FIXME: currently not working
    const [rawProducts, setRawProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState({});
    const [filteredProducts, setFilteredProducts] = useState([]);
    const selectedCategory = useSelectedCategory()
    useEffect(() => {
        const handleLoad = () => {
            setIsLoading(false);
        };
        window.addEventListener('load', handleLoad);
        setRawProducts(productsData);
        
        return () => {
            window.removeEventListener('load', handleLoad);
        };
    }, []);
    const products = rawProducts.map(product => {
        let newObj = {...product, featured: false};
        if (product.id === 10 || product.id === 15 || product.id === 20 || (product.id === 25 && isMobile)) {
            newObj.featured = true;
        }
        return newObj;
    });
    
    function enterPress() {
        console.log('Enter pressed');
    }
    
    return (
        <ErrorBoundary>
            <Context cart={cart} products={products} filteredProducts={filteredProducts} selectedProduct={selectedProduct} selectedCategory={selectedCategory}>
                <NavigationBar onEnterPress={enterPress} className={'z-10'}/>
                <Content isLoading={isLoading} className="z-0"/>
                <Footer/>
            </Context>
        </ErrorBoundary>
    );
}