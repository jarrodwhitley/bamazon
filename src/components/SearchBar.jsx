import FontAwesomeIcon from "./FontAwesomeIcon.jsx";
import { useProducts } from "./ContextProvider.jsx";
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

function SearchBar() {
    const products = useProducts();
    
    const formatResult = (item) => {
        return (
            <>
                {/*<span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span>*/}
                <span style={{ display: 'block', textAlign: 'left' }}>{item.title}</span>
            </>
        )
    }
    
    const handleOnSearch = (string, results) => {
        // Filter the items based on the search string
        
    };
    
    const handleOnSelect = (item) => {
        selectItem(item);
        console.log(item);
    };
    
    
    return (
        <div className="search-bar w-1/2 relative">
            <ReactSearchAutocomplete
                items={products}
                onSearch={query => {
                    console.log(query);
                }}
                onSelect={item => {
                    console.log(item);
                }}
                fuseOptions={{ keys: ['title', 'tags', 'brand'] }}
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
            {/*<input type="text" placeholder="Search products..." className="search-bar__input w-full h-10 px-4 rounded-md"/>*/}
            {/*<button className="search-bar__btn absolute top-0 right-0 h-10 w-10 bg-blue-600 text-white rounded-md">*/}
            {/*    <FontAwesomeIcon icon="fa-search"/>*/}
            {/*</button>*/}
        </div>
    );
}

export default SearchBar;