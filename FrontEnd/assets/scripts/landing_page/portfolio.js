import { createGalleryFigure } from "../helpers/DOM_helper.js";

const galleryClass = document.querySelector(".gallery");

/**
 * This function displays the gallery of the 
 *     landing page or
 *     modal.
 * This function creates HTML elements in .gallery div based on works from the API.
 * @param { String } element : "landing" or "modal"
 * @param { Array } works : JSON array of works from backend
 * @param { Boolean } create : a boolean that when true forces the figures creation
 * @returns { Boolean } : true when finished
 */
export function displayGallery(element, works, create) {
    try { 
        const galleryId = document.getElementById("gallery");
        
        if(element === "landing"){ 
            if(galleryClass.childElementCount !== 0 && ! create) {
                return true;
            } 
        } else if (element === "modal") {
            if(galleryId.childElementCount !== 0 && ! create) {
                return true;
            }
        }
        if(galleryClass.childElementCount === 0 ||
            galleryId.childElementCount === 0 || 
            create) 
        {
            if(create && element === "landing" && galleryClass.childElementCount !== 0) galleryClass.innerHTML = "";
            else if(create && element === "modal" && galleryId.childElementCount !== 0) galleryId.innerHTML = "";
            works.forEach(async work => {
                const figure = await createGalleryFigure(element, work);

                if(element === "landing") {
                    galleryClass.appendChild(figure);
                } else if(element === "modal") galleryId.appendChild(figure);
            });
        }
    } catch(error) {
        console.error("displayGallery() HTML figure creation or DOM gallery appendChild() error : ", error);
    }
}