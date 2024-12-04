import PropTypes from "prop-types";
import {useEffect, useState } from "react";
import BamazonBam from "../assets/images/bamazon_logo_text_bam.png";
import BamazonBoom from "../assets/images/bamazon_logo_boom.png";
export default function LoadingOverlay({ isLoading }) {
    const [showOverlay, setShowOverlay] = useState(true);
    
    useEffect(() => {
        if (!isLoading) {
            // setTimeout(() => {
                setShowOverlay(false);
            // }, 1000);
        }
    }, [isLoading]);
    
    
    return (
        <div className={(showOverlay ? '' : 'animate__fadeOut ') + 'loading-overlay animate__animated absolute top-0 left-0 w-full h-screen bg-white z-20 grid grid-cols-1 grid-rows-1 items-center justify-items-center'}>
            <img src={BamazonBam} alt="Bamazon Bam" className="w-1/6 animate__animated animate__rotateOut animate__infinite row-start-1 col-start-1 z-10"/>
            <img src={BamazonBoom} alt="Bamazon Boom" className="w-1/6 animate__animated animate__pulse animate__infinite row-start-1 col-start-1"/>
        </div>
    );
}

LoadingOverlay.propTypes = {
    isLoading: PropTypes.bool
}

