import { classList_add_rem } from "./classList_add_remove.js";
import {
    iconClose,
    galleryView,
    title,
    addView,
    line,
    button,
    form,
    wrapper,
    addValidateInput,
    titleInput
} from "../modal/modal.js";
import { categories } from "../script.js";

/**
 * This function displays the gallery in the modal again instead of the add work form.
 * @param { HTMLElement } back : the back left arrow
 */
export function listenToBackArrowClick(back) {
    try {
        back.addEventListener("click", () => {
            classList_add_rem(iconClose, "icon-close-gallery", "icon-close-form");

            classList_add_rem(back, "hide", "display-style");
            back.style.display = "none";

            galleryView.style.display = "grid";

            gallery.classList.add("gallery-view-size-back");
            
            addView.classList.add("hide");
            addView.classList.add("display-style");
            addView.style.display = "none";

            title.innerText = "Galerie photo";

            line.classList.remove("hr-modal-form");

            button.classList.remove("button-modal-form");
            button.innerText = "Ajouter une photo";
            button.type = "button";

            form.removeChild(button);
            form.removeChild(line);
            wrapper.appendChild(line);
            wrapper.appendChild(button);

            classList_add_rem(button, "selected", "greyed");
        });
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "Modal back icon HTML creation or DOM appendChild() error : " + error);
    }
}

/**
 * This function closes(removes) the modal 
 * at cross 
 * or 
 * click outside of the modal
 * or
 * escape key pressed down.
 */
export function closeModal() {
    try {
        const body = document.querySelector("body");
        const dialog = document.getElementById("modal-backgrd");
        body.removeChild(dialog);
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "closeModal() DOM removeChild() error : " + error);
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
 * This function colors the greyed form submit button when
 * a file is picked,
 * title
 * and
 * category
 * input fields are focused and valued.
 */
export function checkAddWorkInputsFilledColorsButton() {
    titleInput.addEventListener("change", () => {
        if(titleInput.value) classList_add_rem(addValidateInput, "selected", "greyed");
        else if( ! titleInput.value) classList_add_rem(addValidateInput, "greyed", "selected");
    });
}

/**
 * This function removes the all generic category.
 * This generic category is only used on the landing page to unfilter.
 * @param {String} genericCateg 
 * @returns {Set<String>} : the set of specific categories without unfiltering "all" category
 */
export function removeGenericFromCategories(genericCateg) {
    let specificCategories = categories;
    specificCategories.delete(genericCateg);
    return specificCategories;
}