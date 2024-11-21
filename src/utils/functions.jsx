export const formattedPrice = (product, isMobile) => {
    if (!product.price) return;
    const [dollars, cents] = product.price.toString().split('.');
    return (
        <div className="items-start flex">
            <span className="text-sm translate-y-[3px]">$</span>
            <span className={(product.featured && isMobile) ? 'text-lg' : 'text-3xl'}>{dollars}</span>
            <span className={'text-sm translate-y-[3px] ' +
                ((product.featured && isMobile) ? 'text-[10px]' : 'text-3xl')}>{cents}</span>
        </div>
    );
};

export const capitalizeFirstLetter = (val) => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}