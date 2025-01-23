import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import BamazonBam from '../assets/images/bamazon_logo_text_bam.png'
import BamazonBoom from '../assets/images/bamazon_logo_boom.png'
import {setIsLoading} from '../store/uiSlice.ts'

export default function LoadingOverlay() {
    const isLoading = useSelector((state) => state.ui.isLoading)
    const [showOverlay, setShowOverlay] = useState(true)

    useEffect(() => {
        if (!isLoading) {
            setShowOverlay(false)
        } else {
            setShowOverlay(true)
        }
    }, [isLoading])

    return (
        <div className={'loading-overlay animate__animated ' + (showOverlay ? '' : 'animate__fadeOut pointer-events-none ')}>
            <img src={BamazonBam} className={'loading-overlay__bam animate__animated animate__rotateOut animate__infinite'} alt="Bamazon Bam" />
            <img src={BamazonBoom} className={'loading-overlay__boom animate__animated animate__pulse animate__infinite'} alt="Bamazon Boom" />
        </div>
    )
}
