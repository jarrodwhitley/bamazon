import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {capitalizeFirstLetter} from '../utils/functions.tsx'
import {setModal, setShowMobileMenu} from '../store/uiSlice.ts'
import {updateFilters} from '../store/filtersSlice.ts'

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
        dispatch(updateFilters({category: category, brands: [], searchString: ''}))
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
    }, [products])

    return (
        <>
            <div className={'mobile-menu animate__animated animate__faster ' + (showMobileMenu ? 'animate__slideInRight' : 'animate__slideOutRight')}>
                <div className="mobile-menu__content">
                    <ul className="mobile-menu__content__list">
                        <Link to={'/'} className="mobile-menu__content__list__item" onClick={() => dispatch(setShowMobileMenu(false))}>
                            Home
                        </Link>
                        <li className="mobile-menu__content__list__item" onClick={menuToggle('categories')}>
                            <span>Categories </span>
                            <i className={'fa-solid ' + (menuToggles.categories ? 'fa-angle-down' : 'fa-angle-right')}></i>
                        </li>
                        {menuToggles.categories && (
                            <ul className="mobile-menu__content__list__sublist">
                                {categoryLinks.map((category, index) => (
                                    <Link key={index} to={`/category/${category}`} onClick={() => handleMenuItemClick(category)} className={'mobile-menu__content__list__sublist__item'}>
                                        {capitalizeFirstLetter(category)}
                                    </Link>
                                ))}
                            </ul>
                        )}
                        <li className={'mobile-menu__content__list__item'} onClick={() => alert('Coming soon!')}>
                            Account
                        </li>
                        <li className={'mobile-menu__content__list__item'} onClick={() => dispatch(setModal('contact'))}>
                            Contact
                        </li>
                        <li className={'mobile-menu__content__list__item border-t-2 border-gray-100'}>
                            <a className={'flex items-center gap-4 text-blue-950'} href={'https://jarrodwhitley.com'}>
                                My main website <i className={'fa-solid fa-arrow-up-right-from-square text-base'}></i>
                            </a>
                        </li>
                        <li className={'mobile-menu__content__list__item'}>
                            <a className={'flex items-center gap-4 text-blue-950'} href={'https://github.com/jarrodwhitley'}>
                                Github Project <i className={'fa-solid fa-arrow-up-right-from-square text-base'}></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}
