import PropTypes from "prop-types";

export default function DiscountBadge({ discountPercentage }) {
    discountPercentage = Math.ceil(discountPercentage);
    
    return (
        <div className="discount-badge bg-red-500 text-white text-md px-2 font-semibold absolute -top-2 -left-1 p-1 rounded-md">
            {discountPercentage}% off
        </div>
    );
}

DiscountBadge.propTypes = {
    discountPercentage: PropTypes.number.isRequired
}