/**
 * This function displays a user error message.
 * @param {String} errorMessage : the message to display
 * @param {Element} errorElement : the HTML element used to display the message
 */
export function displayError(errorMessage, errorElement) {
    errorElement.innerText = errorMessage;
}

/**
 * This function deletes the error message, if one was set.
 * @param { Element } errorElement : the <p id="error"> used to display user error messages. 
 */
export function resetError(errorElement) {
    if(errorElement.innerText !== "") errorElement.innerText = "";
}