import PropTypes from "prop-types";
import RatingStars from "./RatingStars.jsx";
import DiscountBadge from "./DiscountBadge.jsx";
import {useSetSelectedProduct, useSetSelectedCategory, useSelectedFilters, useSetSelectedFilters} from './ContextProvider.jsx';
import {formattedPrice, capitalizeFirstLetter} from '../utils/functions.jsx';

export default function ProductCard({product, showDiscount = false, showLowStock = false, categoryCard = false}) {
    const isMobile = window.innerWidth < 768;
    const selectedFilters = useSelectedFilters();
    const setSelectedFilters = useSetSelectedFilters();
    const setSelectedProduct = useSetSelectedProduct();
    const selectProduct = () => {
        setSelectedProduct(product);
    };
    const setSelectedCategory = useSetSelectedCategory();
    const selectCategory = () => {
        // setSelectedCategory(product.category);
        setSelectedFilters(
            {
                searchString: selectedFilters.searchString || '',
                category: product.category || [],
                brands: selectedFilters.brands || [],
                price: selectedFilters.price || ''
            }
        );
    }
    const showLowStockWarning = product.stock < 10 && showLowStock;
    
    return (
        <div key={product.id}
             className="product-card w-full h-full bg-white shadow-md p-4 rounded-md border-t-2 border-t-gray-25 cursor-pointer relative"
             onClick={!categoryCard ? selectProduct : selectCategory}>
            <div className={'product-card__image flex items-center justify-center'}>
                <img src={product?.thumbnail} height="300" width="300" alt={product.title}/>
            </div>
            {showDiscount && !categoryCard && (
                <DiscountBadge discountPercentage={product.discountPercentage}/>
            )}
            <div className="product-card__details">
                <h3 className={'product-card__name text-sm mt-2 font-semibold truncate ' + (!categoryCard ? '' : 'text-center')}>
                    {!categoryCard ? product.title : capitalizeFirstLetter(product.category)}
                </h3>
                {(!product.featured && isMobile && !categoryCard || !isMobile && !categoryCard) && (
                    <RatingStars value={product.rating}/>
                )}
                {!categoryCard && (
                    <div className={'product-card__price text-lg font-semibold' + ((isMobile && product.featured) ? 'text-xs' : '')}>{formattedPrice(product, isMobile)}</div>
                )}
            </div>
            {showLowStockWarning && !categoryCard && (
                <div className="product-card__low-stock text-red-500 text-xs font-semibold">Low Stock - only {product.stock} remaining</div>
            )}
        </div>
    );
}

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        thumbnail: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        rating: PropTypes.number,
        discountPercentage: PropTypes.number,
        stock: PropTypes.number,
        featured: PropTypes.bool,
        category: PropTypes.string,
    }).isRequired,
    showDiscount: PropTypes.bool,
    showLowStock: PropTypes.bool,
    categoryCard: PropTypes.bool
};