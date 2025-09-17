import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

export default function Footer() {
    const location = useLocation()
    const showFooterRoutes = ['/product/', '/results/']
    const showFooter = !showFooterRoutes.some((route) => location.pathname.includes(route))
    
    return (
        <>
        {showFooter && (
                <footer className="">
                    <div className="footer-content">
                        <div className="footer-links__legal">
                            <div className={'text-lg font-semibold'}>Legal</div>
                            <a href="#" className={'footer__link'}>Privacy Policy</a>
                            <a href="#" className={'footer__link'}>Terms of Service</a>
                            <a href="#" className={'footer__link'}>Accessibility</a>
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
                            <div className={'text-lg font-semibold'}>Help</div>
                            <a href="#" className={'footer__link'}>FAQ</a>
                            <a href="#" className={'footer__link'}>Returns</a>
                            <a href="#" className={'footer__link'}>Shipping</a>
                        </div>
                    </div>
                </footer>
            )}
        </>
    )
}
