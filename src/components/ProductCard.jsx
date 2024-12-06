import PropTypes from "prop-types";
import RatingStars from "./RatingStars.jsx";
import DiscountBadge from "./DiscountBadge.jsx";
import {
    useSetSelectedProduct,
    useSetSelectedCategory,
    useSelectedFilters,
    useSetSelectedFilters
} from './ContextProvider.jsx';
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
        let newCategories = selectedFilters.categories;
        !newCategories.includes(product.category) && newCategories.push(product.category);
        setSelectedFilters(
            {
                searchString: selectedFilters.searchString || '',
                categories: newCategories || [],
                brands: selectedFilters.brands || [],
                price: selectedFilters.price || ''
            }
        );
    }
    const showLowStockWarning = product.stock < 10 && showLowStock;
    
    return (
        <div key={product.id}
             className={(categoryCard ? 'category-card border-t-0 h-full flex items-center justify-center ' : '') +
                 'product-card w-full h-fit bg-white shadow-md p-4 rounded-md border-t-1 border-t-gray-25 cursor-pointer relative'}
             onClick={!categoryCard ? selectProduct : selectCategory}>
            <div className={'product-card__image flex items-center justify-center'}>
                <img src={product?.thumbnail} className={((categoryCard && isMobile)? 'pt-4 h-3/4 w-auto' : '') + ((categoryCard && !isMobile) ? 'h-32 w-auto' : '')} height="300" width="300" alt={product.title}/>
            </div>
            {showDiscount && !categoryCard && (
                <DiscountBadge discountPercentage={product.discountPercentage}/>
            )}
            <div className="product-card__details">
                <h3 className={'product-card__name mt-2 truncate ' +
                    (((!categoryCard && !isMobile) || (categoryCard && isMobile)) ? 'text-base font-semibold' : 'font-normal')}>
                    {!categoryCard ? product.title : capitalizeFirstLetter(product.category)}
                </h3>
                {(!categoryCard) && (
                    <>
                        <RatingStars value={product.rating}/>
                        <div className={'product-card__price text-lg font-semibold' + ((isMobile && product.featured) ? 'text-xs' : '')}>{formattedPrice(product, isMobile)}</div>
                    </>
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
        thumbnail: PropTypes.string,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        rating: PropTypes.number,
        discountPercentage: PropTypes.number,
        stock: PropTypes.number,
        featured: PropTypes.bool,
        categories: PropTypes.string,
    }).isRequired,
    showDiscount: PropTypes.bool,
    showLowStock: PropTypes.bool,
    categoryCard: PropTypes.bool
};