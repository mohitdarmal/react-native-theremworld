import {showMessage, hideMessage} from "react-native-flash-message";

const showError = (message) => {
    showMessage({
        type: 'danger',
        icon : 'danger',
        message
    })
}

const showSuccecss = (message) => {
    showMessage ({
        type : 'success',
        icon: 'success',
        message
    })
}

export {showError, showSuccecss}