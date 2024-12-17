import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { setIsMobile } from './store/uiSlice';
import { setProducts } from './store/productsSlice.js';
import { useSelector, useDispatch } from "react-redux";
import Home from './pages/Home.jsx';
import SingleProductView from './pages/SingleProductView.jsx';
import RelatedProductsView from './pages/RelatedProductsView.jsx';
import SearchResultsView from './pages/SearchResultsView.jsx';
import CategoryView from './pages/CategoryView.jsx';
import Checkout from './pages/Checkout.jsx';
import NavigationBar from './components/NavigationBar.jsx';
import Footer from './components/Footer.jsx';
import Modal from './components/Modal.jsx';
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import LoadingOverlay from "./components/LoadingOverlay.jsx";
import Cart from './components/Cart.jsx';
import MobileMenu from './components/MobileMenu.jsx';
import productsData from './assets/data/products.json';
import { setIsLoading } from './store/uiSlice';
import PageNotFound from './components/404.jsx';

export default function App() {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.ui.isLoading);
    const isMobile = useSelector(state => state.ui.isMobile);
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
            let newObj = { ...product, featured: false };
            if (product.id === 10 || product.id === 15 || product.id === 20 || (product.id === 25 && isMobile)) {
                newObj.featured = true;
            }
            return newObj;
        })));
    }, [dispatch, isMobile]);
    useEffect(() => {
        if (products.length > 0 && isLoading) {
            setTimeout(() => {
                dispatch(setIsLoading(false));
            }, 2000);
        }
    }, [products, isLoading, dispatch]);
    
    return (
        <ErrorBoundary>
            <Router>
                <NavigationBar />
                <LoadingOverlay />
                <Routes>
                    <Route path={''} element={<Home />} />
                    <Route path={'product/:id'} element={<SingleProductView />} />
                    <Route path={'product/:id/related'} element={<RelatedProductsView />} />
                    <Route path={'results/:searchString'} element={<SearchResultsView />} />
                    <Route path={'category/:category'} element={<CategoryView />} />
                    <Route path={'checkout'} element={<Checkout />} />
                    <Route path={'*'} element={<PageNotFound />} />
                </Routes>
                <Cart />
                <Modal />
                <MobileMenu />
                <Footer />
            </Router>
        </ErrorBoundary>
    );
}