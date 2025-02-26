import { classList_add_rem } from "./classList_add_remove.js";
import {
    iconClose,
    galleryView,
    modalTitle,
    addView,
    line,
    button,
    form,
    wrapper,
    titleInput,
    modalDialog
} from "../modal/modal.js";
import { categories } from "../script.js";
import { modalRemoveFromFormAppendToGallery } from "./DOM_helper.js";

/**
 * This function corrects the bottom spacing at initial modal opening.
 * The issue doesn't apply to modal form nor back to gallery modal view.
 */
export function adjustModalBottomAtOpening() {
    iconClose.classList.add("icon-close-open");
    line.classList.add("hr-modal-open");
    button.classList.add("button-modal-open");
}

/**
 * This function rolls back the above adjustments designed for modal opening.
 * These are unnecessary on form and back to gallery modal views.
 */
export function removeModalOpeningAdjustment() {
    iconClose.classList.remove("icon-close-open");
    line.classList.remove("hr-modal-open");
    button.classList.remove("button-modal-open");
}

/**
 * This function displays the gallery in the modal again instead of the add work form.
 * @param { HTMLElement } back : the back left arrow
 */
export function listenToBackArrowClick(back) {
    try {
        back.addEventListener("click", () => {
            classList_add_rem(back, "hide", "display-style");
            back.style.display = "none";

            galleryView.style.display = "grid";
            
            if( ! addView) addView = document.getElementById("add-form");
            addView.classList.add("hide");
            addView.classList.add("display-style");
            addView.style.display = "none";

            if( ! modalTitle ) modalTitle = document.getElementById("modal-title");
            modalTitle.innerText = "Galerie photo";

            line.classList.remove("hr-modal-form");

            button.classList.remove("button-modal-form");
            button.innerText = "Ajouter une photo";
            button.type = "button";

            modalRemoveFromFormAppendToGallery(form, wrapper, line, button);

            classList_add_rem(button, "selected", "greyed");

            resetForm();
        });
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "Modal back icon HTML creation or DOM appendChild() error : " + error);
    }
}

/**
 * This function is used at connected mode page display. 
 * The landing page hides the modal until click on "modifier".
 */
export function hideModal() {
    try {
        if( ! modalDialog) modalDialog = document.getElementById("modal-backgrd");
        classList_add_rem(modalDialog, "hide", "modal-backgrd-display");
    } catch(error) {
        console.log("hideModal() error : " + error);
    }
}

/**
 * This function displays the modal at modifier button click.
 * @param { HTMLDialogElement } dialog
 * @returns { HTMLDialogElement } : dialog to show
 */
export function displayModal(modalDialog) {
    try {
        if( ! modalDialog) modalDialog = document.getElementById("modal-backgrd");
        classList_add_rem(modalDialog, "modal-backgrd-display", "hide");

        return modalDialog;
    } catch(error) {
        console.log("displayModal() display error : " + error);
    }
}

/**
 * This function closes(removes from the DOM) the modal 
 * at cross 
 * or 
 * click outside of the modal
 * or
 * escape key pressed down.
 * @param { HTMLDialogElement } dialog : the modal.
 */
export function closeModal(dialog) {
    try {
        const body = document.querySelector("body");
        if(body.contains(dialog)) body.removeChild(dialog);
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "closeModal() DOM removeChild() error : " + error);
    }
}

/**
 * This function clears the form input fields 
 * at modal submit and close.
 */
export function resetForm() {
    try {
        let fileInput = document.getElementById("image");
        const title = document.getElementById("title");
        const category = document.getElementById("category");
        
        fileInput.value = "";
        removeMiniImageAtReset();
        title.value = "";
        category.value = "Aucune";
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "resetForm() error : " + error);
    }
}

/**
 * This function displays a preview of the image to upload on the website.
 * @param {File} file : le nouveau projet
 * @param {HTMLDivElement} fileAddButtonWrapper : the container for image 
 * file icon, 
 * upload button and 
 * information message about accepted format and size
 */
export function displayMiniImage(file, fileAddButtonWrapper) {
    try {
        const imageMini = document.createElement("img");
        imageMini.src = URL.createObjectURL(file);
        imageMini.alt = "nouveau projet à ajouter";
        imageMini.id = "to-upload";
        const wrappedBeforeImageUpload = document.querySelectorAll(".wrapped");
        wrappedBeforeImageUpload.forEach(item => {
            item.classList.add("hide");
        });
        fileAddButtonWrapper.appendChild(imageMini);
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "displayMiniImage() HTML element creation or DOM appendChild() error : " + error);
    }
}

/**
 * This function rolls back the above displayMiniImage function.
 * It resets the input file. 
 * It removes the new project mini image and redisplays the input file elements.
 */
export function removeMiniImageAtReset() {
    try {
        const miniImage = document.getElementById("to-upload");
        if(miniImage) {
            const fileAddButtonWrapper = document.getElementById("file-add-button-wrapper");
            fileAddButtonWrapper.removeChild(miniImage);
            const wrappedBeforeImageUpload = document.querySelectorAll(".wrapped");
            wrappedBeforeImageUpload.forEach(item => {
                item.classList.remove("hide");
            });
        }
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "removeMiniImageAtReset() error: " + error);
    }
}

/**
 * This function colors the greyed form submit button when
 * a file is picked,
 * title
 * and
 * category
 * input fields are focused and valued.
 */
export function checkAddWorkInputsFilledColorsButton() {
    titleInput.addEventListener("change", () => {
        if(titleInput.value) classList_add_rem(button, "selected", "greyed");
        else if( ! titleInput.value) classList_add_rem(button, "greyed", "selected");
    });
}

/**
 * This function removes the all generic category.
 * This generic category is only used on the landing page to unfilter.
 * @param {String} genericCateg 
 * @returns {Set<String>} : the set of specific categories without unfiltering "all" category
 */
export function removeGenericCategory(genericCateg) {
    let specificCategories = categories;
    specificCategories.delete(genericCateg);
    return specificCategories;
}

/**
 * This function adds an empty category.
 * @param { String } emptyCateg 
 * @returns { Set<String> } : the set of categories with an empty category
 */
export function addEmptyCategory(emptyCateg) {
    let specificCategories = categories;
    specificCategories.add(emptyCateg);
    return specificCategories;
}