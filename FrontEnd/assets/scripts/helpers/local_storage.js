/**
 * This function stores an input var in window.localStorage.
 * It's used to store the token at login.
 * It's meant to try to debug easier this specific error
 * @param { String } key input var
 * @param { String } val the token for example
 */
export function storeInLocalStorage(key, val) {
    try {
        localStorage.setItem(key, val);
    } catch(error) {
        console.error("storeInLocalStorage() setItem() error : ", error);
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
        console.error("removeFromLocalStorage() removeItem() error : ", error);
    }
}