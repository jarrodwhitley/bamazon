export const formattedPrice = (product, type, isMobile = false) => {
    if (!product) return
    if (type === 'list') {
        const listPrice = product.price + product.price * (product.discountPercentage / 100)
        let [dollars, cents] = listPrice.toString().split('.')
        if (cents) cents = cents.slice(0, 2)
        return (
            <span className="flex items-start font-semibold leading-[1]">
                <span className="text-[10px] translate-y-[0.3rem]">$</span>
                <span className={isMobile ? 'text-sm' : 'text-lg'}>{dollars}</span>
                <span className={isMobile ? 'text-[9px] translate-y-[2px] leading-3' : 'text-xs translate-y-[4px]'}>{cents}</span>
            </span>
        )
    } else if (type === 'sale') {
        const [dollars, cents] = product.price.toString().split('.')
        return (
            <span className="items-start flex font-semibold">
                <span className="text-sm translate-y-[3px]">$</span>
                <span className={isMobile ? 'text-lg' : 'text-2xl'}>{dollars}</span>
                <span className={(product.featured && isMobile) || isMobile ? 'text-[10px] translate-y-[6px] leading-3' : 'text-sm translate-y-[2px]'}>{cents}</span>
            </span>
        )
    }
}

export const capitalizeFirstLetter = (val) => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1)
}
