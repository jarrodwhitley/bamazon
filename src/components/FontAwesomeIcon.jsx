import '../assets/fontawesome/css/all.css';
import PropTypes from 'prop-types';

function FontAwesomeIcon({icon, type='solid', classes}) {
    return (
        <i className={`fa-${type} ${icon} ${classes}`}></i>
    )
}

FontAwesomeIcon.propTypes = {
    icon: PropTypes.string.isRequired,
    type: PropTypes.string,
    classes: PropTypes.string
};

export default FontAwesomeIcon;