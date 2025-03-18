import { classList_add_rem } from "../helpers/classList_add_remove.js";

import { filterGallery } from "./filter_by_category.js";

/****** Step 1.2 create category filter buttons ******/
let portfolio = document.getElementById("portfolio");

/**
 * This function creates the HTML category filtering buttons elements.
 * @param { Set } categories see categories_getNames.js getCategories() all unique category of work
 * @param { Element } galleryDiv see filterByCategory.js filterGallery() the div containing the figures
 * @param { Array } works : fetched works from the backend API in JSON format
*/
export async function createCategoryFilterButtons(categories, galleryDiv, works) {
    try{
        let filterDiv = document.createElement("div");
        filterDiv.id = "filter-id";
        filterDiv.classList.add("filter", "display-flex");

        let categoryButtons = document.createElement("div");
        categoryButtons.classList.add("buttons", "display-flex");
        categoryButtons.classList.add("pointer");

        categories.forEach(category => {
            let categoryButton = document.createElement("button");
            categoryButton.innerText = category;
            categoryButton.setAttribute("data", category);
            categoryButton.classList.add("button");
            categoryButton.innerText === "Tous" ? 
                categoryButton.classList.add("selected") : 
                categoryButton.classList.add("unselected");

            categoryButton.addEventListener("click", event => {
                const selectedOption = event.target.getAttribute("data");
                filterGallery(selectedOption, galleryDiv, works);

                let prevSelected = document.querySelector(".selected");
                classList_add_rem(prevSelected, "unselected", "selected");
                
                classList_add_rem(categoryButton, "selected", "unselected");
            });
            categoryButtons.appendChild(categoryButton);
        });
        filterDiv.appendChild(categoryButtons);
        insertAfterPortfolioTitle(filterDiv);
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "createCategoryFilterButtons() HTML category filter buttons creation or DOM appendChild() error : ", error);
    }
}

/**
 * This function gets the portfolio section h2 title.
 * @returns { HTMLHeadingElement } : the h2 title HTMl element
 */
export function getPortfolioTitle() {
    try{
        const title = portfolio.querySelector("h2");
        return title;
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "getPortfolioTitle() HTML element querying error : ", error);
    }
}

/**
 * This function inserts a HTML element after "Mes Projets".
 * @param { Element } element : the category filter buttons or modification link after login
 */
export function insertAfterPortfolioTitle(element) {
    portfolio.insertBefore(element, getPortfolioTitle().nextSibling);
}