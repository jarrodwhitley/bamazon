import { useCallback, useState, useEffect} from 'react';
import NavigationBar from './components/NavigationBar.jsx';
import Content from './components/Content.jsx';
import Footer from './components/Footer.jsx';
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import {Context, useSelectedCategory, useIsFiltering, useSetIsFiltering, useSearchString} from "./components/ContextProvider.jsx";
import productsData from './assets/data/products.json';

export default function App() {
    const isMobile = window.innerWidth < 768;
    const [isLoading, setIsLoading] = useState(false); //FIXME: currently not working
    const [rawProducts, setRawProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const setIsFiltering = useSetIsFiltering(false);
    const searchString = useSearchString('');
    const selectedCategory = useSelectedCategory({})
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
    
    const filterProducts = (string) => {
        console.log('Filtering products...', string);
        if (!string) return;
        if (string.length > 2) {
            let filtered = products.filter(product => {
                return product.title.toLowerCase().includes(string.toLowerCase()) ||
                    product.tags.join(' ').toLowerCase().includes(string.toLowerCase()) ||
                    (product.brand && product.brand.toLowerCase().includes(string.toLowerCase())) ||
                    product.description.toLowerCase().includes(string.toLowerCase());
            });
            setFilteredProducts(filtered);
            setIsFiltering(true);
        } else {
            setFilteredProducts(products);
            setIsFiltering(false);
        }
    }
    
    useEffect(() => {
        console.log('APP.jsx => Search string:', searchString);
    }, [searchString]);
    
    function enterPress() {
        console.log('Enter pressed');
    }
    
    return (
        <ErrorBoundary>
            <Context products={products} filteredProducts={filteredProducts} selectedProduct={selectedProduct} selectedCategory={selectedCategory}>
                <NavigationBar onEnterPress={enterPress} className="z-10"/>
                <Content onFilterProducts={filterProducts} isLoading={isLoading} className="z-0"/>
                <Footer/>
            </Context>
        </ErrorBoundary>
    );
}