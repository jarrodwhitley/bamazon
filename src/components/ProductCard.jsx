import PropTypes from "prop-types";
import RatingStars from "./RatingStars.jsx";

function ProductCard({ product }) {
    // console.log('ProductCard => product', product);
    return (
        <div key={product.id} className="product-card bg-white shadow-md p-4 rounded-md">
            <div className="product-card__image">
                <img src={product?.thumbnail} alt={product.title}/>
            </div>
            <div className="product-card__details">
                <h3 className="product-card__name text-xl font-semibold">{product.title}</h3>
                <p className="product-card__price text-lg font-semibold">${product.price}</p>
                {product.rating && (
                    <RatingStars value={product.rating}/>
                )}
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
};

export default ProductCard;