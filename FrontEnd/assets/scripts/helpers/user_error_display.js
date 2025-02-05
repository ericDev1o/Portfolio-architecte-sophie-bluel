/**
 * This function displays a user error message.
 * @param {String} error : the message to display
 * @param {Element} errorElement : the HTML element used to display the message
 */
export function displayError(error, errorElement) {
    errorElement.innerHTML = error;
}