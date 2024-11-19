import PropTypes from "prop-types";
import RatingStars from "./RatingStars.jsx";

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

function ProductCard({ product, size = 'sm' }) {
    // console.log('ProductCard => product', product);
    return (
        <div key={product.id} className="product-card bg-white shadow-md p-4 rounded-md cursor-pointer">
            <div className="product-card__image flex items-center justify-center">
                <img src={product?.thumbnail} alt={product.title}/>
            </div>
            <div className="product-card__details">
                <h3 className="product-card__name text-sm font-semibold truncate">{product.title}</h3>
                <RatingStars value={product.rating}/>
                <div className="product-card__price text-lg font-semibold ">{formattedPrice(product.price)}</div>
                
            </div>
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
        rating: PropTypes.number, // Optional
    }).isRequired,
    size: PropTypes.oneOf(['sm', 'md', 'lg'])
};

export default ProductCard;