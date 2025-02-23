import { checkFileMaxSize } from "../helpers/file_checker.js";
import { classList_add_rem } from "../helpers/classList_add_remove.js";
import {
    displayMiniImage,
    checkAddWorkInputsFilledColorsButton,
    removeGenericFromCategories,
    hideModal,
    resetForm,
} from "../helpers/modal_helper.js";
import { 
    modalRemoveFromFormAppendToGallery, 
    modalRemoveFromWrapperAppendToForm 
} from "../helpers/DOM_helper.js";

import { addSubmit } from "./add_work.js";
import { displayGallery } from "../landing_page/portfolio.js";


const categoryInput = document.createElement("select");
let iconWrapper = document.getElementById("icon-wrapper");
export const title = document.createElement("h3");
export const titleInput = document.createElement("input");
let file;
let formActive
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
                if(button.innerText === "Valider" && button.type === "submit" && formActive) {
                    backToGalleryClass(iconWrapper);
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
}

/**
 * This function adapts the CSS to form display.
 * @param { HTMLElement } iconWrapper : back and close icons wrapper div
 */
function fromGalleryToFormClass(iconWrapper) {
    classList_add_rem(iconClose, "icon-close-form", "icon-close-gallery");

    iconWrapper.classList.remove("icon-wrapper-top");

    if( ! backIcon) backIcon = document.querySelector(".icon-back");
    backIcon.style.display = "block";

    if( ! galleryView) galleryView = document.getElementById("gallery");
    galleryView.style.display = "none";
    galleryView.classList.remove("gallery-view-size-back");

    if( ! addView) addView = document.getElementById("add-form");
    addView.style.display = "block";

    title.innerText = "Ajout photo";
    wrapper.ariaLabel = "Ajout photo";

    if( ! line) line = document.querySelector(".hr-modal");
    line.classList.add("hr-modal-form");

    if( ! button) button = document.getElementById("modal-button");
    button.classList.add("button-modal-form");
    button.innerText = "Valider";
    button.type = "submit";

    if( ! form) form = document.getElementById("modal-form");
    modalRemoveFromWrapperAppendToForm(form, wrapper, button, line);

    classList_add_rem(button, "greyed", "selected");

    const buttonForm = document.querySelector(".button-modal-form");
    buttonForm.addEventListener("click", event => {
        if(button.innerText === "Valider" && button.type === "submit" && formActive) {             
            /****** Step 3.3 add work ******/
            if(titleInput.value !== "" && file) {
                /* reset modal to gallery view for next modal opening */
                if( ! iconWrapper) iconWrapper = document.getElementById("icon-wrapper");
                backToGalleryClass(iconWrapper);
                switchModalViewFromFormToGallery();
                addSubmit(event);
            }
        }
    });

    formActive = true;
}

/**
 * This function rolls back CSS classes changes of fromGalleryToFormClass(). 
 * @param { HTMLElement } iconWrapper : back and close icons wrapper div
 */
export function backToGalleryClass(iconWrapper) {
    classList_add_rem(iconClose, "icon-close-gallery", "icon-close-form");

    if( ! iconWrapper) iconWrapper = document.getElementById("icon-wrapper");
    iconWrapper.classList.add("icon-wrapper-top");

    if( ! backIcon) backIcon = document.querySelector(".icon-back");
    backIcon.style.display = "none";

    if( ! galleryView) galleryView = document.getElementById("gallery");
    galleryView.style.display = "grid";
    galleryView.classList.add("gallery-view-size-back");

    if( ! addView) addView = document.getElementById("add-form");
    addView.style.display = "none";

    title.innerText = "Galerie photo";
    wrapper.ariaLabel = "Galerie photo";

    if( ! line) line = document.querySelector(".hr-modal");
    line.classList.remove("hr-modal-form");

    if( ! button) button = document.getElementById("modal-button");
    button.innerText = "Ajouter une photo";
    button.type = "button";

    classList_add_rem(button, "selected", "greyed");

    formActive = false;
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
            if(button.innerText === "Ajouter une photo" && button.type === "button") {
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
    displayAddWorkForm();
    modalDisplayEnd();
}

/**
 * This function creates and returns the file input.
 * @returns { HTMLInputElement } inputFile
 */
function createFileInput() {
    const inputFile = document.createElement("input");
    inputFile.type = "file";
    inputFile.id = "image";
    inputFile.name = "image";
    inputFile.required = true;
    inputFile.accept = "image/jpeg, image/png";
    return inputFile;
}

/**
 * This function displays the add photo form view of the modal.
 */
function displayAddWorkForm() {
    try {
        const modalContainer = document.getElementById("add-form");

        if(modalContainer.childElementCount === 0) {
            const form = document.createElement("form");
            form.id = "modal-form";
            form.enctype = "multipart/form-data";
            form.noValidate="true";

            const inputFile = createFileInput();

            const fileAddButtonWrapper = document.createElement("div");
            fileAddButtonWrapper.id = "file-add-button-wrapper";
            fileAddButtonWrapper.classList.add("width420px", "pointer");
            
            const imageIcon = document.createElement("i");
            imageIcon.classList.add("material-symbols-outlined", "wrapped");
            imageIcon.innerText = "add_photo_alternate";
            imageIcon.id = "icon-image";

            const buttonFileAjout = document.createElement("button");
            buttonFileAjout.type = "button";
            buttonFileAjout.id = "file-ajout-button";
            buttonFileAjout.classList.add("button", "wrapped", "pointer");
            buttonFileAjout.innerText = "+ Ajouter photo";

            const p = document.createElement("p");
            p.innerText = ".jpg, .png : 4mo max.";
            p.id = "file-text";
            p.classList.add("wrapped");
        
            const labelTitle = document.createElement("label");
            labelTitle.innerText = "Titre";
            labelTitle.htmlFor = "title";
            labelTitle.classList.add("label-form");
            titleInput.type = "text";
            titleInput.id = "title";
            titleInput.name = "title";
            titleInput.required = true;
            titleInput.classList.add("add-form-input-width");

            const labelCategory = document.createElement("label");
            labelCategory.htmlFor = "category";
            labelCategory.innerText = "Catégorie";
            labelCategory.classList.add("label-form");
            categoryInput.id = "category";
            categoryInput.name = "category";
            categoryInput.required = true;
            categoryInput.classList.add("add-form-input-width");
            removeGenericFromCategories("Tous").forEach(categorie => {
                const option = document.createElement("option");
                option.value = categorie;
                option.textContent = categorie;
                categoryInput.appendChild(option);
            });
            
            inputFile.addEventListener("click", async () => {
                inputFile.addEventListener("change", event => {
                    file = event.target.files[0];
                    if(file) {
                        checkFileMaxSize(file, event);
                        displayMiniImage(file, fileAddButtonWrapper);
                        
                        checkAddWorkInputsFilledColorsButton();
                    }
                    else { console.log("Aucun fichier sélectionné."); }
                });
            });

            fileAddButtonWrapper.addEventListener("click", () => {
                inputFile.click();
            });

            fileAddButtonWrapper.appendChild(imageIcon);
            fileAddButtonWrapper.appendChild(buttonFileAjout);
            fileAddButtonWrapper.appendChild(p);

            form.appendChild(inputFile);
            form.appendChild(fileAddButtonWrapper);
            form.appendChild(labelTitle);
            form.appendChild(titleInput);
            form.appendChild(labelCategory);
            form.appendChild(categoryInput);

            modalContainer.appendChild(form);
            formActive = true;
        }
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "displayAddWorkForm() HTML element creation or DOM appendChild() error : " + error);
    }
}