/****** Step 1.2 create the category filter ******/
import { replaceSpaceByUnderscore } from "../helpers/string_replacer.js";
import { classList_add_rem } from "../helpers/classList_add_remove.js";

import { displayGallery } from "../landing_page/portfolio.js";

/**
 * This function hides the gallery.
 */
function hideGallery() {
    try{
        let figures = document.querySelectorAll(".gallery figure");
        figures.forEach(figure => {
            classList_add_rem(figure, "hide", "display-style");
        });
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "hideGallery() classList adding or removal error : ", error);
    }
}

/**
 * This function sets the display of figures depending on their category.
 * @param {HTMLElement[]} filteredFigures : only the figures of a selected category. All is a possible selection.
 * @param {HTMLElement[]} figuresArray : the gallery as an array of figures
 * @returns {HTMLElement[]} : the gallery as an array of figures displayed based on their category
 */
function displayFilteredFigures(filteredFigures, figuresArray) {
    try{
        figuresArray.forEach(figure => {
            if (filteredFigures.includes(figure)) {
                classList_add_rem(figure, "display-style", "hide");
            }
        });
        return figuresArray;
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "displayFilteredFigures() classList adding or removal error : ", error);
    }
}

/**
 * This function filters the gallery by category and displays the corresponding figures.
 * @param { HTMLOptionElement } option : a category to filter on
 * @param { Element } galleryDiv : the <div class="gallery"> containing the figures
 * @param { Array } works : fetched works from the backend API in JSON format
 */
export function filterGallery(option, galleryDiv, works) {
    try{
        let val = option;
        if(val.includes(" ") && val !== "Tous") val = replaceSpaceByUnderscore(val);
        let figures = document.querySelectorAll(".gallery figure");
        let figuresArray = Array.from(figures);
        let filteredFigures;
        if(val !== "Tous"){
            filteredFigures = figuresArray.filter(figure => {
                return figure.className.includes(val);
            });
            hideGallery();
            figuresArray = displayFilteredFigures(filteredFigures, figuresArray);
            replaceGallery(figuresArray, galleryDiv);
        } else displayGallery("landing", works, true);
        
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "filterGallery() DOM manipulation error : ", error);
    }
}

/**
 * This function replaces the gallery. 
 * The gallery is first emptied. 
 * Then the filtered gallery replaces the previously displayed content.
 * @param { HTMLElement[] } figuresArray : the updated gallery set up to display only the filtered category
 * @param { Element } galleryDiv : the <div class="gallery"> containing the figures
 */
function replaceGallery(figuresArray, galleryDiv) {
    try{
        galleryDiv.innerHTML = "";
        figuresArray.forEach(figure => {
            galleryDiv.appendChild(figure);
        });
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "replaceGallery() appendChild() to gallery div error : ", error);
    }
}