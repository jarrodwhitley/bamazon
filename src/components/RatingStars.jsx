import FontAwesomeIcon from "./FontAwesomeIcon.jsx";
import PropTypes from "prop-types";

function RatingStars({value}) {
    return (
        <div className="rating">
            {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                    <FontAwesomeIcon
                        key={index}
                        type={value >= ratingValue ? 'solid' : 'regular'}
                        icon={value >= ratingValue ? 'fa-star' : value >= ratingValue - 0.5 ? 'fa-star-half-alt' : value > 0 ? 'fa-star' : 'fa-star-empty'}
                        classes="text-yellow-400"
                    />
                )
            })}
        </div>
    )
}

RatingStars.propTypes = {
    value: PropTypes.number.isRequired
}

export default RatingStars;