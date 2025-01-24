import {
    checkFileMaxSize
} from "../helpers/file_checker.js";
import {
    classList_add_rem
} from "../helpers/classList_add_remove.js";
import {
    displayMiniImage,
    closeModal,
    checkAddWorkInputsFilledColorsButton,
    removeGenericFromCategories
} from "../helpers/modal_helper.js";
import {
    addSubmit
} from "./add_work.js";
import {
    displayGallery
} from "../landing_page/portfolio.js";
import {
    works
} from "../script.js";

const categoryInput = document.createElement("select");
export const title = document.createElement("h3");
export const addValidateInput = document.createElement("button");
export const titleInput = document.createElement("input");
export let fileUpload;
export let backIcon;
export let iconClose;
export let galleryView;
export let addView;
export let line;
export let button;
export let form;
export let wrapper;
export let fileName;
let file;

/**
 * This function displays the modal at modifier button click.
 */
export function displayModal() {
    try {
        const body = document.querySelector("body");

        const dialog = document.createElement("dialog");
        dialog.id = "modal-backgrd";

        wrapper = document.createElement("div");
        wrapper.classList.add("modal-wrapper");
        wrapper.role = "modal";
        wrapper.ariaModal = "true";

        const iconWrapper = document.createElement("div");
        iconWrapper.id = "icon-wrapper";

        backIcon = document.createElement("i");
        backIcon.classList.add(
            "icon-back",
            "material-symbols-outlined",
            "pointer"
        );
        backIcon.classList.add("icon-back");
        backIcon.innerText = "arrow_back";
        backIcon.ariaHidden = "true";

        const closeIcon = document.createElement("i");
        closeIcon.classList.add(
            "icon-close", 
            "material-symbols-outlined",
            "pointer"
        );
        closeIcon.innerText = "close";
        closeIcon.ariaHidden = "true";

        title.id = "modal-title";
        title.innerText = "Galerie photo";

        const pErr = document.createElement("p");
        pErr.id = "erreur";

        const gallery = document.createElement("div");
        gallery.id = "gallery";
        gallery.classList.add(
            "gallery-view", 
            "gallery-view-size",
            "gallery-add-view-size");

        const addView = document.createElement("div");
        addView.id = "add-form";
        addView.classList.add(
            "add-view", 
            "add-view-size",
            "gallery-add-view-size");

        const line = document.createElement("hr");
        line.classList.add("hr-modal","width420px");

        addValidateInput.classList.add(
            "button", 
            "selected", 
            "button-modal", 
            "button-modal-gallery",
            "pointer");/*refacto issue:  limit of 4 classes to weigh*/
        addValidateInput.innerText = "Ajouter une photo";
        addValidateInput.id = "modal-button";

        iconWrapper.appendChild(backIcon);
        iconWrapper.appendChild(closeIcon);
        wrapper.appendChild(iconWrapper);
        wrapper.appendChild(title);
        wrapper.appendChild(pErr);
        wrapper.appendChild(gallery);
        wrapper.appendChild(addView);
        wrapper.appendChild(line);    
        wrapper.appendChild(addValidateInput);

        dialog.appendChild(wrapper);

        body.appendChild(dialog);
    } catch(error) {
        console.log("displayModal() HTML element creation or DOM appendChild() error : " + error);
    }
}

/**
 * This function displays the landing modal gallery.
 */
