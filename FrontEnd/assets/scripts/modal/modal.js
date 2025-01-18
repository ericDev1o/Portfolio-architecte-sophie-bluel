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
    categories
} from "../script.js";

export let fileUpload;
const addValidateInput = document.createElement("button");
let file = null;
const title = document.createElement("input");
const category = document.createElement("select");

/**
 * This function displays the modal at modifier button click.
 */
export function displayModal() {
    try {
        const body = document.querySelector("body");

        const dialog = document.createElement("dialog");
        dialog.id = "modal-backgrd";

        const wrapper = document.createElement("div");
        wrapper.classList.add("modal-wrapper");
        wrapper.role = "modal";
        wrapper.ariaModal = "true";

        const iconWrapper = document.createElement("div");
        iconWrapper.id = "icon-wrapper";

        const backIcon = document.createElement("i");
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
export function displayAddWorkForm() {
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