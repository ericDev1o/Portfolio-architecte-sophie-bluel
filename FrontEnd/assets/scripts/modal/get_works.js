import {
    worksURL
} from "../config.js";

/****** Step 1.1 get works from backend ******/
/**
 * This function fetches data and fills the localStorage for speed and less network use during next page reloads.
 * @returns {JSON} : an array of fetched works in JSON format is returned.
 */
export async function fetchAndStoreWorks() {
    try {
        const worksFetched = await fetch(worksURL);
        let works = await worksFetched.json();
        works = Array.from(works);
        if (Array.isArray(works)) {
            window.localStorage.setItem("works", JSON.stringify(works));
            return works;
        } else {
            console.error(new Date().toLocaleTimeString(), "Works aren't an array.", works);
            return [];
        }
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "fetchAndStoreWorks() fetch error : " + error);
    }
}