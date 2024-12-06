export const formattedPrice = (product, isMobile = false) => {
    if (!product.price) return;
    const [dollars, cents] = product.price.toString().split('.');
    return (
        <div className="items-start flex font-semibold">
            <span className="text-sm translate-y-[3px]">$</span>
            <span className={(isMobile) ? 'text-lg' : 'text-2xl'}>{dollars}</span>
            <span className={((product.featured && isMobile || isMobile) ? 'text-[10px] translate-y-[6px] leading-3' : 'text-sm translate-y-[3px]')}>{cents}</span>
        </div>
    );
};

export const capitalizeFirstLetter = (val) => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}