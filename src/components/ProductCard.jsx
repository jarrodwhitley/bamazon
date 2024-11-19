import PropTypes from "prop-types";
import RatingStars from "./RatingStars.jsx";
import DiscountBadge from "./DiscountBadge.jsx";

function formattedPrice(price) {
    const [dollars, cents] = price.toString().split('.');
    return (
        <div className="items-start flex">
            <span className="text-sm translate-y-[3px]">$</span>
            <span className="text-3xl">{dollars}</span>
            <span className="text-sm translate-y-[2px]">{cents}</span>
        </div>
    );
}

function ProductCard({ product, size = 'sm', showDiscount = false, showLowStock = false }) {
    // console.log('ProductCard => product', product);
    // display lowStock warning if stock is less than 5 and showLowStock is true
    const showLowStockWarning = product.stock < 10 && showLowStock;
    
    return (
        <div key={product.id} className="product-card max-h-fit bg-white shadow-md p-4 rounded-md cursor-pointer relative">
            <div className="product-card__image flex items-center justify-center">
                <img src={product?.thumbnail} height="300" width="300" alt={product.title}/>
            </div>
            {showDiscount && (
                <DiscountBadge discountPercentage={product.discountPercentage}/>
            )}
            <div className="product-card__details">
                <h3 className="product-card__name text-sm font-semibold truncate">{product.title}</h3>
                <RatingStars value={product.rating}/>
                <div className="product-card__price text-lg font-semibold ">{formattedPrice(product.price)}</div>
            </div>
            {showLowStockWarning && (
                <div className="product-card__low-stock text-red-500 text-xs font-semibold">Low Stock - only {product.stock} remaining</div>
            )}
        </div>
    );
}

// Define prop types for ProductCard
ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        thumbnail: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        rating: PropTypes.number,
        discountPercentage: PropTypes.number,
        stock: PropTypes.number,
    }).isRequired,
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    showDiscount: PropTypes.bool,
    showLowStock: PropTypes.bool,
};

export default ProductCard;