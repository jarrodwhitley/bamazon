import { useSelectedFilters, useSetSelectedFilters, useSetFilteredProducts, useSetIsFiltering} from "../components/ContextProvider.jsx";

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

export const filterProducts = (products, filters) => {
    const currentFilters = useSelectedFilters();
    const setSelectedFilters = useSetSelectedFilters();
    const setFilteredProducts = useSetFilteredProducts();
    const setIsFiltering = useSetIsFiltering();
    const isFiltering = useIsFiltering();

    if (filters.searchString) {
        if (filters.searchString.length > 2) {
            let filtered = products.filter(product => {
                return product.title.toLowerCase().includes(filters.searchString.toLowerCase()) ||
                    product.tags.join(' ').toLowerCase().includes(filters.searchString.toLowerCase()) ||
                    (product.brand && product.brand.toLowerCase().includes(filters.searchString.toLowerCase())) ||
                    product.description.toLowerCase().includes(filters.searchString.toLowerCase());
            });
            setFilteredProducts(filtered);
            setIsFiltering(true);
        } else {
            setFilteredProducts(products);
            setIsFiltering(false);
        }
    } else {
        return products.filter(product => {
            const categoryMatch = filters.categories.length === 0 || filters.categories.includes(product.category);
            const brandMatch = filters.brands.length === 0 || filters.brands.includes(product.brand);
            const priceMatch = filters.prices.length === 0 || filters.prices.some(price => product.price >= price.min && product.price <= price.max);
            return categoryMatch && brandMatch && priceMatch;
        });
    }
}