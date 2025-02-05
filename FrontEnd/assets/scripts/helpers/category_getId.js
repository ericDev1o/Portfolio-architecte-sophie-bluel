import {
    categoriesURL
} from "../config.js";

/**
 * This function changes a hard coded test category name in its id calling the API for up-to-date data.
 * @param {String} name : the category name to find the corresponding id
 * @returns {Number} : the id of category name.
 */
export async function getCategoryId(name) {
    const req = {
        method: "GET"
    }
    try {
        const res = await fetch(categoriesURL, req);
        if(res.ok) {
            const data = await res.json();
            const objTrouv = data.find(obj => obj.name === name);
            if(objTrouv) { 
                return objTrouv.id;
            }
        } else {
            console.error(new Date().toLocaleTimeString(), `getCategoryId() HTTP error. Status : ${res.status}. Status text : ${res.statusText}`);
        }
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "getCategoryId() fetch error : " + error);
    }
}