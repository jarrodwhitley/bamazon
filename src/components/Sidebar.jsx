import PropTypes from "prop-types";
import {useState, useEffect} from "react";
import {
    useFilteredProducts,
    useSetSelectedCategory,
    useSetSearchString,
    useIsFiltering,
    useSetIsFiltering
} from "./ContextProvider.jsx";
import {capitalizeFirstLetter} from "../utils/functions.jsx";

export default function Sidebar({ onFilterProducts }) {
    const isMobile = window.innerWidth < 768;
    const filteredProducts = useFilteredProducts();
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const prices = [
        {min: 0, max: 50},
        {min: 51, max: 100},
        {min: 101, max: 1000}
    ];
    const [showFilters, setShowFilters] = useState(false);
    const setSelectedCategory = useSetSelectedCategory();
    const setSearchString = useSetSearchString();
    const isFiltering = useIsFiltering();
    const setIsFiltering = useSetIsFiltering();
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    
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
    
    const handleCheckboxChange = (event) => {
        const {checked, id} = event.target;
        if (checked) {
            setSelectedCheckboxes([...selectedCheckboxes, id]);
        }
        if (!checked) {
            setSelectedCheckboxes(selectedCheckboxes.filter(checkbox => checkbox !== id));
        }
        console.log('handleCheckboxChange:', selectedCheckboxes);
        onFilterProducts(selectedCheckboxes);
    }
    
    function clearFilters() {
        setSelectedCategory(null)
        setSearchString('')
        setIsFiltering(false)
        document.querySelector('.clear-icon').click();
    }
    
    return (
        <>
            {isMobile && (
                <div className="sidebar__mobile-filter-btn fixed bottom-4 right-4 z-50" onClick={() => setShowFilters(!showFilters)}>
                    Show filters<i className="text-2xl fa-solid fa-filter"></i>
                </div>
            )}
            <div className={'sidebar px-4 h-fit top-0 left-0 ' +
                (isMobile ? 'block' : 'sticky')}>
                <div className={'sidebar__filter-title text-xl font-semibold'}>Filters</div>
                <div className={'sidebar__filter-clear text-sm font-semibold text-gray-400 cursor-pointer w-fit hover:text-blue-400'} onClick={clearFilters}>Clear filters</div>
                <div className={'sidebar__filter-container ' +
                    (isMobile ? 'animate__animated fixed bg-white w-3/4 left-0 shadow-2xl text-xl p-6 ' : '') +
                    ((isFiltering && isMobile && !showFilters) ? 'animate__slideOutLeft' : '') +
                    ((isFiltering && isMobile && showFilters) ? 'animate__slideInLeft' : '')}>
                    {categories.length > 0 && (
                    <div className="sidebar__filter-section category-filter mt-2">
                        <h3 className="text-base font-semibold text-gray-400 pt-4 border-t-2">Categories</h3>
                        <div className="sidebar__filter-list">
                            {categories.map((category, index) => (
                                <label className="flex items-center gap-2" key={index} htmlFor={`category-${index}`}>
                                    <input type="checkbox" id={`category-${index}`} onClick={handleCheckboxChange}/>
                                    <span>{capitalizeFirstLetter(category)}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    )}
                    {brands.filter(Boolean).length > 0 && (
                        <div className="sidebar__filter-section brand-filter mt-2">
                            <h3 className="text-base font-semibold text-gray-400">Brands</h3>
                            <div className="sidebar__filter-list">
                                {brands.map((brand, index) => (
                                    <label className="flex items-center gap-2" key={index} htmlFor={`brand-${index}`}>
                                        <input type="checkbox" id={`brand-${index}`} onClick={handleCheckboxChange}/>
                                        {capitalizeFirstLetter(brand)}
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="sidebar__filter-section mt-2">
                        <h3 className="text-base font-semibold text-gray-400">Price</h3>
                        <div className="sidebar__filter-list">
                            {prices.map((price, index) => (
                                <label className="flex items-center gap-2" key={index} htmlFor={`price-${index}`}>
                                    <input type="checkbox" id={`price-${index}`} onClick={handleCheckboxChange}/>
                                    <span className="checkbox-label-text">${price.min} - ${price.max}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

Sidebar.propTypes = {
    onFilterProducts: PropTypes.func,
};