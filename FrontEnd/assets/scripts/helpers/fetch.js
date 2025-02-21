import { worksURL } from "../config.js";

/**
 * This function initially fetches data and fills the window.localStorage 
 * for user's display speed and less network use during next page reload.
 * See script.js for user's acknowledgment of return[].
 * @returns { Array } : an array of fetched works in JSON format is returned.
 */
export async function fetchWorks() {
    try {
        const worksFetched = await fetch(worksURL);
        let works = await worksFetched.json();
        works = Array.from(works);
        if (Array.isArray(works)) {
            return works;
        } else {
            console.error(new Date().toLocaleTimeString(), "Works aren't an array.", works);
            return [];
        }
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "fetchWorks() fetch error : " + error);
    }
}