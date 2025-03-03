import { getCategoryName } from "./category_helper.js";
import { replaceSpaceByUnderscore } from "../helpers/string_replacer.js";

import { deleteWork } from "../modal/delete_work.js";
import { worksURL } from "../config.js";
import { classList_add_rem } from "./classList_add_remove.js";

/**
 * This function displays the modal gallery view from the form view.
 * The modal "footer" line and button is appended to gallery wrapper.
 * @param { HTMLElement } form 
 * @param { Element } wrapper
 * @param { Element } line 
 * @param { HTMLElement } button 
 */
export function modalRemoveFromFormAppendToGallery(form, wrapper, line, button) {
    if(form.contains(line)) form.removeChild(line);
    if(form.contains(button)) form.removeChild(button);
    if( ! wrapper.contains(line)) wrapper.appendChild(line);
    if( ! wrapper.contains(button)) wrapper.appendChild(button);
}

/**
 * This function toggles the modal from gallery to form.
 * @param { HTMLElement } form 
 * @param { Element } wrapper 
 * @param { HTMLElement } button 
 * @param { Element } line 
 */
export function modalRemoveFromWrapperAppendToForm(form, wrapper, button, line) {
    if(wrapper.contains(button)) wrapper.removeChild(button);
    if(wrapper.contains(line)) wrapper.removeChild(line);
    if( ! form.contains(line)) form.appendChild(line);
    if( ! form.contains(button)) form.appendChild(button);
}

/**
 * This function removes landing page gallery's DOM work figure with the specified id.
 * @param { Integer } idWork 
 */
export function deleteWorkFigureFromLandingPageDOM(idWork) {
    try {
        const el = document.getElementById("landing" + "#" + idWork);
        if(el) {
            el.remove();
            console.log(`Landing page figure id n°${idWork} was deleted from DOM.`);
        }
        else console.error(new Date().toLocaleTimeString(), `No landing page figure having id landing#${idWork} was found in the DOM.`);
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), `deleteWorkFigureFromLandingPageDOM() HTML figure id n°${idWork} remove() error :  ${error}`);
    }
}

/**
 * This function removes modal gallery's DOM work figure with specified id.
 * @param {integer} idWork 
 */
export function deleteWorkFigureFromModalDOM(idWork) {
    try {
        const el = document.getElementById("modal" + "#" + idWork);
        if(el) {
            el.remove();
            console.log(`Modal figure id n°${idWork} was deleted from DOM.`);
        }
        else { 
            console.error(`No modal figure having id modal#${idWork} was found in the DOM.`); 
        }
    } catch(error) {
        console.error(`Error deleting modal figure id n°${idWork}: ${error}`);
    }
}

/**
 * This function appends a new figure to the gallery DOM 
 * on the landing page 
 * and 
 * in the modal.
 * @param { JSON } data : http://localhost:5678/api/works POST response 
 */
export async function addWorkFigureToDOM(data) {
    try {
        const figureLanding = await createGalleryFigure("landing", data);
        const figureModal = await createGalleryFigure("modal", data);
        /*landing page DOM */
        const galleryClass = document.querySelector(".gallery");
        galleryClass.appendChild(figureLanding);
        /* modal DOM */
        const galleryId = document.getElementById("gallery");
        galleryId.appendChild(figureModal);
    } catch(error) {
        console.error(new Date.toLocaleTimeString(), "addWorkFigureToLandingPageDOM error : " + error);
    }
}

/**
 * This function empties the landing page gallery.
 * It's used to update the gallery after a new work was added.
 */
export function emptyLandingPageGalleryDOM() {
    try {
        galleryClass.innerHTML = "";
    } 
    catch(error) {
        console.error(new Date.toLocaleTimeString(), `emptyLandingPageGalleryDOM() error: ${error}`);
    }
}

/**
 * This function creates a single figure element to append to the gallery.
 * @param { String } view : "landing" or "modal" 
 * @param { JSON } work : http://localhost:5678/api/works POST response:
 * {
  "id": 0,
  "title": "string",
  "imageUrl": "string",
  "categoryId": "string",
  "userId": 0
} 
 * @returns { HTMLElement } : created figure HTML element
 */
export async function createGalleryFigure(view, work) {
    const figure = document.createElement("figure");

    let img = document.createElement("img");
    img.src = work.imageUrl;
    img.alt = work.title;
    let figcaption;

    figure.id = view + "#" + work.id;

    if(view === "landing"){ 
        let categ = await getCategoryName(work.categoryId);
        categ = replaceSpaceByUnderscore(categ);
        figure.classList.add(categ);

        figcaption = document.createElement("figcaption");
        figcaption.innerText = work.title;
    }
    else if(view === "modal") {
        /****** Step 3.2 delete work ******/
        const delIcon = document.createElement("i");
        delIcon.classList.add(
            "delete-proj",
            "material-symbols-outlined",
            "pointer");
        delIcon.classList.add("delete-proj");
        delIcon.innerText = "delete";
        delIcon.ariaHidden = "true";
        delIcon.id = work.id;

        delIcon.addEventListener("click", event => {
            event.preventDefault();
            deleteWork(worksURL, work.id, work.title);
        });
        
        figure.appendChild(delIcon);
    }
    figure.appendChild(img);
    if(view === "landing") figure.appendChild(figcaption);
    classList_add_rem(figure, "display-style", "hide");
    return figure;
}