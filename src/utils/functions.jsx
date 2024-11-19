export const formattedPrice = (price) => {
    if (!price) return;
    const [dollars, cents] = price.toString().split('.');
    return (
        <div className="items-start flex">
            <span className="text-sm translate-y-[3px]">$</span>
            <span className="text-3xl">{dollars}</span>
            <span className="text-sm translate-y-[2px]">{cents}</span>
        </div>
    );
};