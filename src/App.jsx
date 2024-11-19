import {useState, useEffect} from 'react';
import NavigationBar from './components/NavigationBar.jsx';
import Content from './components/Content.jsx';
import Footer from './components/Footer.jsx';
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import { Context } from "./components/ContextProvider.jsx";

export default function App() {
    // when the dom is loaded, set isLoading to false
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        window.addEventListener('load', () => {
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        });
    }, []);
    
    const [rawProducts, setRawProducts] = useState([]);
    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(json => setRawProducts(json.products));
    }, []);
    
    const products = rawProducts.map(product => {
        let newObj = {...product, featured: false};
        if (product.id === 10 || product.id === 15 || product.id === 20) {
            newObj.featured = true;
        }
        return newObj;
    });
    
    const [isFiltering, setIsFiltering] = useState(false);
    
    const [filteredProducts, setFilteredProducts] = useState([]);
    function filterProducts(string) {
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
    
    return (
        <ErrorBoundary>
            <Context products={products} filteredProducts={filteredProducts}>
                <NavigationBar onFilterProducts={filterProducts} className="z-10"/>
                <Content filtering={isFiltering} isLoading={isLoading} className="z-0"/>
                <Footer/>
            </Context>
        </ErrorBoundary>
    );
}