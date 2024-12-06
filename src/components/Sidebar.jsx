import PropTypes from "prop-types";
import {useState, useEffect} from "react";
import {
    useFilteredProducts,
    useSelectedCategory,
    useSetSelectedCategory,
    useSetSearchString,
    useIsFiltering,
    useSetIsFiltering,
    useSelectedFilters,
    useSetSelectedFilters,
    useSearchString
} from "./ContextProvider.jsx";
import {capitalizeFirstLetter} from "../utils/functions.jsx";

export default function Sidebar() {
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
    const isFiltering = useIsFiltering();
    const setIsFiltering = useSetIsFiltering();
    const selectedFilters = useSelectedFilters();
    const setSelectedFilters = useSetSelectedFilters();
    
    useEffect(() => {
        if (Array.isArray(filteredProducts)) {
            const newCategories = filteredProducts.reduce((acc, product) => {
                if (!acc.includes(product.category) && product.category !== undefined) {
                    acc.push(product.category);
                }
                return acc;
            }, []);
            setCategories(newCategories); // Static categories for filtering
            
            const newBrands = filteredProducts.reduce((acc, product) => {
                if (!acc.includes(product.brand) && product.brand !== undefined) {
                    acc.push(product.brand);
                }
                return acc;
            }, []);
            setBrands(newBrands); // Static brands for filtering
            
            setSelectedFilters({
                categories: newCategories || [],
                brands: newBrands || [],
                price: selectedFilters.price || '',
                searchString: selectedFilters.searchString || ''
            })
        }
    }, []);
    
    const handleCheckboxChange = () => {
        let checkboxes = document.querySelectorAll('input[type="checkbox"]');
        let checkboxesObj = {
            brands: [],
            price: ''
        };
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                let [type, value] = checkbox.id.split('-');
                if (type === 'price') {
                    checkboxesObj[type] = value;
                } else {
                    checkboxesObj[type].push(value);
                }
            }
        });
        setSelectedFilters({
            ...checkboxesObj,
            categories: selectedFilters.categories || [],
            searchString: selectedFilters.searchString || ''
        });
    }
    
    function clearFilters() {
        // setSelectedCategory([])
        setSelectedFilters({
            categories: [],
            brands: [],
            price: '',
            searchString: ''
        })
        setIsFiltering(false)
        if (document.querySelector('.clear-icon')) {
            document.querySelector('.clear-icon').click();
        }
    }
    
    return (
        <>
            <div className={'sidebar px-4 h-fit left-0 ' +
                (!isMobile ? 'sticky ' : '')  +
                (isMobile ? 'block bg-white fixed top-auto bottom-0 right-0 shadow-2xl shadow-black text-xl p-6 z-10 transition ' : '') +
                ((isFiltering && isMobile && !showFilters) ? 'translate-y-full' : '') +
                ((isFiltering && isMobile && showFilters) ? ' ' : '')}>
                {isMobile && (
                    <div className="sidebar__mobile-filter-btn w-[160px] flex items-center justify-center absolute -top-10 right-0 z-50 bg-blue-500 text-white text-base font-semibold p-2 rounded-t shadow " onClick={() => setShowFilters(!showFilters)}>
                        {(showFilters ? 'Hide' : 'Show') + ' filters'}
                        <i className="text-lg fa-solid fa-filter pl-2"></i>
                    </div>
                )}
                <div className={'sidebar__filter-title text-xl font-semibold'}>Filters</div>
                <div className={'sidebar__filter-clear text-sm font-semibold text-gray-400 cursor-pointer w-fit hover:text-blue-400 pb-4 border-b-2'} onClick={clearFilters}>Clear filters</div>
                <div className={'sidebar__filter-container'}>
                    {categories.length >= 2 && (
                        <div className="sidebar__filter-section category-filter mt-2">
                            <h3 className="text-base font-semibold text-gray-400">Categories</h3>
                            <div className="sidebar__filter-list">
                                {categories.map((category, index) => (
                                    <label className="w-fit flex items-center select-none gap-2" key={index} htmlFor={`category-${category}`}>
                                        <input type="checkbox" id={`category-${category}`} onChange={handleCheckboxChange}/>
                                        <span className={'text-base'}>{capitalizeFirstLetter(category)}</span>
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
                                    <label className="w-fit flex items-center select-none gap-2" key={index} htmlFor={`brands-${brand}`}>
                                        <input type="checkbox" id={`brands-${brand}`} onChange={handleCheckboxChange}/>
                                        <span className={'text-base'}>{capitalizeFirstLetter(brand)}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="sidebar__filter-section mt-2">
                        <h3 className="text-base font-semibold text-gray-400">Price</h3>
                        <div className="sidebar__filter-list">
                            {prices.map((price, index) => (
                                <label className="w-fit flex items-center select-none gap-2" key={index} htmlFor={`price-${price.min}_${price.max}`}>
                                    <input type="checkbox" id={`price-${price.min}_${price.max}`} onChange={handleCheckboxChange}/>
                                    <span className={'text-base'}>${price.min} - ${price.max}</span>
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