import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { capitalizeFirstLetter } from '../utils/functions.jsx'
import { setShowMobileMenu } from '../store/uiSlice.js'
import { updateFilters } from '../store/filtersSlice.js'

export default function MobileMenu() {
    const dispatch = useDispatch()
    const isMobile = useSelector((state) => state.ui.isMobile)
    const showMobileMenu = useSelector((state) => state.ui.showMobileMenu)
    const products = useSelector((state) => state.products)
    const [categoryLinks, setCategoryLinks] = useState([])
    const [menuToggles, setMenuToggles] = useState({categories: false})
    function menuToggle(string) {
        return () => {
            setMenuToggles({...menuToggles, [string]: !menuToggles[string]})
        }
    }
    function handleMenuItemClick(category) {
        dispatch(updateFilters({ category: category, brands: [], searchString: '' }))
        dispatch(setShowMobileMenu(false))
        setMenuToggles({categories: false})
    }
    
    useEffect(() => {
        if (categoryLinks.length === 0) {
            const newCategories = products.reduce((acc, product) => {
                if (!acc.includes(product.category) && product.category !== undefined) {
                    acc.push(product.category)
                }
                return acc
            }, [])
            setCategoryLinks(newCategories)
        }
    },[ products])
    
    return (
        <>
            <div className={'mobile-menu animate__animated animate__faster ' + (showMobileMenu ? 'animate__slideInRight' : 'animate__slideOutRight')}>
                <div className="mobile-menu__content">
                    <ul className="mobile-menu__content__list">
                        <Link to={'/'} className="mobile-menu__content__list__item">Home</Link>
                        <li className="mobile-menu__content__list__item" onClick={menuToggle('categories')}>
                            <span>Categories </span>
                            <i className={'fa-solid ' + (menuToggles.categories ? 'fa-angle-down' : 'fa-angle-right') }></i>
                        </li>
                        {menuToggles.categories && (
                            <ul className="mobile-menu__content__list__sublist">
                                {categoryLinks.map((category, index) => (
                                    <Link key={index} to={`/category/${category}`} onClick={() => handleMenuItemClick(category)} className={'mobile-menu__content__list__sublist__item'}>{capitalizeFirstLetter(category)}</Link>
                                ))}
                            </ul>
                        )}
                        <li className={'mobile-menu__content__list__item'} onClick={() => alert('Coming soon!')}>Account</li>
                        <li className={'mobile-menu__content__list__item'} onClick={() => alert('Coming soon!')}>Contact</li>
                    </ul>
                </div>
            </div>
        </>
    
    )
}