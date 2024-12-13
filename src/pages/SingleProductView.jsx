import React from 'react'
import {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import store from '../store.js'
import { setSelectedProduct, clearSelectedProduct} from '../store/selectedProductSlice.js'
import {addItem} from '../store/cartSlice.js'
import DiscountBadge from '../components/DiscountBadge.jsx'
import RatingStars from '../components/RatingStars.jsx'
import {formattedPrice} from '../utils/functions.jsx'
import FontAwesomeIcon from '../components/FontAwesomeIcon.jsx'
import { formattedDate } from '../utils/functions.jsx'
import Boombam from '../assets/images/bamazon_logo_boombam.png'
import { useNavigate } from 'react-router-dom'
import { scrollToTop } from '../utils/functions.jsx'

export default function SingleProductView() {
    const {dispatch} = store
    const navigate = useNavigate()
    const isMobile = useSelector((state) => state.ui.isMobile)
    const selectedProduct = useSelector((state) => state.selectedProduct)
    const cart = useSelector((state) => state.cart)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [imageLoaded, setImageLoaded] = useState(false)
    const [showBam, setShowBam] = useState(false)
    const [closingModal, setCloseModal] = useState(false)
    const [screenHeight, setScreenHeight] = useState(window.innerHeight)
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [itemAdded, setItemAdded] = useState(false)
    const handleAddToCart = () => {
        dispatch(addItem(selectedProduct))
        const itemInCart = cart.items.find((item) => item.id === selectedProduct.id)
        if (itemInCart) {
            setShowBam(true)
            setItemAdded(true)
        } else {
            setShowErrorMessage(true)
        }
    }
    
    function setImageIndex(index) {
        setCurrentImageIndex(index)
    }
    
    useEffect(() => {
        if (itemAdded) {
            setTimeout(() => {
                navigate('/product/' + selectedProduct.id + '/related')
            }, 2000)
        }
    }, [itemAdded])
    useEffect(() => {
        scrollToTop()
        if (Object.keys(selectedProduct).length === 0) {
            const id = window.location.pathname.split('/').pop()
            const product = store.getState().products.find((product) => product.id === parseInt(id))
            dispatch(setSelectedProduct(product))
        }
    }, [dispatch, selectedProduct])

    return (
        <>
            {selectedProduct && Object.keys(selectedProduct).length > 0 && (
                <>
                    <div className={'single-product-view w-full md:w-3/4 lg:max-w-[1400px] mx-auto h-full bg-white grid grid-cols-1 lg:grid-cols-2 items-start gap-4 md:p-6 overflow-auto relative ' + (!closingModal ? 'animate__slideInUp animate__faster' : 'animate__zoomOut')} onClick={(e) => e.stopPropagation()}>
                        <div className={'single-product-view__close fixed top-0 right-0 px-4 py-2 text-2xl cursor-pointer'} onClick={() => closeModal(null)}>
                            <FontAwesomeIcon icon={'fa-times'} />
                        </div>
                        <div className={'single-product-view__images row-start-1 col-start-1 grid grid-cols-1 md:grid-cols-[auto_1fr] grid-rows-1 w-full h-[30vh] lg:h-full'}>
                            {/* Image, no thumbnails */}
                            {isMobile && (
                                <div className={'single-product-view__mobile-image-gallery overflow-hidden w-screen'}>
                                    <div className={'single-product-view__mobile-image-gallery-snap-container h-full lg:h-[400px] snap-x snap-mandatory flex overflow-auto'}>
                                        {selectedProduct.images.length > 0 &&
                                            selectedProduct.images.map((image, index) => (
                                                <figure key={index} className={'snap-center row-start-1 w-screen h-full'}>
                                                    <img src={image} alt={selectedProduct.title} className={'h-full w-screen max-w-[100vw] object-contain'} onLoad={() => setImageLoaded(true)} />
                                                </figure>
                                            ))}
                                    </div>
                                    <div className={'single-product-view__scroll-indicator flex justify-center w-full absolute'}>
                                        {selectedProduct.images.map((image, index) => (
                                            <div key={index} className={`single-product-view__scroll-indicator-dot w-2 h-2 mx-1 rounded-full ${index === currentImageIndex ? 'bg-gray-500' : 'bg-gray-300'}`} />
                                        ))}
                                    </div>
                                </div>
                            )}
                            {/* Image with thumbnails */}
                            {!isMobile && selectedProduct.images.length > 0 && (
                                <>
                                    <div className={'single-product-view__thumbnails flex flex-col mr-4'}>
                                        {selectedProduct.images.map((image, index) => (
                                            <figure key={index} className={'rounded'}>
                                                <img src={image} height={'80'} width={'80'} onMouseEnter={() => setImageIndex(index)} alt={selectedProduct.title} className={`cursor-pointer ${index === currentImageIndex ? 'border-2 border-blue-500 rounded' : ''}`} onClick={() => setImageIndex(index)} />
                                            </figure>
                                        ))}
                                    </div>
                                    <div className={'single-product-view__image col-start-2 col-span-full flex items-center justify-center'}>
                                        <img src={selectedProduct.images[currentImageIndex]} className={'max-h-full object-contain'} height={'400'} width={'400'} alt={selectedProduct.title} onLoad={() => setImageLoaded(true)} />
                                    </div>
                                </>
                            )}
                            {showBam &&
                                <img src={Boombam} alt={'Bamazon logo'} className={'animate__animated animate__bounceIn animate__faster single-product-view__bam absolute top-0 left-0 w-2/3 drop-shadow-2xl z-10'} />}
                        </div>
                        <div className={'single-product-view__details row-start-2 lg:row-start-1 col-start-1 lg:col-start-2 w-full p-4 md:p-0 '}>
                            <div className={'single-product-view__title-price'}>
                                <h3 className={'single-product-view text-2xl font-semibold truncate'}>{selectedProduct.title}</h3>
                                <RatingStars value={selectedProduct.rating} />
                                <div className={'flex flex-row items-center'}>
                                    <div className={'single-product-view__price text-lg font-semibold'}>
                                        <div className={'flex gap-2'}>
                                            <span className={'product-card__details__sale-price'}>{formattedPrice(selectedProduct, 'sale', isMobile)}</span>
                                            <span className={'product-card__details__list-price'}>{formattedPrice(selectedProduct, 'list', isMobile)}</span>
                                        </div>
                                    </div>
                                    <DiscountBadge discountPercentage={selectedProduct.discountPercentage} singleProductView={true} />
                                </div>
                                {selectedProduct.stock < 10 &&
                                    <div className={'single-product-view__low-stock text-red-500 text-xs font-semibold'}>Low Stock - only {selectedProduct.stock} remaining</div>}
                            </div>
                            <div className={'single-product-view__in-stock text-sm font-semibold text-emerald-500'}>{selectedProduct.availabilityStatus}</div>
                            <div className={'single-product-view__add-to-cart'}>
                                <div className={'single-product-view__add-to-cart__button flex items-center justify-center bg-blue-500 text-white font-semibold px-4 py-2 rounded self-start cursor-pointer'} onClick={handleAddToCart}>
                                    {itemAdded ? 'Done!' : 'Add to Cart'}
                                </div>
                                {showErrorMessage &&
                                    <div className={'single-product-view__error-message text-red-500 text-sm font-semibold'}>Sorry! Item could not be added to your cart.</div>}
                            </div>
                            <div className={'single-product-view__description mt-4 pt-2 border-t-2'}>
                                <div className={'font-semibold'}>Description</div>
                                <p className={'single-product-view__description mt-2'}>{selectedProduct.description}</p>
                            </div>
                            <div className={'single-product-view__details mt-4 pt-2 border-t-2'}>
                                <div className={'font-semibold'}>Details</div>
                                <ul className={'list-disc pl-6 mt-2'}>
                                    <li className={'single-product-view__list-item'}>{selectedProduct.warrantyInformation}</li>
                                    <li className={'single-product-view__list-item'}>{selectedProduct.shippingInformation}</li>
                                    <li className={'single-product-view__list-item'}>{selectedProduct.returnPolicy}</li>
                                    <li className={'single-product-view__list-item'}>sku# {selectedProduct.sku}</li>
                                </ul>
                            </div>
                            <div className={'single-product-view__dimensions'}>
                                <div className={'font-semibold'}>Dimensions</div>
                                <div className={'single-product-view__dimensions__table'}>
                                    <div className={'single-product-view__dimensions__row col-span-full flex items-center justify-center'}>
                                        <div className={'single-product-view__row-title'}>Weight</div>
                                        <div className={'single-product-view__row-value'}>{selectedProduct.weight} lb.</div>
                                    </div>
                                    <div className={'single-product-view__dimensions__row col-span-full flex items-center justify-center'}>
                                        <div className={'single-product-view__row-title'}>Width</div>
                                        <div className={'single-product-view__row-value'}>{selectedProduct.dimensions.width} in.</div>
                                    </div>
                                    <div className={'single-product-view__dimensions__row col-span-full flex items-center justify-center'}>
                                        <div className={'single-product-view__row-title'}>Height</div>
                                        <div className={'single-product-view__row-value'}>{selectedProduct.dimensions.height} in.</div>
                                    </div>
                                    <div className={'single-product-view__dimensions__row col-span-full flex items-center justify-center'}>
                                        <div className={'single-product-view__row-title'}>Depth</div>
                                        <div className={'single-product-view__row-value'}>{selectedProduct.dimensions.depth} in.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Reviews */}
                        <div className={'single-product-view__reviews'}>
                            <h3 className={'single-product-view__reviews-heading'}>Reviews</h3>
                            <div className={'single-product-view__reviews-grid'}>
                                {selectedProduct.reviews.map((review, index) => (
                                    <div key={index} className={'single-product-view__reviews-grid__card'}>
                                        <span className={'flex gap-2'}>
                                            <span>{review.reviewerName}</span><RatingStars value={review.rating} />
                                        </span>
                                        {/*<span className={'text-sm text-gray-400'}>{review.reviewerEmail}</span>*/}
                                        <span className={'text-sm'}>{formattedDate(review.date)}</span>
                                        <p className={'text-sm mt-2'}>{review.comment}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}
