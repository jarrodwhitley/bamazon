import {useSelector} from 'react-redux'
import {filtersActive} from '../store/filtersSlice.js'
import BamazonLogo from '../assets/images/bamazon_logo_v1.1.png'

export default function Footer() {
    const isFiltering = useSelector(filtersActive)

    return (
        <>
            {!isFiltering && (
                <footer className="">
                    <div className="footer-content">
                        <div className="footer-links__navigation">
                            <div className={'text-lg font-semibold'}>Site</div>
                            <a href="#">Home</a>
                            <a href="#">About</a>
                            <a href="#">Contact</a>
                        </div>
                        <div className="footer-links__legal">
                            <div className={'text-lg font-semibold mt-6'}>Legal</div>
                            <a href="#">Privacy Policy</a>
                            <a href="#">Terms of Service</a>
                            <a href="#">Accessibility</a>
                        </div>
                        <div className="footer-links__contact">
                            <div className={'text-lg font-semibold'}>Contact</div>
                            <a>123-456-7890</a>
                            <a>5555 Fake St, Springfield, IL 62701</a>
                            <a>hello@bamazon.com</a>
                        </div>
                        <div className="footer-links__social">
                            <div className={'text-lg font-semibold'}>Social</div>
                            <a href="#" className={'grid grid-rows-1 grid-cols-[20px_1fr] items-center'}>
                                <i className="fa-brands fa-facebook-f row-start-1"></i>
                                <span className="row-start-1">Facebook</span>
                            </a>
                            <a href="#" className={'grid grid-rows-1 grid-cols-[20px_1fr] items-center'}>
                                <i className="fa-brands fa-twitter row-start-1"></i>
                                <span className="row-start-1">Twitter</span>
                            </a>
                            <a href="#" className={'grid grid-rows-1 grid-cols-[20px_1fr] items-center'}>
                                <i className="fa-brands fa-instagram row-start-1"></i>
                                <span className="row-start-1">Instagram</span>
                            </a>
                        </div>
                        <div className={'footer-links__help'}>
                            <div className={'text-lg font-semibold mt-6'}>Help</div>
                            <a href="#">FAQ</a>
                            <a href="#">Returns</a>
                            <a href="#">Shipping</a>
                        </div>
                    </div>
                </footer>
            )}
        </>
    )
}
