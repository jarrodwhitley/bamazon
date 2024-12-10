import {useState, useEffect} from 'react';
import NavigationBar from './components/NavigationBar.jsx';
import Content from './components/Content.jsx';
import Footer from './components/Footer.jsx';
import ErrorBoundary from "./components/ErrorBoundary.jsx";
// import { Context, useSelectedCategory } from "./components/ContextProvider.jsx";
import productsData from './assets/data/products.json';
import LoadingOverlay from "./components/LoadingOverlay.jsx";
import store from './store.js';
import { setProducts } from './store/productsSlice.js';

export default function App() {
    const { dispatch, getState } = store;
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isLoading, setIsLoading] = useState(true);
    const products = getState().products;
    const cart = getState().cart;
    const selectedProduct = getState().selectedProduct;
    // const [filteredProducts, setFilteredProducts] = useState([]);
    // const selectedCategory = useSelectedCategory();
    
    useEffect(() => {
        dispatch(setProducts(productsData.map(product => {
            let newObj = {...product, featured: false};
            if (product.id === 10 || product.id === 15 || product.id === 20 || (product.id === 25 && isMobile)) {
                newObj.featured = true;
            }
            return newObj;
        })));
    }, [isMobile]);
    // TODO: Actually use window load state
    useEffect(() => {
        if (products.length > 0 && isLoading) {
            setTimeout(() => {
                setIsLoading(false);
            },2000);
        }
    },[products]);
    window.addEventListener('resize', () => {
        setIsMobile(window.innerWidth < 768);
    })
    
    return (
        <ErrorBoundary>
                {/*<NavigationBar isMobile={isMobile}/>*/}
                {/*<LoadingOverlay isMobile={isMobile} isLoading={isLoading}/>*/}
                <Content isMobile={isMobile} isLoading={isLoading} />
                {/*<Footer/>*/}
        </ErrorBoundary>
    );
}