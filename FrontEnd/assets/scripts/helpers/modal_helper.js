import { classList_add_rem } from "./classList_add_remove.js";
import {
    iconClose,
    line,
    button,
    modalDialog
} from "../modal/modal.js";
import { categories } from "../script.js";

/**
 * This function corrects the bottom spacing at initial modal opening.
 * The issue doesn't apply to modal form nor back to gallery modal view.
 */
export function adjustModalBottomAtOpening() {
    try {
        iconClose.classList.add("icon-close-open");
        line.classList.add("hr-modal-open");
        button.classList.add("button-modal-open");
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "adjustModalBottomAtOpening() error : " + adjustModalBottomAtOpening);
    }
}

/**
 * This function rolls back the above adjustments designed for modal opening.
 * These are unnecessary on form and back to gallery modal views.
 */
export function removeModalOpeningAdjustment() {
    try {
        iconClose.classList.remove("icon-close-open");
        line.classList.remove("hr-modal-open");
        button.classList.remove("button-modal-open");
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "removeModalOpeningAdjustment() error : " + error);
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
        console.error(new Date().toLocaleTimeString(), "hideModal() error : " + error);
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
        console.error(new Date().toLocaleTimeString(), "displayModal() display error : " + error);
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
        
        fileInput.value = "";
        removeMiniImageAtReset();
        title.value = "";
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
    try {
        const titleInput = document.getElementById("title");
        titleInput.addEventListener("change", () => {
            if(titleInput.value) classList_add_rem(button, "selected", "greyed");
            else if( ! titleInput.value) classList_add_rem(button, "greyed", "selected");
        });
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "checkAddWorkInputsFilledColorsButton() error : " + error);
    }
}

/**
 * This function removes the all generic category.
 * This generic category is only used on the landing page to unfilter.
 * @param {String} genericCateg 
 * @returns {Set<String>} : the set of specific categories without unfiltering "all" category
 */
export function removeGenericCategory(genericCateg) {
    try {
        let specificCategories = categories;
        specificCategories.delete(genericCateg);
        return specificCategories;
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "removeGenericCategory() error : " + error);
    }
}