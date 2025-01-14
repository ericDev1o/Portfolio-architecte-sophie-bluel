/**
 * This function stores an input var in local storage.
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
 * It's used to remove the token at logout.
 * See meaning above.
 * @param {String} key item to remove's key
 */
export function removeFromLocalStorage(key) {
    try {
        localStorage.removeItem(key);
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "removeFromLocalStorage() removeItem() error : ", error);
    }
}