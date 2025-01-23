import PropTypes from 'prop-types'
import store from '../store.ts'
import {setSelectedProduct} from '../store/selectedProductSlice.ts'
import {updateFilters} from '../store/filtersSlice.ts'
import RatingStars from './RatingStars.tsx'
import DiscountBadge from './DiscountBadge.tsx'
import {formattedPrice, capitalizeFirstLetter} from '../utils/functions.tsx'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export default function ProductCard({product, showDiscount = false, showLowStock = false, categoryCard = false, featuredCard = false}) {
    const {dispatch} = store
    const navigate = useNavigate()
    const isMobile = useSelector((state) => state.ui.isMobile)
    const selectedFilters = useSelector((state) => state.filters)
    function selectProduct(product) {
        dispatch(setSelectedProduct(product))
        navigate('/product/' + product.id)
    }

    const selectCategory = (product) => {
        dispatch(updateFilters({category: product.category}))
        navigate('/category/' + product.category)
    }
    const showLowStockWarning = product.stock < 10 && showLowStock

    return (
        <div key={product.id} className={'product-card ' + (categoryCard ? 'category-card ' : '') + (featuredCard ? 'featured-card ' : '')} onClick={!categoryCard ? () => selectProduct(product) : () => selectCategory(product)}>
            <figure className={'product-card__image-container'}>
                <img src={product?.thumbnail} className={'product-card__image'} alt={product.title} />
            </figure>
            {showDiscount && !categoryCard && <DiscountBadge discountPercentage={product.discountPercentage} />}
            <div className="product-card__details">
                <h3 className={'product-card__name mt-2 truncate ' + ((!categoryCard && !isMobile) || (categoryCard && isMobile) ? 'text-base font-semibold' : 'font-normal')}>{!categoryCard ? product.title : capitalizeFirstLetter(product.category)}</h3>
                {!categoryCard && (
                    <>
                        <RatingStars value={product.rating} />
                        {/*list price - use price and discount to get list price*/}
                        <div className={'flex gap-2'}>
                            <span className={'product-card__details__sale-price ' + (isMobile && product.featured ? 'text-xs' : '')}>{formattedPrice(product, 'sale', isMobile)}</span>
                            <span className={'product-card__details__list-price ' + (isMobile && product.featured ? 'text-xs' : '')}>{formattedPrice(product, 'list', isMobile)}</span>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
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
        category: PropTypes.string,
    }).isRequired,
    showDiscount: PropTypes.bool,
    showLowStock: PropTypes.bool,
    categoryCard: PropTypes.bool,
    featuredCard: PropTypes.bool,
}
