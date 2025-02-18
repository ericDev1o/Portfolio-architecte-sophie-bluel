import { checkFileMaxSize } from "../helpers/file_checker.js";
import { classList_add_rem } from "../helpers/classList_add_remove.js";
import {
    displayMiniImage,
    checkAddWorkInputsFilledColorsButton,
    removeGenericFromCategories,
    hideModal,
} from "../helpers/modal_helper.js";
import { addSubmit } from "./add_work.js";
import { displayGallery } from "../landing_page/portfolio.js";
import { 
    modalRemoveFromFormAppendToGallery, 
    modalRemoveFromWrapperAppendToForm 
} from "../helpers/DOM_helper.js";

const categoryInput = document.createElement("select");
export const title = document.createElement("h3");
export const addValidateInput = document.createElement("button");
export const titleInput = document.createElement("input");
let file;
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
 */
function openModal() {
    try {
        if(! modalDialog) modalDialog = document.getElementById("modal-backgrd");
        wrapper.ariaLabel= "Galerie photo";
        if(wrapper.ariaModal === "false") modalDialog.ariaModal = "true";

        if(! iconClose) iconClose = document.querySelector(".icon-close");
        iconClose.addEventListener("click", () => {
            if(! button) button = document.getElementById("modal-button");
            if(button.innerText === "Valider") {
                backToGalleryClass();
                switchModalViewFromFormToGallery();
            }
            wrapper.ariaModal = "false";
            hideModal();
        });
        modalDialog.addEventListener("click", event => {
            if(event.target === modalDialog) {
                if(button.innerText === "Valider") {
                    backToGalleryClass();
                    switchModalViewFromFormToGallery();
                }
                hideModal();
                wrapper.ariaModal = "false";
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
    console.log("enter if button click")
    classList_add_rem(iconClose, "icon-close-form", "icon-close-gallery");

    iconWrapper.classList.remove("icon-wrapper-top");

    if( ! backIcon) backIcon = document.querySelector(".icon-back");
    backIcon.style.display = "block";

    if(! galleryView) galleryView = document.getElementById("gallery");
    galleryView.style.display = "none";
    galleryView.classList.remove("gallery-view-size-back");

    if(! addView) addView = document.getElementById("add-form");
    addView.style.display = "block";

    title.innerText = "Ajout photo";
    wrapper.ariaLabel = "Ajout photo";

    if(! line) line = document.querySelector(".hr-modal");
    line.classList.add("hr-modal-form");

    if(! button) button = document.getElementById("modal-button");
    button.classList.add("button-modal-form");
    button.innerText = "Valider";
    button.type = "submit";

    if(! form) form = document.getElementById("modal-form");
    modalRemoveFromWrapperAppendToForm(form, wrapper, button, line);

    classList_add_rem(button, "greyed", "selected");
}

/**
 * This function rolls back CSS classes changes of fromGalleryToFormClass(). 
 * @param { HTMLElement } iconWrapper : back and close icons wrapper div
 */
function backToGalleryClass(iconWrapper) {
    classList_add_rem(iconClose, "icon-close-gallery", "icon-close-form");

    if( ! iconWrapper) iconWrapper = document.getElementById("icon-wrapper");
    iconWrapper.classList.add("icon-wrapper-top");

    if( ! backIcon) backIcon = document.querySelector(".icon-back");
    backIcon.style.display = "none";

    if(! galleryView) galleryView = document.getElementById("gallery");
    galleryView.style.display = "grid";
    galleryView.classList.add("gallery-view-size-back");

    if(! addView) addView = document.getElementById("add-form");
    addView.style.display = "none";

    title.innerText = "Galerie photo";
    wrapper.ariaLabel = "Galerie photo";

    if(! line) line = document.querySelector(".hr-modal");
    line.classList.remove("hr-modal-form");

    if(! button) button = document.getElementById("modal-button");
    button.innerText = "Ajouter une photo";

    classList_add_rem(button, "selected", "greyed");
}

/**
 * This function sets the main modal "Ajouter une photo" and "Valider" functionality.
 * @param { HTMLSpanElement } modifier : clicked modal open span
 */
function modalDisplayEnd(modifier) {
    try {
        const erreur = document.querySelector("#erreur");
        erreur.innerText = "";

        const iconWrapper = document.getElementById("icon-wrapper");
        iconWrapper.classList.add("icon-wrapper-top");

        if(! button) button = document.getElementById("modal-button");
        
        button.addEventListener("click", event => {
            event.preventDefault();
            if(button.innerText === "Ajouter une photo") {
                fromGalleryToFormClass(iconWrapper);
            }
            /*else if(button.innerText === "Valider") {
                backToGalleryClass(iconWrapper);
                switchModalViewFromFormToGallery();
                /****** Step 3.3 add work ******/
                //addSubmit(event);
            //}
        });

        document.addEventListener("keydown", (event) => {
            if(event.key === "Escape") {
                if(button.innerText === "Valider") {
                    backToGalleryClass();
                    switchModalViewFromFormToGallery();
                }
                hideModal();
                modifier.focus();
            }
        });
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "Modifier button modal HTML creation or DOM appendChild() error : " + error);
    }
}

/**
 * This function displays the landing modal gallery.
 * @param { Array } works : JSON array of fetched works
 * @param { HTMLSpanElement } modifier : clicked modal open span
 */
export function displayModalGallery(works, modifier) {
    openModal();
    displayGallery("modal", works);
    /****** step 3.1 display modal add work form ******/
    displayAddWorkForm();
    modalDisplayEnd(modifier);
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

            form.addEventListener("submit", event => {
                /****** Step 3.3 add work ******/
                //addSubmit(event);
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
        }
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "displayAddWorkForm() HTML element creation or DOM appendChild() error : " + error);
    }
}