export function displayModalGallery() {
    try {
        const modalBackground = document.getElementById("modal-backgrd");
        const modalWrapper = document.querySelector(".modal-wrapper");
        modalWrapper.ariaLabel= "Galerie photo";
        if(modalWrapper.ariaModal === "false") modalBackground.ariaModal = "true";

        /*const focusableElements = Array.from(document.querySelectorAll("i, button, input, select"));
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];*/

        const fermer = document.querySelector(".icon-close");
        fermer.addEventListener("click", () => {
            closeModal();
            modalWrapper.ariaModal = "false";
        });

        modalBackground.addEventListener("click", event => {
            if(event.target === modalBackground) {
                closeModal();
                modalWrapper.ariaModal = "false";
            }
        });
        displayGallery("modal", works);
        displayAddWorkForm();

        iconClose = document.querySelector(".icon-close");

        const erreur = document.querySelector("#erreur");
        erreur.innerText = "";

        galleryView = document.querySelector(".gallery-view");
        const gallery = document.querySelector("#gallery");
        addView = document.querySelector(".add-view");
  
        button = document.getElementById("modal-button");
        line = document.querySelector(".hr-modal");

        const iconWrapper = document.getElementById("icon-wrapper");
        iconWrapper.classList.add("icon-wrapper-top");

        form = document.getElementById("modal-form");

        button.addEventListener("click", event => {
            if(button.innerText === "Ajouter une photo") {

                classList_add_rem(iconClose, "icon-close-form", "icon-close-gallery");

                iconWrapper.classList.remove("icon-wrapper-top");

                classList_add_rem(backIcon, "display-style", "hide");
                backIcon.style.display = "block";

                classList_add_rem(galleryView, "hide", "display-style");
                galleryView.style.display = "none";
                gallery.classList.remove("gallery-view-size-back");

                classList_add_rem(addView, "display-style", "hide");
                addView.style.display = "block";

                title.innerText = "Ajout photo";
                modalWrapper.ariaLabel = "Ajout photo";

                line.classList.add("hr-modal-form");

                button.classList.add("button-modal-form");
                button.innerText = "Valider";
                button.type = "submit";

                modalWrapper.removeChild(button);
                modalWrapper.removeChild(line);
                form.appendChild(line);
                form.appendChild(button);

                classList_add_rem(button, "greyed", "selected");
            }
            else if(button.innerText === "Valider") {
                /****** Step 3.3 add work ******/
                addSubmit(event);
            }
        });

        document.addEventListener("keydown", (event) => {
            if(event.key === "Tab") {
               event.preventDefault(); 
               /*let index = focusableElements.findIndex(f => f === modalWrapper.querySelector(":focus"));
               if(event.shiftKey && document.activeElement === firstElement) {
                   lastElement.focus();
               }
               else if( ! event.shiftKey && document.activeElement === lastElement) {
                   firstElement.focus();
               }
               else if(event.shiftKey) index--;
               else if( ! event.shiftKey) index++;
               focusableElements[index].focus();*/
            }
            else if(event.key === "Escape") {
                closeModal();
                modifier.focus();
            }
        });
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "Modifier button modal HTML creation or DOM appendChild() error : " + error);
    }
}

/**
 * This function displays the add photo form view of the modal.
 */
/****** Once picked, deactivation to disallow multiple picking is to do and check. ******/
function displayAddWorkForm() {
    try {
        const modalContainer = document.getElementById("add-form");

        const form = document.createElement("form");
        form.id = "modal-form";

        const inputFile = document.createElement("input");
        inputFile.type = "file";
        inputFile.id = "image";
        inputFile.name = "image";
        inputFile.required = true;
        inputFile.accept = "image/jpeg, image/png";

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
        labelTitle.htmlFor = "titleInput";
        titleInput.type = "text";
        titleInput.id = "titleInput";
        titleInput.name = "titleInput";
        titleInput.required = true;
        titleInput.classList.add("add-form-input-width");

        const labelCategory = document.createElement("label");
        labelCategory.htmlFor = "categoryInput";
        labelCategory.innerText = "Catégorie";
        categoryInput.id = "categoryInput";
        categoryInput.name = "categoryInput";
        categoryInput.required = true;
        categoryInput.classList.add("add-form-input-width");
        removeGenericFromCategories("Tous").forEach(categorie => {
            const option = document.createElement("option");
            option.value = categorie;
            option.textContent = categorie;
            categoryInput.appendChild(option);
        });

        const reader = new FileReader();

        form.addEventListener("submit", event => {
            /****** Step 3.3 add work ******/
            addSubmit(event);
        });
        
        inputFile.addEventListener("click", async () => {
            inputFile.addEventListener("change", event => {
                console.log("change file event");
                file = event.target.files[0];
                if(file){
                    checkFileMaxSize(file, event);
                    displayMiniImage(file, fileAddButtonWrapper);
                    reader.readAsDataURL(file);
                    console.log("reader: " + reader);

                    checkAddWorkInputsFilledColorsButton();

                    fileName = file.name;
                }
                else { console.log("Aucun fichier sélectionné."); }
            });
        });

        reader.onload = event => {
            console.log("reader.onload enter");
            const fileContent = event.target.result;
            fileUpload = fileContent;
        }

        fileAddButtonWrapper.addEventListener("click", () => {
            console.log("wrapper user click");
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
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "displayAddWorkForm() HTML element creation or DOM appendChild() error : " + error);
    }
}