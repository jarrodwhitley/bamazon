import PropTypes from "prop-types";
import {useState, useEffect} from "react";
import {useFilteredProducts, useProducts} from "./ContextProvider.jsx";

export default function Sidebar() {
    const filteredProducts = useFilteredProducts();
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    
    useEffect(() => {
        if (Array.isArray(filteredProducts)) {
            const newCategories = filteredProducts.reduce((acc, product) => {
                if (!acc.includes(product.category)) {
                    acc.push(product.category);
                }
                return acc;
            }, []);
            setCategories(newCategories);
            
            const newBrands = filteredProducts.reduce((acc, product) => {
                if (!acc.includes(product.brand)) {
                    acc.push(product.brand);
                }
                return acc;
            }, []);
            setBrands(newBrands);
        }
    }, [filteredProducts]);
    const prices = [
        {min: 0, max: 50},
        {min: 51, max: 100},
        {min: 101, max: 1000}
    ];
    
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    return (
        <div className="main-grid__sidebar px-4 h-fit sticky top-0 left-0">
            <div className="sidebar__filter-section category-filter">
                <h3 className="text-lg font-semibold">Categories</h3>
                <div className="sidebar__filter-list">
                    {categories.map((category, index) => (
                        <label className="flex gap-2" key={index} htmlFor={`category-${index}`}>
                            <input type="checkbox" id={`category-${index}`}/>
                            <span>{capitalizeFirstLetter(category)}</span>
                        </label>
                    ))}
                </div>
            </div>
            {brands.filter(Boolean).length > 0 && (
                <div className="sidebar__filter-section brand-filter">
                    <h3 className="text-lg font-semibold">Brands</h3>
                    <div className="sidebar__filter-list">
                        {brands.map((brand, index) => (
                            <label className="flex gap-2" key={index} htmlFor={`brand-${index}`}>
                                <input type="checkbox" id={`brand-${index}`}/>
                                {capitalizeFirstLetter(brand)}
                            </label>
                        ))}
                    </div>
                </div>
            )}
            <div className="sidebar__filter-section">
                <h3 className="text-lg font-semibold">Price</h3>
                <div className="sidebar__filter-list">
                    {prices.map((price, index) => (
                        <label className="flex gap-2" key={index} htmlFor={`price-${index}`}>
                            <input type="checkbox" id={`price-${index}`}/>
                            <span className="checkbox-label-text">${price.min} - ${price.max}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    )
}