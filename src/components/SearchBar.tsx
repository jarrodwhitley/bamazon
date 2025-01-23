import PropTypes from 'prop-types'
import {useEffect, useRef, useCallback} from 'react'
import {setSelectedProduct} from '../store/selectedProductSlice.ts'
import {updateFilters, clearFilters, filtersActive} from '../store/filtersSlice.ts'
import {setShowMobileSearch} from '../store/uiSlice.ts'
import {ReactSearchAutocomplete} from 'react-search-autocomplete'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export default function SearchBar({classes}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isMobile = useSelector((state) => state.ui.isMobile)
    const filters = useSelector((state) => state.filters)
    const products = useSelector((state) => state.products)
    const filtersActiveState = useSelector(filtersActive)
    const selectedFiltersState = useSelector((state) => state.filters)
    const parentAutocompleteRef = useRef(null)

    const handleSelectProduct = (product) => {
        dispatch(setSelectedProduct(product))
    }
    const handleOnSearch = (string) => {
        dispatch(
            updateFilters({
                ...selectedFiltersState,
                searchString: string || '',
            })
        )
        dispatch(setShowMobileSearch(false))
    }
    const handleOnSelect = (product) => {
        dispatch(
            updateFilters({
                ...selectedFiltersState,
                searchString: product.title,
            })
        )
        dispatch(setShowMobileSearch(false))
        handleSelectProduct(product)
        navigate('/product/' + product.id)
        handleOnClear()
    }
    const handleOnClear = () => {
        dispatch(clearFilters())
    }
    const handleOnEnterPress = useCallback(
        (e) => {
            if (e.key === 'Enter') {
                navigate('/results/' + selectedFiltersState.searchString)
            }
        },
        [navigate, selectedFiltersState.searchString]
    )

    useEffect(() => {
        window.addEventListener('keypress', handleOnEnterPress)
        return () => {
            window.removeEventListener('keypress', handleOnEnterPress)
        }
    }, [handleOnEnterPress])

    return (
        <div className={classes}>
            <ReactSearchAutocomplete
                items={products}
                inputSearchString={selectedFiltersState.searchString || ''}
                onSearch={handleOnSearch}
                onSelect={handleOnSelect}
                onClear={handleOnClear}
                fuseOptions={{keys: ['title', 'brand']}}
                resultStringKeyName="title"
                autoFocus={false}
                placeholder="Search products..."
                styling={
                    isMobile
                        ? {
                              height: '40px',
                              borderRadius: '5px',
                              boxShadow: '0',
                              fontSize: '18px',
                              zIndex: 10,
                          }
                        : {
                              height: '40px',
                              borderRadius: '5px',
                              boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
                              fontSize: '16px',
                              zIndex: 10,
                          }
                }
                showNoResults={true}
                formatResult={(item) => <span style={{display: 'block', textAlign: 'left'}}>{item.title}</span>}
            />
        </div>
    )
}

SearchBar.propTypes = {
    classes: PropTypes.string,
}
