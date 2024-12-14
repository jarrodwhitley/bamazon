import { useSelector, useDispatch } from 'react-redux'

export default function MobileMenu() {
    const dispatch = useDispatch()
    const isMobile = useSelector((state) => state.ui.isMobile)
    return (
        <div className="mobile-menu">
            <div className="mobile-menu__header">
                <h1>Menu</h1>
                <button className="mobile-menu__close-button">X</button>
            </div>
            <div className="mobile-menu__content">
                <ul className="mobile-menu__content__list">
                    <li className="mobile-menu__content__list__item">Home</li>
                    <li className="mobile-menu__content__list__item">Products</li>
                    <li className="mobile-menu__content__list__item">About</li>
                    <li className="mobile-menu__content__list__item">Contact</li>
                </ul>
            </div>
        </div>
    )
}