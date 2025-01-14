import {
    categoriesURL
} from "../config.js";
import {
    storeInLocalStorage
} from "./local_storage.js";

/**
 * This function changes a hard coded test category name in its id calling the API for up-to-date data.
 * It is called in add_work.js addSubmit() line 88.
 * @returns the id of category name to the main flow.
 */
export async function getCategoryId() {
    const req = {
        method: "GET"
    }
    try {
        const res = await fetch(categoriesURL, req);
        if(res.ok) {
            const data = await res.json();
            const objTrouv = data.find(obj => obj.name === "Objets");
            if(objTrouv) { 
                storeInLocalStorage(objTrouv.id, objTrouv.name);
                return objTrouv.id;
            }
        } else {
            console.error(`getCategoryId() HTTP error. Status : ${res.status}. Status text : ${res.statusText}`);
        }
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "getCategoryId() fetch error : " + error);
    }
}