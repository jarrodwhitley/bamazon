import { useState } from 'react';
import '../assets/scss/NavigationBar.scss';

function NavigationBar() {
    const [isMobile, setIsMobile] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const [scrolling, setScrolling] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);
    const [radMode, setRadMode] = useState(true);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showNonsense, setShowNonsense] = useState(false);
    const [showPortfolioModal, setShowPortfolioModal] = useState(false);
    const navHeaderText = "Your Header Text";
    
    const exitFullscreen = () => setFullscreen(false);
    const togglePortfolioModal = () => setShowPortfolioModal(!showPortfolioModal);
    const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);
    const toggleNoneSense = () => setShowNonsense(!showNonsense);
    
    return (
        <nav className={`${isMobile ? 'mobile' : ''} ${showChat && isMobile ? 'hide' : ''} ${scrolling && !fullscreen ? 'fill' : ''} ${!radMode ? 'professional-mode' : ''}`}>
            <div className="logo" onClick={exitFullscreen}>
                <img src="/src/assets/images/jw-logo.svg" alt="Jarrod Whitley" />
            </div>
            <div className="nav-title">{navHeaderText}</div>
            <div className={`links animate__animated ${showMobileMenu ? 'show' : ''}`} style={{ display: fullscreen ? 'none' : 'block' }}>
                <a className="portfolio" onClick={togglePortfolioModal} title="See UI/UX portfolio">
                    <i className="fa-brands fa-sketch"></i>
                </a>
                <span className="divider">|</span>
                <a title="Display page in Vue"><i className="fa-brands fa-vuejs"></i></a>
                <a className="disabled" href="#" title="Display page in React (Under Construction)"><i className="fa-brands fa-react"></i></a>
                <a href="https://linkedin.com/in/jarrodwhitley"><i className="fa-brands fa-linkedin"></i></a>
                <a href="https://github.com/jarrodwhitley"><i className="fa-brands fa-github"></i></a>
            </div>
            <div className="uc-message" onClick={toggleNoneSense}>
                <span>🚧 Under Construction 🚧</span>
                <div className={`slide-down ${showNonsense ? 'show' : ''}`}>
                    <figure>
                        <img src="/src/assets/images/sweaty-speedrunner.gif" alt="Under Construction" />
                    </figure>
                </div>
            </div>
            {isMobile && !fullscreen && (
                <div className="mobile-menu-btn" onClick={toggleMobileMenu}>
                    <i className={`fa-solid ${showMobileMenu ? 'fa-times' : 'fa-bars'}`}></i>
                </div>
            )}
            {fullscreen && (
                <div onClick={exitFullscreen} className={`exit-fullscreen animate__animated ${fullscreen ? 'animate__fadeIn' : 'animate__fadeOut'}`}>
                    <i className="fa-solid fa-times"></i>
                </div>
            )}
            {showPortfolioModal && (
                <div id="portfolioModal" className="mos9">
                    <div className="mos9-window">
                        <div className="mos9-window__header">
                            <div className="mos9-window__tools">
                                <a href="#" onClick={togglePortfolioModal} className="mos9-window__close mos9-button"></a>
                            </div>
                            <div className="mos9-window__title">Mac OS</div>
                            <div className="mos9-window__tools">
                                <a href="#" onClick={togglePortfolioModal} className="mos9-window__tool--1 mos9-button"></a>
                                <a href="#" onClick={togglePortfolioModal} className="mos9-window__tool--2 mos9-button"></a>
                            </div>
                        </div>
                        <div className="mos9-window__content">
                            <h2>UI/UX Portfolio Coming Soon!</h2>
                            {[...Array(9)].map((_, index) => (
                                <div key={index} className="mos9-window__content__img-container">
                                    <img src="/src/assets/images/no-image-icon.png" alt="Coming Soon" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default NavigationBar;