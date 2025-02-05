/**
 * This function displays the modal gallery view from the form view.
 * The modal "footer" line and button is appended to gallery wrapper.
 * @param { HTMLElement } form 
 * @param { Element } wrapper
 * @param { Element } line 
 * @param { HTMLElement } button 
 */
export function modalRemoveFromFormAppendToGallery(form, wrapper, line, button) {
    if(form.contains(line)) form.removeChild(line);
    if(form.contains(button)) form.removeChild(button);
    if( ! wrapper.contains(line)) wrapper.appendChild(line);
    if( ! wrapper.contains(button)) wrapper.appendChild(button);
}

/**
 * This function toggles the modal from gallery to form.
 * @param {HTMLElement} form 
 * @param {Element} wrapper 
 * @param {HTMLElement} button 
 * @param {Element} line 
 */
export function modalRemoveFromWrapperAppendToForm(form, wrapper, button, line) {
    if(wrapper.contains(button)) wrapper.removeChild(button);
    if(wrapper.contains(line)) wrapper.removeChild(line);
    if( ! form.contains(line)) form.appendChild(line);
    if( ! form.contains(button)) form.appendChild(button);
}