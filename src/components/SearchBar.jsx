import PropTypes from "prop-types";
import FontAwesomeIcon from "./FontAwesomeIcon.jsx";
import { useProducts } from "./ContextProvider.jsx";
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

function selectItem(item) {
    console.log(item);
}

export default function SearchBar({ onFilterProducts }) {
    const products = useProducts();
    
    const formatResult = (item) => {
        return (
            <>
                <span style={{display: 'block', textAlign: 'left'}}>{item.title}</span>
            </>
        )
    }
    
    const handleOnSearch = (string) => {
        onFilterProducts(string);
    };
    
    const handleOnSelect = (item) => {
        selectItem(item);
    };
    
    return (
        <div className="search-bar w-1/2 relative">
            <ReactSearchAutocomplete
                items={products}
                onSearch={query => {
                    handleOnSearch(query);
                }}
                onSelect={item => {
                    handleOnSelect(item);
                }}
                fuseOptions={{keys: ['title', 'tags', 'brand']}}
                autoFocus
                placeholder="Search products..."
                styling={{
                    height: '40px',
                    borderRadius: '5px',
                    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
                    fontSize: '16px',
                    zIndex: 1000,
                }}
                formatResult={formatResult}/>
        </div>
    );
}

SearchBar.propTypes = {
    onFilterProducts: PropTypes.func.isRequired
};