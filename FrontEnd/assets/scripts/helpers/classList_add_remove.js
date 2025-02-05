/**
 * This function adds a class to and removes a class from the classList of a DOM element.
 * @param {Element} element : Element or HTMLElement with a classList to change
 * @param {String} addedClass : token class to add to the classList DOMTokenList
 * @param {String} removedClass : token class to remove from the classList DOMTokenList
 */
export function classList_add_rem(element, addedClass, removedClass) {
    element.classList.add(addedClass);
    element.classList.remove(removedClass);
}