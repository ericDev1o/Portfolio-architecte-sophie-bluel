import { classList_add_rem } from "./classList_add_remove.js";

/**
 * This function resets the modal line and main button to their modal opening CSS setting.
 * The display use case is :
 *     given the modal add view is displayed
 *     when the user closes the modal
 *     then the modal is hidden and applyed CSS moves the selected element to its place at modal opening
 * @param { HTMLElement } selector is .hr-modal or .button-modal-gallery
 * @param { String } classOpen is hr-modal-open or .button-modal-open
 * @param { String } classBack is hr-modal-back or .button-modal-back
 * @param { String } classForm is hr-modal-form or .button-modal-form
 */
export function applyCSSforModalGalleryOpeningFromForm(selector, classOpen, classBack, classForm) {
    const selectedElement = document.querySelector(selector); 

    if( ! selectedElement.classList.contains(classOpen)
    && selectedElement.classList.contains(classBack)) 
        classList_add_rem(selectedElement, classOpen, classBack);

    else if ( ! selectedElement.classList.contains(classOpen)
    && selectedElement.classList.contains(classForm))
        classList_add_rem(selectedElement, classOpen, classForm);

    else if( ! selectedElement.classList.contains(classOpen))
        selectedElement.classList.add(classOpen);
    if(selectedElement.classList.contains(classBack))
        selectedElement.classList.remove(classBack);
    if(selectedElement.classList.contains(classForm))
        selectedElement.classList.remove(classForm);
}

/**
 * This function resets the modal line and main button to their modal opening CSS setting.
 * The display use case is :
 *    given the modal gallery view is displayed after add view and back arrow click
 *    when the user closes the modal
 *    then the modal is hidden and applyed CSS moves the selected element to its place at modal opening
 * @param { Element } line 
 * @param { HTMLElement } buttonGallery 
 */
export function applyCSSforModalGalleryOpeningFromBack(line, buttonGallery) {
    if( ! line.classList.contains("hr-modal-open"))
        line.classList.add("hr-modal-open");
    if( line.classList.contains("hr-modal-back"))
        line.classList.remove("hr-modal-back");

    if( ! buttonGallery.classList.contains("button-modal-open"))
        buttonGallery.classList.add("button-modal-open");
    if( buttonGallery.classList.contains("button-modal-back"))
        buttonGallery.classList.remove("button-modal-back");
}