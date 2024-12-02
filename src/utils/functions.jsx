export const formattedPrice = (product, isMobile = false) => {
    if (!product.price) return;
    const [dollars, cents] = product.price.toString().split('.');
    return (
        <div className="items-start flex">
            <span className="text-sm translate-y-[3px]">$</span>
            <span className={(product.featured && isMobile) ? 'text-lg' : 'text-3xl'}>{dollars}</span>
            <span className={((product.featured && isMobile || isMobile) ? 'text-[10px] translate-y-[6px] leading-3' : 'text-sm translate-y-[3px]')}>{cents}</span>
        </div>
    );
};

export const capitalizeFirstLetter = (val) => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export const addToCard = (product) => {
    console.log('Adding to cart:', product);
}