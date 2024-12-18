import {useDispatch, useSelector} from 'react-redux'
import PropTypes from 'prop-types'
import ContactForm from './forms/ContactForm.jsx';
import { clearModal } from '../store/uiSlice.js';

export default function Modal() {
    const dispatch = useDispatch()
    const modal = useSelector(state => state.ui.modal)
    
    const handleModalClose = () => {
        dispatch(clearModal())
    }
    
    return (
        <div className={'modal__container animate__animated ' + (modal ? 'animate__fadeIn' : 'hidden pointer-events-none')}>
            <div className={'modal__content animate__animated ' + (modal ? 'animate__slideInUp' : 'animate__slideOutDown animate__faster')}>
                <div className={'modal__close-button'} onClick={handleModalClose}>
                    <i className={'fa-solid fa-times'}></i>
                </div>
                {modal === 'contact' && (
                    <ContactForm/>
                )}
            </div>
        </div>
    )
}