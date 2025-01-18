import {
    checkFileMaxSize
} from "../helpers/file_checker.js";
import {
    classList_add_rem
} from "../helpers/classList_add_remove.js";
import {
    addSubmit
} from "./add_work.js";
import {
    displayGallery
} from "../landing_page/portfolio.js";
import {
    categories,
    works
} from "../script.js";

export let fileUpload;
export let backIcon;
const addValidateInput = document.createElement("button");
const title = document.createElement("input");
const category = document.createElement("select");
let file;
let iconClose;
let galleryView;
let addView;
let line;
let button;
let form;
let wrapper;

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

        const title = document.createElement("h3");
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
        const title = document.getElementById("modal-title");
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
function displayMiniImage(file, fileAddButtonWrapper) {
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
function checkAddWorkInputsFilled() {
    title.addEventListener("focus", () => {
        category.addEventListener("focus", () => {
            if(title.value && category.value) {
                console.log("title.value: " + title.value);
                console.log("category.value: " + category.value);
                console.log("file: " + file);
                classList_add_rem(addValidateInput, "selected", "greyed");
            }
        });
    });
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
        labelTitle.htmlFor = "title";
        title.type = "text";
        title.id = "title";
        title.name = "title";
        title.required = true;
        title.classList.add("add-form-input-width");

        const labelCategory = document.createElement("label");
        labelCategory.htmlFor = "category";
        labelCategory.innerText = "Catégorie";
        category.id = "category";
        category.name = "category";
        category.required = true;
        category.classList.add("add-form-input-width");
        categories.forEach(categorie => {
            const option = document.createElement("option");
            option.value = categorie;
            option.textContent = categorie;
            category.appendChild(option);
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

                    checkAddWorkInputsFilled();
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
        form.appendChild(title);
        form.appendChild(labelCategory);
        form.appendChild(category);

        modalContainer.appendChild(form);
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "displayAddWorkForm() HTML element creation or DOM appendChild() error : " + error);
    }
}