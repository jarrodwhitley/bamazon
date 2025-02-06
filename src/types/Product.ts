import Review from './Review'

interface Meta {
    createdAt: string
    updatedAt: string
    barcode: string
    qrCode: string
}

export default interface Product {
    id: number
    title: string
    description: string
    price: number
    discountPercentage: number
    rating: number
    stock: number
    brand: string
    category: string
    warrantyInformation: string
    shippingInformation: string
    availabilityStatus: string
    reviews: Review[]
    returnPolicy: string
    minimumOrderQuantity: number
    meta: Meta
    sku: string
    images: string[]
    thumbnail: string
    featured: boolean
    dimensions: {
        width: number
        height: number
        depth: number
    }
    weight: number
}
