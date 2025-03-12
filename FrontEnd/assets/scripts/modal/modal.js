import { isFileSizeLessThan4Mb } from "../helpers/file_checker.js";
import { classList_add_rem } from "../helpers/classList_add_remove.js";
import {
    displayMiniImage,
    checkAddWorkInputsFilledColorsButton,
    removeGenericCategory,
    hideModal,
    resetForm,
    removeModalOpeningAdjustment
} from "../helpers/modal_helper.js";

import { addSubmit } from "./add_work.js";
import { displayGallery } from "../landing_page/portfolio.js";

const inputFile = document.getElementById("image");
let file;
export let modalTitle = document.getElementById("modal-title");
export let iconWrapper = document.getElementById("icon-wrapper");
export let error = document.getElementById("error");
export let modalDialog;
export let backIcon = document.querySelector(".icon-back");
export let iconClose = document.querySelector(".icon-close");
/* modal gallery */
export let galleryView = document.getElementById("gallery");
export let addView = document.getElementById("add-form");
export let line = document.querySelector(".hr-modal");
export let buttonGallery = document.getElementById("modal-button-gallery");
export let buttonSubmit = document.getElementById("modal-button-submit");
export let form = document.getElementById("modal-form");
export let wrapper = document.querySelector(".modal-wrapper");

/**
 * This function listens to modal close events.
 * @param { HTMLSpanElement } modify : clicked modal open span
 */
function openModal(modify) {
    try {
        if(! modalDialog) modalDialog = document.getElementById("modal-backgrd");
        wrapper.ariaLabel= "Galerie photo";
        if(wrapper.ariaModal === "false") modalDialog.ariaModal = true;

        if(! iconClose) iconClose = document.querySelector(".icon-close");
        iconClose.addEventListener("click", () => {
            if(! buttonSubmit) buttonSubmit = document.getElementById("modal-button-submit");
            backToGalleryClass(true, true);
            if(buttonSubmit.classList.contains("display-style")) {
                resetForm();
                classList_add_rem(buttonSubmit, "hide", "display-style");
            }
            wrapper.ariaModal = "false";
            hideModal();
        });
        modalDialog.addEventListener("click", event => {
            if(event.target === modalDialog) {
                backToGalleryClass(true, true);
                if(buttonSubmit.classList.contains("display-style")) {
                    resetForm();
                    classList_add_rem(buttonSubmit, "hide", "display-style");
                }
                wrapper.ariaModal = "false";
                hideModal();
            }
        });
        document.addEventListener("keydown", (event) => {
            if(event.key === "Escape") {
                backToGalleryClass(true, true);
                if(buttonSubmit.classList.contains("display-style")) {
                    resetForm();
                    classList_add_rem(buttonSubmit, "hide", "display-style");
                }
                wrapper.ariaModal = "false";
                hideModal();
                modify.focus();
            }
        });
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "Modifier button openModal error : " + error);
    }
}

/**
 * This function adapts the CSS to form display.
 * @param { HTMLElement } iconWrapper : back and close icons wrapper div
 */
export function fromGalleryToFormClass(iconWrapper) { 
    const titleInput = document.getElementById("title");
    
    removeModalOpeningAdjustment();

    iconWrapper.classList.remove("icon-wrapper-top");

    if( ! backIcon) backIcon = document.querySelector(".icon-back");
    backIcon.style.display = "block";

    if( ! galleryView) galleryView = document.getElementById("gallery");
    galleryView.style.display = "none";

    if( ! addView) addView = document.getElementById("add-form");
    addView.style.display = "block";

    modalTitle.innerText = "Ajout photo";
    wrapper.ariaLabel = "Ajout photo";

    if( ! line) line = document.querySelector(".hr-modal");
    line.classList.add("hr-modal-form");

    displayAddWorkForm();

    if( ! buttonGallery) buttonGallery = document.querySelector(".button-modal-gallery");
    if( buttonGallery.classList.contains("display-style"))
        classList_add_rem(buttonGallery, "hide", "display-style");

    if( ! buttonSubmit) buttonSubmit = document.querySelector(".button-modal-submit");
    if( ! buttonSubmit.classList.contains("display-style") && buttonSubmit.classList.contains("hide"))
        classList_add_rem(buttonSubmit, "display-style", "hide");
    else if( ! buttonSubmit.classList.contains("display-style"))
        buttonSubmit.classList.add("display-style");

    buttonSubmit.addEventListener("click", event => {    
        /****** Step 3.3 add work ******/
        if(file && titleInput.value !== "") {
            addSubmit(event);
            /* reset modal to gallery view for next modal opening */
            backToGalleryClass(true, true);
        }
    });
}

