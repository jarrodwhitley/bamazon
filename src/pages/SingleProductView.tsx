import React from 'react'
import {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import store from '../store.ts'
import {setSelectedProduct, clearSelectedProduct} from '../store/selectedProductSlice.ts'
import {addItem} from '../store/cartSlice.ts'
import DiscountBadge from '../components/DiscountBadge.tsx'
import RatingStars from '../components/RatingStars.tsx'
import {formattedPrice} from '../utils/functions.tsx'
import FontAwesomeIcon from '../components/FontAwesomeIcon.tsx'
import {formattedDate} from '../utils/functions.tsx'
import Boombam from '../assets/images/bamazon_logo_boombam.png'
import {useNavigate} from 'react-router-dom'
import {scrollToTop} from '../utils/functions.tsx'
import type RootState from '../types/Store.ts'
import type CartItem from '../types/CartItem.ts'
import type Product from '../types/Product.ts'

export default function SingleProductView() {
    const {dispatch} = store
    const navigate = useNavigate()
    const isMobile = useSelector((state: RootState) => state.ui.isMobile)
    const products = useSelector((state: RootState) => state.products)
    const selectedProduct = useSelector((state: RootState) => state.selectedProduct) as Product
    const cart = useSelector((state: RootState) => state.cart)
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
    const [imageLoaded, setImageLoaded] = useState<boolean>(false)
    const [showBam, setShowBam] = useState<boolean>(false)
    const [closingModal, setCloseModal] = useState<boolean>(false)
    const [screenHeight, setScreenHeight] = useState<number>(window.innerHeight)
    const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false)
    const [itemAdded, setItemAdded] = useState<boolean>(false)
    const handleAddToCart = () => {
        dispatch(addItem(selectedProduct))
        setShowBam(true)
        setItemAdded(true)
    }

    function setImageIndex(index: number) {
        setCurrentImageIndex(index)
    }
    function scrollToReviews() {
        console.log('scrolling')
        const reviews = document.getElementById('reviews') as HTMLElement
        if (reviews) {
            reviews.scrollIntoView({behavior: 'smooth', block: 'start'})
        }
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
        if (!selectedProduct.id) {
            console.log('0')
            const id = window.location.hash.split('/')[2]
            console.log('id', id)
            const product = products.find((product) => product.id === parseInt(id)) as Product
            console.log('product', product)
            dispatch(setSelectedProduct(product))
        }
    }, [dispatch, selectedProduct, products])

    return (
        <>
            {selectedProduct.id && Object.keys(selectedProduct).length > 0 && (
                <>
                    <div className={'single-product-view ' + (!closingModal ? 'animate__slideInUp animate__faster' : 'animate__zoomOut')} onClick={(e) => e.stopPropagation()}>
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
                            {showBam && <img src={Boombam} alt={'Bamazon logo'} className={'animate__animated animate__bounceIn animate__faster single-product-view__bam absolute top-0 left-0 w-2/3 drop-shadow-2xl z-10'} />}
                        </div>
                        <div className={'single-product-view__details row-start-2 lg:row-start-1 col-start-1 lg:col-start-2 w-full p-4 md:p-0 '}>
                            <div className={'single-product-view__title-price'}>
                                <h3 className={'single-product-view__heading text-2xl font-semibold truncate'}>{selectedProduct.title}</h3>
                                <div className={'single-product-view__rating-container'} onClick={scrollToReviews}>
                                    <RatingStars value={selectedProduct.rating} />
                                </div>
                                <div className={'flex flex-row items-center'}>
                                    <div className={'single-product-view__price text-lg font-semibold'}>
                                        <div className={'flex gap-2'}>
                                            <span className={'product-card__details__sale-price'}>{formattedPrice(selectedProduct, 'sale', isMobile)}</span>
                                            <span className={'product-card__details__list-price'}>{formattedPrice(selectedProduct, 'list', isMobile)}</span>
                                        </div>
                                    </div>
                                    <DiscountBadge discountPercentage={selectedProduct.discountPercentage} singleProductView={true} />
                                </div>
                                {selectedProduct.stock < 10 && <div className={'single-product-view__low-stock text-red-500 text-xs font-semibold'}>Low Stock - only {selectedProduct.stock} remaining</div>}
                            </div>
                            <div className={'single-product-view__in-stock text-sm font-semibold text-emerald-500'}>{selectedProduct.availabilityStatus}</div>
                            <div className={'single-product-view__add-to-cart'}>
                                <div className={'single-product-view__add-to-cart__button flex items-center justify-center bg-blue-500 text-white font-semibold px-4 py-2 rounded self-start cursor-pointer'} onClick={handleAddToCart}>
                                    {itemAdded ? 'Done!' : 'Add to Cart'}
                                </div>
                                {showErrorMessage && <div className={'single-product-view__error-message text-red-500 text-sm font-semibold'}>Sorry! Item could not be added to your cart.</div>}
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
                        <div id={'reviews'} className={'single-product-view__reviews'}>
                            <h3 className={'single-product-view__reviews-heading'}>Reviews</h3>
                            <div className={'single-product-view__reviews-grid'}>
                                {selectedProduct.reviews.map((review, index) => (
                                    <div key={index} className={'single-product-view__reviews-grid__card'}>
                                        <span className={'flex gap-2'}>
                                            <span>{review.reviewerName}</span>
                                            <RatingStars value={review.rating} />
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
