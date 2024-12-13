import PropTypes from 'prop-types'
import store from '../store.js'
import {setSelectedProduct} from '../store/selectedProductSlice.js'
import {updateFilters} from '../store/filtersSlice.js'
import RatingStars from './RatingStars.jsx'
import DiscountBadge from './DiscountBadge.jsx'
import {formattedPrice, capitalizeFirstLetter} from '../utils/functions.jsx'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

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
        let newCategories = [...selectedFilters.categories]
        !newCategories.includes(product.category) && newCategories.push(product.category)
        dispatch(updateFilters({categories: newCategories || []}))
        navigate('/category/' + product.category)
    }
    const showLowStockWarning = product.stock < 10 && showLowStock

    return (
        <div key={product.id} className={'product-card ' +
            (categoryCard ? 'category-card border-t-0 h-full flex items-center justify-center ' : '') +
            (featuredCard ? 'featured-card min-w-[260px] md:w-full snap-center mt-2 ml-2 ' : '')} onClick={!categoryCard ? () => selectProduct(product) : () => selectCategory(product)}>
            <div className={'product-card__image flex items-center justify-center'}>
                <img src={product?.thumbnail} className={(categoryCard && isMobile ? 'pt-4 h-3/4 w-auto' : '') + (categoryCard && !isMobile ? 'h-32 w-auto' : '')} height="160" width="160" alt={product.title} />
            </div>
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
