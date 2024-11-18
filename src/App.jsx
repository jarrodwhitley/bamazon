import {useState, useEffect} from 'react';
import NavigationBar from './components/NavigationBar.jsx';
import Content from './components/Content.jsx';
import Footer from './components/Footer.jsx';
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import { Context } from "./components/ContextProvider.jsx";

export default function App() {
    const [rawProducts, setRawProducts] = useState([]);
    
    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(json => setRawProducts(json.products));
    }, []);
    
    // Set the first 3 products as featured
    const products = rawProducts.map(product => {
        let newObj = {...product, featured: false};
        if (product.id <= 3) {
            newObj.featured = true;
        }
        return newObj;
    });
    
    return (
        <ErrorBoundary>
            <Context products={products}>
                <NavigationBar />
                <Content />
                <Footer/>
            </Context>
        </ErrorBoundary>
    );
}