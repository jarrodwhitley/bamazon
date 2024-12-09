import {useSelector} from 'react-redux'
import {filtersActive} from '../store/filtersSlice.js'
import BamazonLogo from '../assets/images/bamazon_logo_v1.1.png'

export default function Footer() {
    const isFiltering = useSelector(filtersActive)

    return (
        <>
            {!isFiltering && (
                <footer className="bg-blue-950 mt-6 text-white">
                    <div className="footer-content grid grid-rows-2 lg:grid-rows-1 grid-cols-2 lg:grid-cols-4 w-full p-8 gap-4 text-sm max-w-[1400px] mx-auto">
                        <div className={'hidden lg:block row-start-1 col-start-1'}>
                            <figure className="footer-logo -translate-x-[14px] w-fit h-fit flex items-center justify-center">
                                <img src={BamazonLogo} className={'object-contain'} width={120} alt="BAMazon logo" />
                            </figure>
                            <div className={'footer-links__lorem hidden lg:flex flex-col row-start-2 col-start-1'}>
                                <div className={'text-sm'}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis neque imperdiet, faucibus velit sit amet, pulvinar nibh. Nunc cursus mattis vehicula. </div>
                            </div>
                        </div>
                        <div className="footer-links__navigation hidden lg:flex col-start-2 flex-col gap-2">
                            <div className={'text-lg font-semibold'}>Site</div>
                            <a href="#">Home</a>
                            <a href="#">About</a>
                            <a href="#">Contact</a>
                        </div>
                        <div className="footer-links__legal flex flex-col row-start-2 lg:col-start-3 gap-2">
                            <div className={'text-lg font-semibold mt-6'}>Legal</div>
                            <a href="#">Privacy Policy</a>
                            <a href="#">Terms of Service</a>
                            <a href="#">Accessibility</a>
                        </div>
                        <div className="footer-links__contact flex flex-col row-start-1 col-start-1 lg:col-start-3 gap-2">
                            <div className={'text-lg font-semibold'}>Contact</div>
                            <a>123-456-7890</a>
                            <a>5555 Fake St, Springfield, IL 62701</a>
                            <a>hello@bamazon.com</a>
                        </div>
                        <div className="footer-links__social flex flex-col row-start-1 lg:col-start-4 gap-2">
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
                        <div className={'footer-links__help flex flex-col row-start-2 lg:col-start-4 gap-2'}>
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
