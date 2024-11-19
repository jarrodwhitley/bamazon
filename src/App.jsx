import {useState, useEffect} from 'react';
import NavigationBar from './components/NavigationBar.jsx';
import Content from './components/Content.jsx';
import Footer from './components/Footer.jsx';
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import { Context } from "./components/ContextProvider.jsx";

export default function App() {
    const [rawProducts, setRawProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    
    
    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(json => setRawProducts(json.products));
    }, []);
    
    // Manually set the featured products
    const products = rawProducts.map(product => {
        let newObj = {...product, featured: false};
        if (product.id === 10 || product.id === 15 || product.id === 20) {
            newObj.featured = true;
        }
        return newObj;
    });
    
    function filterProducts(string) {
        // return products that contain the search string in the title, tags, or brand
        let filtered = products.filter(product => {
            return product.title.toLowerCase().includes(string.toLowerCase()) ||
                product.tags.join(' ').toLowerCase().includes(string.toLowerCase()) ||
                product.brand.toLowerCase().includes(string.toLowerCase());
        });
        setFilteredProducts(filtered);
    }
    
    return (
        <ErrorBoundary>
            <Context products={products}>
                <NavigationBar onFilterProducts={filterProducts}/>
                <Content />
                <Footer/>
            </Context>
        </ErrorBoundary>
    );
}