/**
 * This function rolls back CSS classes changes of fromGalleryToFormClass() 
 * in cases of 
 * exit
 * or
 * else back arrow click.
 * @param { Boolean } close : go back to gallery at close event is true, at back icon click is false
 * @param { Boolean } form : go back to gallery view from form is true, from gallery is false  
*/
export function backToGalleryClass(close, form) {
    try {
        /* CSS open apply */
        if(close & form) 
            applyCSSforModalGalleryOpening(".hr-modal", "hr-modal-open", "hr-modal-back", "hr-modal-form");
        else if(close & ! form) {
            if( ! line.classList.contains("hr-modal-open"))
                line.classList.add("hr-modal-open");
            if( line.classList.contains("hr-modal-back"))
                line.classList.remove("hr-modal-back");
        }
        else if(close) {
            if( ! buttonGallery) buttonGallery = document.querySelector(".button-modal-gallery");
            if( buttonGallery.classList.contains("hide"))
                classList_add_rem(buttonGallery, "display-style", "hide");

            applyCSSforModalGalleryOpening(".button-modal-gallery", "button-modal-open", "button-modal-back", "button-modal-form");

            if( ! buttonSubmit) buttonSubmit = document.querySelector(".button-modal-submit");
            if( ! buttonSubmit.classList.contains("hide") && buttonSubmit.classList.contains("display-style"))
                classList_add_rem(buttonSubmit, "hide", "display-style");
            else if( ! buttonSubmit.classList.contains("hide"))
                buttonSubmit.classList.add("hide");
        }
        else {
            if( ! backIcon) backIcon = document.querySelector(".icon-back");
            backIcon.style.display = "none";
            classList_add_rem(backIcon, "hide", "display-style");

            if( ! modalTitle ) modalTitle = document.getElementById("modal-title");
            modalTitle.innerText = "Galerie photo";
            wrapper.ariaLabel = "Galerie photo";

            if( ! galleryView) galleryView = document.getElementById("gallery");
            galleryView.style.display = "grid";

            if( ! addView) addView = document.getElementById("add-form");
            addView.style.display = "none";

            line.classList.add("hr-modal-back");

            classList_add_rem(buttonSubmit, "hide", "display-style");
            classList_add_rem(buttonGallery, "display-style", "hide");
        }
        /* end CSS open apply */

        resetForm();
    } catch(error) {
        console.error(new Date.toLocaleTimeString(), "backToGalleryClass() error : " + error);
    }
}

/**
 * This function resets the modal line and main button to their modal opening CSS setting.
 * @param { HTMLElement } selector is .hr-modal or .button-modal-gallery
 * @param { String } classOpen is hr-modal-open or .button-modal-open
 * @param { String } classBack is hr-modal-back or .button-modal-back
 * @param { String } classForm is hr-modal-form or .button-modal-form
 */
function applyCSSforModalGalleryOpening(selector, classOpen, classBack, classForm) {
    const selectedElement = document.querySelector(selector);
    if( ! selectedElement.classList.contains(classOpen)
    && selectedElement.classList.contains(classBack))
        classList_add_rem(selectedElement, classOpen, classBack);
    else if ( ! selectedElement.classList.contains(classOpen)
    && selectedElement.contains(classForm))
        classList_add_rem(selectedElement, classOpen, classForm);
    else if( ! selectedElement.classList.contains(classOpen))
        selectedElement.classList.add(classOpen);
}

/**
 * This function displays the gallery in the modal again instead of the add work form.
 * @param { HTMLElement } back : the back left arrow
 */
export function listenToBackArrowClick(back) {
    try {
        back.addEventListener("click", () => {
            backToGalleryClass(false, true);
        });
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "listenToBackArrowClick() error : " + error);
    }
}

/**
 * This function sets the main modal "Ajouter une photo" and "Valider" functionality.
 */
function modalDisplayEnd() {
    try {
        iconWrapper.classList.add("icon-wrapper-top");

        if(! buttonGallery) buttonGallery = document.getElementById("modal-button-gallery");
        
        buttonGallery.addEventListener("click", event => {
            event.preventDefault();
            fromGalleryToFormClass(iconWrapper);
        });
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "Modifier button modal HTML creation or DOM appendChild() error : " + error);
    }
}

/**
 * This function displays the landing modal gallery.
 * @param { Array } works : JSON array of fetched works
 * @param { HTMLSpanElement } modify : clicked modal open span
 */
export function displayModalGallery(works, modify) {
    try {
        openModal(modify);
        displayGallery("modal", works, false);
        /****** step 3.1 display modal add work form ******/
        modalDisplayEnd();
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "displayModalGallery() error : " + error);
    }
}

/**
 * This function displays the add photo form view of the modal.
 */
function displayAddWorkForm() {
    try {
        const fileAddButtonWrapper = document.getElementById("file-add-button-wrapper");
        const categoryInput = document.getElementById("category");

        if( ! document.getElementById("modal-form"))
            createModalForm();

        if( ! document.querySelector("option")) {
            let categories = removeGenericCategory("Tous");
            categories.forEach(categorie => {
                const option = document.createElement("option");
                option.value = categorie;
                option.textContent = categorie;
                categoryInput.appendChild(option);
            });
        }

        fileAddButtonWrapper.addEventListener("click", () => {
            inputFile.click();
        });

        inputFile.addEventListener("click", async () => {
            inputFile.addEventListener("change", event => {
                file = event.target.files[0];
                if(file) {
                    if( isFileSizeLessThan4Mb(file, event)) {
                        if( ! document.getElementById("to-upload")) displayMiniImage(file, fileAddButtonWrapper);
                        checkAddWorkInputsFilledColorsButton();
                    }
                }
                else { console.warn("Aucun fichier sélectionné."); }
            });
        });
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "displayAddWorkForm() error : " + error);
    }
}