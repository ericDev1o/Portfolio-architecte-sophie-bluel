import {
    deleteWork
} from "./deleteWorks.js";
import {
    displayError
} from "./connection.js";
import {
    addSubmit
} from "./addWork.js";
import {
    categories
} from "./getWorks.js";

export let fileUpload;

export const galleryData = [
    {src:"./assets/images/abajour-tahina.png", alt:"Abajour Tahina", id:1},
    {src:"./assets/images/appartement-paris-v.png", alt:"Appartement Paris V", id:2},
    {src:"./assets/images/restaurant-sushisen-londres.png", alt:"Restaurant Sushisen - Londres", id:3},
    {src:"./assets/images/la-balisiere.png", alt:"Villa “La Balisiere” - Port Louis", id:4},
    {src:"./assets/images/structures-thermopolis.png", alt:"Structures Thermopolis", id:5},
    {src:"./assets/images/appartement-paris-x.png", alt:"Appartement Paris X", id:6},
    {src:"./assets/images/villa-ferneze.png", alt:"Villa Ferneze - Isola d’Elba", id:8},
    {src:"./assets/images/appartement-paris-xviii.png", alt:"Appartement Paris XVIII", id:9},
    {src:"./assets/images/le-coteau-cassis.png", alt:"Pavillon “Le coteau” - Cassis", id:7},
    {src:"./assets/images/bar-lullaby-paris.png", alt:"Bar “Lullaby” - Paris", id:10},
    {src:"./assets/images/hotel-first-arte-new-delhi.png", alt:"Hotel First Arte - New Delhi", id:11}				
];

/**
 * This function displays the modal at modifier button click.
 */
export function displayModalAddPhoto() {
    const body = document.querySelector("body");

    const dialog = document.createElement("dialog");
    dialog.id = "modal-backgrd";

    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");

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
    line.id = "hr-modal";
    line.classList.add("width420px");

    const add = document.createElement("button");
    add.classList.add(
        "button", 
        "selected", 
        "button-modal", 
        "button-modal-gallery",
        "pointer");/*refacto issue:  limit of 4 classes to weigh*/
    add.innerText = "Ajouter une photo";
    add.id = "modal-button";

    iconWrapper.appendChild(backIcon);
    iconWrapper.appendChild(closeIcon);
    wrapper.appendChild(iconWrapper);
    wrapper.appendChild(title);
    wrapper.appendChild(pErr);
    wrapper.appendChild(gallery);
    wrapper.appendChild(addView);
    wrapper.appendChild(line);    
    wrapper.appendChild(add);

    dialog.appendChild(wrapper);

    body.appendChild(dialog);
}

/**
 * This function closes(removes) the modal at cross or outside of the modal click.
 */
export function closeModal() {
    const body = document.querySelector("body");
    const dialog = document.getElementById("modal-backgrd");
    body.removeChild(dialog);
}

/**
 * This function displays the gallery view of the modal.
 */
export function displayPhotosGallery() {
    const modalContainer = document.getElementById("gallery");

    galleryData.forEach(item => {
        const figure = document.createElement("figure");

        const img = document.createElement("img");
        img.src = item.src;
        img.alt = item.alt;
        img.id = item.id;

        figure.appendChild(img);

        const delIcon = document.createElement("i");
        delIcon.classList.add(
            "delete-proj",
            "material-symbols-outlined",
            "pointer");
        delIcon.classList.add("delete-proj");
        delIcon.innerText = "delete";
        delIcon.ariaHidden = "true";
        delIcon.id = item.id;
        /****** Step 3.2 delete work ******/
        delIcon.addEventListener("click", (event) => {
            event.preventDefault();
            deleteWork(item.id);
        });
        
        figure.appendChild(delIcon);

        modalContainer.appendChild(figure);
    });
}

/**
 * This function checks whether or not the browser has a Chrome / Chromium agent.
 * This is a workaround, on Chrome or Chromium only, to the error at input change listening.
 * @returns {Boolean} true if the used browser is having a Chrome or Chromium agent
 */
function isChromiumBrowser() {
    const userAgent = navigator.userAgent;
    return /Chrome|Chromium|Edg/.test(userAgent) && !/Firefox/.test(userAgent);
}

/**
 * This function checks that the user picked file's size is less than 4 Mb.
 * @param {File} file : a user picked file
 * @param {Event} event : in case triggered by an <input type="file"> change event,
 *  this event is reset for retry if the file's size exceeds 4Mb.
 */
function checkFileMaxSize(file, event) {
    const maxSize = 4 * 1024 * 1024;

    if(file.size > maxSize) {
        displayError("Le fichier dépasse la taille maximale de 4Mo. Recommencez s'il-vous-plaît.", erreur);
        if(event) {
            event.target.value = "";
        }
        else { file = null; }
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
    const imageMini = document.createElement("img");
    imageMini.src = URL.createObjectURL(file);
    imageMini.alt = "nouveau projet à ajouter";
    imageMini.id = "to-upload";
    /*imageMini.innerHTML = ``*/
    const wrappedBeforeImageUpload = document.querySelectorAll(".wrapped");
    wrappedBeforeImageUpload.forEach(item => {
        item.classList.add("hide");
    });
    fileAddButtonWrapper.appendChild(imageMini);
}

/**
 * This function displays the add photo form view of the modal.
 */
export function displayAddPhotoForm() {
    const modalContainer = document.getElementById("add-form");

    const form = document.createElement("form");
    form.id = "modal-form";

    const inputFile = document.createElement("input");
    inputFile.type = "file";
    inputFile.id = "input-file-photo";
    inputFile.name = "input-file-photo";
    inputFile.required = true;
    inputFile.accept = ".jpg .jpeg .png .webp";

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
    p.innerText = "jpg, png, webp : 4mo max.";
    p.id = "file-text";
    p.classList.add("wrapped");
  
    const labelTitle = document.createElement("label");
    labelTitle.innerText = "Titre";
    labelTitle.htmlFor = "title";
    const title = document.createElement("input");
    title.type = "text";
    title.id = "title";
    title.name = "title";
    title.required = true;
    title.classList.add("add-form-input-width");

    const labelCategory = document.createElement("label");
    labelCategory.htmlFor = "category";
    labelCategory.innerText = "Catégorie";
    const category = document.createElement("select");
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

    form.addEventListener("submit", (event) => {
        /****** Step 3.3 add work ******/
        addSubmit(event);
    });
    
    let file = null;
    inputFile.addEventListener("click", async () => {
        if (isChromiumBrowser() /*&& window.isSecureContext */&& 'showOpenFilePicker' in window) {
            const [fileHandle] = await window.showOpenFilePicker({
                multiple: false,
                types: [
                    {
                        description: "Images",
                        accept: {
                            "image/*": [".jpg", ".jpeg", ".png", ".webp"]
                        }
                    }
                ]
            });
            file = await fileHandle.getFile();
            if(file){
                checkFileMaxSize(file, null);
                displayMiniImage(file, fileAddButtonWrapper);
                fileUpload = file;
            }
            else { console.log("Aucun fichier sélectionné."); }
        } else {
            inputFile.addEventListener("change", (event) => {
                console.log("change file event");
                file = event.target.files[0];
                if(file){
                    checkFileMaxSize(file, event);
                    displayMiniImage(file, fileAddButtonWrapper);
                }
                else { console.log("Aucun fichier sélectionné."); }
            });
        }
    });

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
}