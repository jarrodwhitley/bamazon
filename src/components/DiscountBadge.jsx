import PropTypes from 'prop-types'

export default function DiscountBadge({discountPercentage, singleProductView = false}) {
    discountPercentage = Math.ceil(discountPercentage)

    return <div className={(singleProductView ? 'ml-4 p-0 h-fit' : 'absolute -top-2 -left-1 p-1') + ' discount-badge bg-red-600 text-white w-fit text-md px-2 font-semibold rounded-md'}>{discountPercentage}% off</div>
}

DiscountBadge.propTypes = {
    discountPercentage: PropTypes.number.isRequired,
    singleProductView: PropTypes.bool,
}
