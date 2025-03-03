import { checkFileMaxSize } from "../helpers/file_checker.js";
import { classList_add_rem } from "../helpers/classList_add_remove.js";
import {
    displayMiniImage,
    checkAddWorkInputsFilledColorsButton,
    removeGenericCategory,
    addEmptyCategory,
    hideModal,
    resetForm,
    removeModalOpeningAdjustment
} from "../helpers/modal_helper.js";
import { 
    modalRemoveFromFormAppendToGallery, 
    modalRemoveFromWrapperAppendToForm 
} from "../helpers/DOM_helper.js";

import { addSubmit } from "./add_work.js";
import { displayGallery } from "../landing_page/portfolio.js";

const inputFile = document.getElementById("image");
const titleInput = document.getElementById("title");
const categoryInput = document.getElementById("category");
let file;
export let modalTitle = document.getElementById("modal-title");
export let iconWrapper = document.getElementById("icon-wrapper");
export const title = document.createElement("h3");
export let error = document.getElementById("error");
export let modalDialog;
export let backIcon = document.querySelector(".icon-back");
export let iconClose = document.querySelector(".icon-close");
/* modal gallery */
export let galleryView = document.getElementById("gallery");
export let addView = document.getElementById("add-form");
export let line = document.querySelector(".hr-modal");
export let button = document.getElementById("modal-button");
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
        if(wrapper.ariaModal === "false") modalDialog.ariaModal = "true";

        if(! iconClose) iconClose = document.querySelector(".icon-close");
        iconClose.addEventListener("click", () => {
            if(! button) button = document.getElementById("modal-button");
            if(button.innerText === "Valider" && button.type === "submit") {
                backToGalleryClass();
                switchModalViewFromFormToGallery();
                resetForm();
            }
            wrapper.ariaModal = "false";
            hideModal();
        });
        modalDialog.addEventListener("click", event => {
            if(event.target === modalDialog) {
                if(button.innerText === "Valider" && button.type === "submit") {
                    backToGalleryClass();
                    switchModalViewFromFormToGallery();
                    resetForm();
                }
                wrapper.ariaModal = "false";
                hideModal();
            }
        });
        document.addEventListener("keydown", (event) => {
            if(event.key === "Escape") {
                if(button.innerText === "Valider" && button.type === "submit") {
                    backToGalleryClass();
                    switchModalViewFromFormToGallery();
                    resetForm();
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
 * This function prepares a new opening of the modal that displays the gallery.
 * It is used on the form view of the modal immediately before a leave event.
 */
export function switchModalViewFromFormToGallery() {
    button.classList.remove("button-modal-form");
    if(form) modalRemoveFromFormAppendToGallery(form, wrapper, line, button);
    if(error.classList.contains("display-style")) classList_add_rem(error, "hide", "display-style");
    if(error.innerText !== "") error.innerText = "";
}

/**
 * This function adapts the CSS to form display.
 * @param { HTMLElement } iconWrapper : back and close icons wrapper div
 */
export function fromGalleryToFormClass(iconWrapper) {    
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

    if( ! button) button = document.getElementById("modal-button");
    button.classList.add("button-modal-form");
    button.innerText = "Valider";
    button.type = "submit";

    displayAddWorkForm();

    if( ! form) form = document.getElementById("modal-form");
    modalRemoveFromWrapperAppendToForm(form, wrapper, button, line);

    classList_add_rem(button, "greyed", "selected");

    const buttonForm = document.querySelector(".button-modal-form");

    buttonForm.addEventListener("click", event => {
        if(button.innerText === "Valider" && button.type === "submit") {             
            /****** Step 3.3 add work ******/
            if(file && titleInput.value !== "" && categoryInput !== "Pourriez-vous choisir une catégorie s'il vous plaît?") {
                /* reset modal to gallery view for next modal opening */
                backToGalleryClass();
                switchModalViewFromFormToGallery();
                addSubmit(event);
            }
            else {
                classList_add_rem(error, "display-style", "hide");
            }
        }
    });
}

/**
 * This function rolls back CSS classes changes of fromGalleryToFormClass() in cases of exit. 
 */
export function backToGalleryClass() {
    try {
        if( ! backIcon) backIcon = document.querySelector(".icon-back");
        backIcon.style.display = "none";
        classList_add_rem(backIcon, "hide", "display-style");

        if( ! galleryView) galleryView = document.getElementById("gallery");
        galleryView.style.display = "grid";

        if( ! addView) addView = document.getElementById("add-form");
        addView.style.display = "none";
        classList_add_rem(addView, "hide", "display-style");

        if( ! modalTitle ) modalTitle = document.getElementById("modal-title");
        modalTitle.innerText = "Galerie photo";
        wrapper.ariaLabel = "Galerie photo";

        if( ! line) line = document.querySelector(".hr-modal");
        line.classList.remove("hr-modal-form");

        if( ! button) button = document.getElementById("modal-button");
        button.classList.remove("button-modal-form");
        button.innerText = "Ajouter une photo";
        button.type = "button";

        classList_add_rem(button, "selected", "greyed");

        resetForm();
    } catch(error) {
        console.error(new Date.toLocaleTimeString(), "backToGalleryClass() error : " + error);
    }
}

/**
 * This function displays the gallery in the modal again instead of the add work form.
 * @param { HTMLElement } back : the back left arrow
 */
export function listenToBackArrowClick(back) {
    try {
        back.addEventListener("click", () => {
            backToGalleryClass();

            switchModalViewFromFormToGallery();
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

        if(! button) button = document.getElementById("modal-button");
        
        button.addEventListener("click", event => {
            event.preventDefault();
            if(button.innerText === "Ajouter une photo" && button.type === "button") {// && ! isFormActive) {
                fromGalleryToFormClass(iconWrapper);
            }
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
    openModal(modify);
    displayGallery("modal", works, false);
    /****** step 3.1 display modal add work form ******/
    modalDisplayEnd();
}

/**
 * This function displays the add photo form view of the modal.
 */
function displayAddWorkForm() {
    try {
        if( ! document.querySelector("option")) {
            let categories = removeGenericCategory("Tous");
            categories = addEmptyCategory("Pourriez-vous choisir une catégorie s'il vous plaît?");
            categories.forEach(categorie => {
                const option = document.createElement("option");
                option.value = categorie;
                option.textContent = categorie;
                categoryInput.appendChild(option);
            });
            categoryInput.value = "Pourriez-vous choisir une catégorie s'il vous plaît?";

            const fileAddButtonWrapper = document.getElementById("file-add-button-wrapper");
            fileAddButtonWrapper.addEventListener("click", () => {
                inputFile.click();
            });

            inputFile.addEventListener("click", async () => {
                inputFile.addEventListener("change", event => {
                    file = event.target.files[0];
                    if(file) {
                        checkFileMaxSize(file, event);
                        if( ! document.getElementById("to-upload")) displayMiniImage(file, fileAddButtonWrapper);
                        
                        checkAddWorkInputsFilledColorsButton();
                    }
                    else { console.log("Aucun fichier sélectionné."); }
                });
            });
        }
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "displayAddWorkForm() error : " + error);
    }
}