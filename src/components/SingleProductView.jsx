import { useState } from "react";
import PropTypes from "prop-types";
import DiscountBadge from "./DiscountBadge.jsx";
import RatingStars from "./RatingStars.jsx";
import { formattedPrice} from "../utils/functions.jsx";
import { useSelectedProduct, useSetSelectedProduct } from "./ContextProvider.jsx";
import FontAwesomeIcon from "./FontAwesomeIcon.jsx";

export default function SingleProductView() {
    const selectedProduct = useSelectedProduct();
    const setSelectedProduct = useSetSelectedProduct();
    
    function closeModal(param) {
        setSelectedProduct(param);
    }
    
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    function setImageIndex(index) {
        setCurrentImageIndex(index);
    }
    
    return (
        selectedProduct &&
            <div className="single-product-view fixed top-0 left-0 right-0 h-full max-h-screen flex items-center justify-center bg-white bg-opacity-80">
                <div className="single-product-view__modal w-3/4 h-full max-h-[60vh] bg-white flex p-6 shadow-2xl relative">
                    <div className="single-product-view__close absolute top-0 right-0 p-4 cursor-pointer" onClick={() => closeModal(null)}>
                        <FontAwesomeIcon icon="fa-times"/>
                    </div>
                    <div className="single-product-view__images flex flex-row w-1/2">
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
                        <div className="single-product-view__image flex items-center justify-center">
                            <img
                                src={selectedProduct.images[currentImageIndex]}
                                height="400"
                                width="400"
                                alt={selectedProduct.title}
                            />
                        </div>
                    </div>
                    <div className="single-product-view__details w-1/2">
                        <div className="single-product-view__section">
                            <h3 className="single-product-view text-2xl font-semibold truncate">{selectedProduct.title}</h3>
                            <RatingStars value={selectedProduct.rating}/>
                            <div className="flex flex-row items-center">
                                <div className="single-product-view__price text-lg font-semibold ">{formattedPrice(selectedProduct.price)}</div>
                                <DiscountBadge discountPercentage={selectedProduct.discountPercentage} singleProductView={true}/>
                            </div>
                            {selectedProduct.stock < 10 && (
                                <div className="single-product-view__low-stock text-red-500 text-xs font-semibold">Low Stock - only {selectedProduct.stock} remaining</div>
                            )}
                        </div>
                        <div className="single-product-view__section mt-4 pt-2 border-t-2">
                            <p className="single-product-view__description">{selectedProduct.description}</p>
                        </div>
                        <div className="single-product-view__section mt-4 pt-2 border-t-2">
                            <ul className="list-disc pl-6">
                                <li className="single-product-view__list-item">{selectedProduct.warrantyInformation}</li>
                                <li className="single-product-view__list-item">{selectedProduct.shippingInformation}</li>
                                <li className="single-product-view__list-item">sku# {selectedProduct.sku}</li>
                            </ul>
                        </div>
                        
                        <div className="single-product-view__section mt-4 pt-2 border-t-2">
                            <button className="single-product-view__add-to-cart bg-blue-500 text-white px-4 py-2 rounded">Add to Cart</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        )
}

SingleProductView.propTypes = {
    selectedProduct: PropTypes.object,
};