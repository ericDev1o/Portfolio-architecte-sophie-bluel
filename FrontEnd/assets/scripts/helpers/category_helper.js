import { categories } from "../script.js";
import { categoriesURL } from "../config.js";

/**
 * This function stores in a variable all the categories of works.
 * @param { Array } works : see portfolio.js displayGallery. Works have a category information.
 * @returns { Set<String> } : categories is a set of unique categories, including "Tous" for the landing page.
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

/**
 * This function changes a hard coded test category name in its id calling the API for up-to-date data.
 * @param { String } name : the category name to find the corresponding id
 * @returns { Number } : the id of category name.
 */
export async function getCategoryId(name) {
    const req = {
        method: "GET"
    }
    try {
        const res = await fetch(categoriesURL, req);
        if(res.ok) {
            const data = await res.json();
            const objFound = data.find(obj => obj.name === name);
            if(objFound) { 
                return objFound.id;
            }
        } else {
            console.error(new Date().toLocaleTimeString(), `getCategoryId() HTTP error. Status : ${res.status}. Status text : ${res.statusText}`);
        }
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "getCategoryId() fetch error : " + error);
    }
}

/**
 * This function changes a hard coded test category id in its name calling the API for up-to-date data.
 * @param { Number } id : the category id to find the corresponding name
 * @returns { String } : the name of category id.
 */
export async function getCategoryName(id) {
    const req = {
        method: "GET"
    }
    try {
        const res = await fetch(categoriesURL, req);
        if(res.ok) {
            const data = await res.json();
            const objFound = data.find(obj => obj.id === id);
            if(objFound) { 
                return objFound.name;
            }
        } else {
            console.error(new Date().toLocaleTimeString(), `getCategoryId() HTTP error. Status : ${res.status}. Status text : ${res.statusText}`);
        }
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "getCategoryId() fetch error : " + error);
    }
}