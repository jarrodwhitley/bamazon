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
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState({});
    const [filteredProducts, setFilteredProducts] = useState([]);
    const selectedCategory = useSelectedCategory()
    
    const handleLoad = async () => {
        setIsLoading(true);
        // NOTE: I'm not fetching data from the API because I needed to customize it for the project
        // So I am loading it locally for the purpose of this project
        // try {
        //     const response = await fetch('https://dummyjson.com/products');
        //     const productsData = await response.json();
        //     setRawProducts(productsData.products);
        // } catch (error) {
        //     console.error('Error fetching products:', error);
        // } finally {
        //     setIsLoading(false);
        // }
        // setRawProducts(productsData);
        
        // For now, I'm just using the data from the JSON file
        setProducts(productsData.map(product => {
            let newObj = {...product, featured: false};
            if (product.id === 10 || product.id === 15 || product.id === 20 || (product.id === 25 && isMobile)) {
                newObj.featured = true;
            }
            return newObj;
        }));
        setIsLoading(false);
        window.removeEventListener('load', handleLoad);
    };
    
    window.addEventListener('load', handleLoad);
    
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