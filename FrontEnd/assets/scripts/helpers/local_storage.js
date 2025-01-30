import { worksURL } from "../config.js";

/****** Step 1.1 get works from backend ******/
/**
 * This function checks presence and format of the works in the browser's local storage.
 * @param { String } : worksInLocalStorage must be the stringified JSON[] works
 * @returns { Array } : a refreshed JSON[] works
 */
export async function checkAndStoreLocallyWorks() {
    const worksStoredWhen = localStorage.getItem("worksStoredWhen");
    if (worksStoredWhen) {
        try{
            if(Date.now() - worksStoredWhen <= 86400) {
                const works = JSON.parse(localStorage.getItem("worksInLocalStorage"));
                if ( Array.isArray(works)) return works;
                else if(works) {
                    console.warn(`LocalStorage works item ${works} isn't an array as expected: local storage is deleted and loaded again.`);
                    localStorage.removeItem("works");
                    return await fetchAndStoreWorks();
                } else return await fetchAndStoreWorks();
            }
            else return await fetchAndStoreWorks();
        } catch (error) {
            console.error(new Date().toLocaleTimeString(), `Locally stored works JSON parsing error: ${error}. Local storage is deleted and loaded again.`);
            localStorage.removeItem("works");
            return await fetchAndStoreWorks();
        }
    } else return await fetchAndStoreWorks(); 
}
/**
 * This function initially fetches data and fills the window.localStorage 
 * for user's display speed and less network use during next page reload.
 * See script.js for user's acknowledgment of return[].
 * @returns { Array } : an array of fetched works in JSON format is returned.
 */
export async function fetchAndStoreWorks() {
    try {
        const worksFetched = await fetch(worksURL);
        let works = await worksFetched.json();
        works = Array.from(works);
        if (Array.isArray(works)) {
            localStorage.setItem("works", JSON.stringify(works));
            localStorage.setItem("worksStoredWhen", Date.now());
            return works;
        } else {
            console.error(new Date().toLocaleTimeString(), "Works aren't an array.", works);
            return [];
        }
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "fetchAndStoreWorks() fetch error : " + error);
    }
}

/**
 * This function stores an input var in window.localStorage.
 * It's used to store the token at login.
 * It's meant to try to debug easier this specific error
 * @param {String} key input var
 * @param {String} val the token for example
 */
export function storeInLocalStorage(key, val) {
    try{
        localStorage.setItem(key, val);
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "storeInLocalStorage() setItem() error : ", error);
    }
}

/**
 * This function removes an item from local storage.
 * It's used to remove the token at logout or works at work add for refresh.
 * @param {String} key item to remove's key
 */
export function removeFromLocalStorage(key) {
    try {
        localStorage.removeItem(key);
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "removeFromLocalStorage() removeItem() error : ", error);
    }
}

/**
 * This function redisplays the gallery for completeness without refresh.
 * @param { NodeListOf<Element> } : modal figures to count for a change detection
 * @param { Array } : works fetched
 * @returns { Boolean } : true when there was a landing page gallery change
 */
export function checkForLandingPageGalleryCountDifference(figures, works) {
    if(figures.length !== works.length) return true;
    else return false;
}