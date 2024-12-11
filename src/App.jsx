import {useState, useEffect} from 'react';
import { setIsMobile } from './store/uiSlice';
import { setProducts } from './store/productsSlice.js';
import { useSelector, useDispatch } from "react-redux";
import NavigationBar from './components/NavigationBar.jsx';
import Content from './components/Content.jsx';
import Footer from './components/Footer.jsx';
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import productsData from './assets/data/products.json';
import LoadingOverlay from "./components/LoadingOverlay.jsx";

export default function App() {
    const dispatch = useDispatch();
    const isMobile = useSelector(state => state.ui.isMobile);
    const [isLoading, setIsLoading] = useState(true);
    const products = useSelector(state => state.products);
    
    useEffect(() => {
        const updateIsMobile = () => {
            const isMobile = window.innerWidth <= 768; // Define your mobile breakpoint
            dispatch(setIsMobile(isMobile));
        };
        
        updateIsMobile();
        window.addEventListener('resize', updateIsMobile); // Add event listener
        
        return () => window.removeEventListener('resize', updateIsMobile); // Clean up
    }, [dispatch]);
    
    useEffect(() => {
        dispatch(setProducts(productsData.map(product => {
            let newObj = {...product, featured: false};
            if (product.id === 10 || product.id === 15 || product.id === 20 || (product.id === 25 && isMobile)) {
                newObj.featured = true;
            }
            return newObj;
        })));
    }, [dispatch, isMobile]);
    // TODO: Actually use window load state
    useEffect(() => {
        if (products.length > 0 && isLoading) {
            setTimeout(() => {
                setIsLoading(false);
            },2000);
        }
    },[products, isLoading]);
    
    return (
        <ErrorBoundary>
                <NavigationBar />
                {/*<LoadingOverlay isLoading={isLoading}/>*/}
                <Content isLoading={isLoading} />
                <Footer/>
        </ErrorBoundary>
    );
}