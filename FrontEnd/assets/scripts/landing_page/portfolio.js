import { replaceSpaceByUnderscore } from "../helpers/string_replacer.js";
import { deleteWork } from "../modal/delete_work.js";
import { worksURL } from "../config.js";

const galleryClass = document.querySelector(".gallery");

/**
 * This function displays the gallery view of the 
 *     landing page or
 *     modal.
 * This function creates HTML elements in .gallery div based on works from the API.
 * @param { String } element : "landing" or "modal"
 * @param { Array } works : JSON array of works from backend
 */
export function displayGallery(element, works) {
    try { 
        let figcaption;
        const galleryId = document.getElementById("gallery");
        
        works.forEach(work => {
            const figure = document.createElement("figure");

            let img = document.createElement("img");
            img.src = work.imageUrl;
            img.alt = work.title;

            figure.id = element + "#" + work.id;

            if(element === "landing"){                
                figcaption = document.createElement("figcaption");
                figcaption.innerText = work.title;

                let categ = work.category.name;
                categ = replaceSpaceByUnderscore(categ);
                figure.classList.add(categ);
            }
            else if(element === "modal") {
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

            if(element === "landing") {
                figure.appendChild(figcaption);
                galleryClass.appendChild(figure);
            } else galleryId.appendChild(figure);
        });
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "displayGallery() HTML figure creation or DOM gallery appendChild() error : ", error);
    }
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