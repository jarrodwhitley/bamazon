import {useState} from "react";
import PropTypes from "prop-types";
import DiscountBadge from "./DiscountBadge.jsx";
import RatingStars from "./RatingStars.jsx";
import {formattedPrice} from "../utils/functions.jsx";
import {
    useSelectedProduct,
    useSetSelectedProduct,
    useSetSelectedFilters,
    useCart,
    useSetCart
} from "./ContextProvider.jsx";
import FontAwesomeIcon from "./FontAwesomeIcon.jsx";
import Boombam from "../assets/images/bamazon_logo_boombam.png";

export default function SingleProductView() {
    const isMobile = window.innerWidth < 768;
    const selectedProduct = useSelectedProduct();
    const setSelectedProduct = useSetSelectedProduct();
    const setSelectedFilters = useSetSelectedFilters();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [showBam, setShowBam] = useState(false);
    const [closingModal, setCloseModal] = useState(false);
    const cart = useCart();
    const setCart = useSetCart();
    const handleAddToCart = () => {
        let newCart = [...cart.items];
        let productIndex = newCart.findIndex(product => product.id === selectedProduct.id);
        if (productIndex > -1) {
            newCart[productIndex].quantity += 1;
        } else {
            newCart.push(selectedProduct);
            selectedProduct.quantity = 1;
        }
        setCart({
            showCart: cart.showCart,
            items: newCart
        });
        setShowBam(true);
        setTimeout(() => {
            setCloseModal(true);
        },1000);
        setTimeout(() => {
            setShowBam(false)
            setSelectedProduct({});
            setSelectedFilters(() => ({
                searchString: '',
                categories: [],
                brands: [],
                price: ''
            }));
            setCloseModal(false);
        },2000);
    }
    function closeModal() {
        setCloseModal(true);
        setTimeout(() => {
            setSelectedProduct({});
            setCloseModal(false);
        },1000);
    }
    function setImageIndex(index) {
        setCurrentImageIndex(index);
    }
    
    return (
        <>
            {selectedProduct && Object.keys(selectedProduct).length > 0 && (
                <div className={(!closingModal ? 'animate__fadeIn animate__faster ' : 'animate__fadeOut ') + 'single-product-view animate__animated fixed top-0 left-0 right-0 h-full max-h-screen flex items-center justify-center bg-white bg-opacity-80 z-10'} onClick={closeModal}>
                    <div className={((!closingModal ? 'animate__slideInUp animate__faster ' : 'animate__zoomOut ')) + 'single-product-view__modal animate__animated w-full md:w-3/4 lg:w-[1000px] h-full lg:min-h-[650px] md:max-h-[60vh] bg-white grid grid-rows-[1fr_2fr] lg:grid-rows-1 grid-cols-1 lg:grid-cols-2 items-start gap-4 md:p-6 shadow-2xl overflow-auto relative'} onClick={(e) => e.stopPropagation()}>
                        <div className="single-product-view__close fixed top-0 right-0 px-4 py-2 text-2xl cursor-pointer" onClick={() => closeModal(null)}>
                            <FontAwesomeIcon icon="fa-times"/>
                        </div>
                        <div className="single-product-view__images row-start-1 col-start-1 grid grid-cols-1 grid-rows-1 w-full h-[30vh] lg:h-full">
                            {/* Image, no thumbnails */}
                            {isMobile && (
                                <div className="single-product-view__mobile-image-gallery overflow-hidden w-screen">
                                    <div className="single-product-view__mobile-image-gallery-snap-container h-full lg:h-[400px] snap-x snap-mandatory flex overflow-auto">
                                        {selectedProduct.images.map((image, index) => (
                                            <figure key={index} className="snap-center row-start-1 w-screen h-full">
                                                <img
                                                    src={image}
                                                    alt={selectedProduct.title}
                                                    className="h-full w-screen max-w-[100vw] object-contain"
                                                    onLoad={() => setImageLoaded(true)}
                                                />
                                            </figure>
                                        ))}
                                    </div>
                                    <div className="single-product-view__scroll-indicator flex justify-center w-full absolute">
                                        {selectedProduct.images.map((image, index) => (
                                            <div key={index} className={`single-product-view__scroll-indicator-dot w-2 h-2 mx-1 rounded-full ${index === currentImageIndex ? 'bg-gray-500' : 'bg-gray-300'}`}/>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {/* Image with thumbnails */}
                            {!isMobile && (
                                <>
                                    <div className="single-product-view__thumbnails flex flex-col mr-4">
                                        {selectedProduct.images.map((image, index) => (
                                            <figure key={index} className="rounded">
                                                <img
                                                    src={image}
                                                    height="80"
                                                    width="80"
                                                    onMouseEnter={() => setImageIndex(index)}
                                                    alt={selectedProduct.title}
                                                    className={`cursor-pointer ${index === currentImageIndex ? 'border-2 border-blue-500 rounded' : ''}`}
                                                    onClick={() => setImageIndex(index)}
                                                />
                                            </figure>
                                        ))}
                                    </div>
                                    <div className="single-product-view__image col-start-2 col-span-full flex items-center justify-center">
                                        <img
                                            src={selectedProduct.images[currentImageIndex]}
                                            className={'max-h-full object-contain'}
                                            height="400"
                                            width="400"
                                            alt={selectedProduct.title}
                                            onLoad={() => setImageLoaded(true)}
                                        />
                                    </div>
                                </>
                            )}
                            {showBam && (
                                <img src={Boombam} alt="Bamazon logo" className="animate__animated animate__bounceIn animate__faster single-product-view__bam absolute top-0 left-0 w-2/3 drop-shadow-2xl z-10"/>
                            )}
                        </div>
                        <div className="single-product-view__details row-start-2 lg:row-start-1 col-start-1 lg:col-start-2 w-full p-4 md:p-0 ">
                            <div className="single-product-view__section">
                                <h3 className="single-product-view text-2xl font-semibold truncate">{selectedProduct.title}</h3>
                                <RatingStars value={selectedProduct.rating}/>
                                <div className="flex flex-row items-center">
                                    <div className="single-product-view__price text-lg font-semibold ">{formattedPrice(selectedProduct)}</div>
                                    <DiscountBadge discountPercentage={selectedProduct.discountPercentage} singleProductView={true}/>
                                </div>
                                {selectedProduct.stock < 10 && (
                                    <div className="single-product-view__low-stock text-red-500 text-xs font-semibold">Low Stock - only {selectedProduct.stock} remaining</div>
                                )}
                            </div>
                            <div className="single-product-view__section grid grid-rows-1 grid-cols-2 mt-4 pt-2 w-full place-self-end">
                                <div className="single-product-view__add-to-cart flex items-center justify-center bg-blue-500 text-white font-semibold px-4 py-2 rounded self-start cursor-pointer" onClick={handleAddToCart}>Add to Cart</div>
                                {cart.items.find(product => product.id === selectedProduct.id) && (
                                    <div className="single-product-view__added-message flex items-center justify-center">
                                        <p className="single-product-view__in-cart text-green-500 font-semibold animate__animated animate__faster animate__fadeInUp">Added to cart!</p>
                                    </div>
                                )}
                            </div>
                            <div className="single-product-view__section mt-4 pt-2 border-t-2">
                                <div className={'font-semibold'}>Product Description</div>
                                <p className="single-product-view__description mt-2">{selectedProduct.description}</p>
                            </div>
                            <div className="single-product-view__section mt-4 pt-2 border-t-2">
                                <div className={'font-semibold'}>Product Details</div>
                                <ul className="list-disc pl-6 mt-2">
                                    <li className="single-product-view__list-item">{selectedProduct.warrantyInformation}</li>
                                    <li className="single-product-view__list-item">{selectedProduct.shippingInformation}</li>
                                    <li className="single-product-view__list-item">sku# {selectedProduct.sku}</li>
                                </ul>
                            </div>
                            
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

SingleProductView.propTypes = {
    selectedProduct: PropTypes.object,
};