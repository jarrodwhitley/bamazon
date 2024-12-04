import {useIsFiltering} from "./ContextProvider.jsx";
import BamazonLogo from '../assets/images/bamazon_logo_v1.1.png';

export default function Footer() {
    const isFiltering = useIsFiltering();
    return (
        <>
            {!isFiltering && (
                <footer className="h-[500px] bg-blue-950 mt-6 text-white">
                    <div className="footer-content grid grid-rows-1 grid-cols-4 w-full pt-8 px-10">
                        <figure className="footer-logo w-fit h-fit flex items-center justify-center row-start-1 col-start-1">
                            <img src={BamazonLogo} className={'object-contain'} width={120} alt="BAMazon logo"/>
                        </figure>
                        <div className="footer-links__navigation flex col-start-2 flex-col">
                            <div className={'text-xl'}>Site</div>
                            <a href="#">Home</a>
                            <a href="#">About</a>
                            <a href="#">Contact</a>
                        </div>
                        <div className="footer-links__legal flex flex-col row-start-2 col-start-3">
                            <div className={'text-xl mt-6'}>Legal</div>
                            <a href="#">Privacy Policy</a>
                            <a href="#">Terms of Service</a>
                            <a href="#">Accessibility</a>
                        </div>
                        <div className="footer-links__contact flex flex-col row-start-1 col-start-3">
                            <div className={'text-xl'}>Contact</div>
                            <a>123-456-7890</a>
                            <a>5555 Fake St, Springfield, IL 62701</a>
                            <a>hello@bamazon.com</a>
                        </div>
                        <div className="footer-links__social flex flex-col row-start-1 col-start-4">
                            <div className={'text-xl'}>Social</div>
                            <a href="#" className={'grid grid-rows-1 grid-cols-[20px_1fr] items-center'}>
                                <i className="fa-brands fa-facebook-f row-start-1"></i>
                                <span className="row-start-1">Facebook</span>
                            </a>
                            
                            <a href="#" className={'grid grid-rows-1 grid-cols-[20px_1fr] items-center'}><i className="fa-brands fa-twitter row-start-1"></i>
                                <span className="row-start-1">Twitter</span>
                            </a>
                            
                            <a href="#" className={'grid grid-rows-1 grid-cols-[20px_1fr] items-center'}><i className="fa-brands fa-instagram row-start-1"></i>
                                <span className="row-start-1">Instagram</span>
                            </a>
                        </div>
                    </div>
                </footer>
                )}
        </>
    );
}