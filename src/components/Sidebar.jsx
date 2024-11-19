import PropTypes from "prop-types";
import { useProducts } from "./ContextProvider.jsx";

export default function Sidebar( ) {
    
    return (
        <div className="main-grid__sidebar p-4 h-fit sticky top-0 left-0">
            <div className="filter-section">
                <h3 className="text-xl font-semibold">Categories</h3>
                <div className="filter-section__content">
                    <label htmlFor="category-1">
                        <input type="checkbox" id="category-1"/>
                        Category 1
                    </label>
                    <label htmlFor="category-2">
                        <input type="checkbox" id="category-2"/>
                        Category 2
                    </label>
                    <label htmlFor="category-3">
                        <input type="checkbox" id="category-3"/>
                        Category 3
                    </label>
                </div>
            </div>
            <div className="filter-section">
                <h3 className="text-xl font-semibold">Brands</h3>
                <div className="filter-section__content">
                    <label htmlFor="brand-1">
                        <input type="checkbox" id="brand-1"/>
                        Brand 1
                    </label>
                    <label htmlFor="brand-2">
                        <input type="checkbox" id="brand-2"/>
                        Brand 2
                    </label>
                    <label htmlFor="brand-3">
                        <input type="checkbox" id="brand-3"/>
                        Brand 3
                    </label>
                </div>
            </div>
            <div className="filter-section">
                <h3 className="text-xl font-semibold">Price</h3>
                <div className="filter-section__content">
                    <label htmlFor="price-1">
                        <input type="checkbox" id="price-1"/>
                        $0 - $50
                    </label>
                    <label htmlFor="price-2">
                        <input type="checkbox" id="price-2"/>
                        $51 - $100
                    </label>
                </div>
            </div>
        </div>
    )
}

Sidebar.propTypes = {

}