import {
    categories
} from "../script.js";

/**
 * This function stores in a variable all the categories of works.
 * @param {Array} works : see portfolio.js displayGallery. Works have a category information.
 * @returns {Set<String>} : categories is a set of unique categories, including "Tous" for the landing page.
 */
export async function getCategoriesNames(works) {
    try{
        categories.clear();
        categories.add("Tous");

        works.forEach(work => {
            const categ = work.category.name;
            if(categories.size === 0 || ! categories.has(categ)) categories.add(categ);
        });
        return categories;
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "getCategoriesNames() looping works or filling categories array error : ", error);
    }
}