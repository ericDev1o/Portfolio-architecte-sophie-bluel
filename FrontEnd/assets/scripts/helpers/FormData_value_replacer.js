/**
 * This function finds a key and replaces the value.
 * @param { FormData } formData 
 * @param { String } key 
 * @param { * } newValue 
 * @returns { FormData } : the muted formData.
 */
export function formDataValueReplacer(formData, key, newValue) {
    try {
        const formDataReplaced = formData;
        for(let [keyIter, value] of formDataReplaced.entries()) {
            console.log("keyIter : " + keyIter)
            console.log("value : " + value)
            if(keyIter === key) {
                formDataReplaced.set(keyIter, newValue);
                break;
            }
        }
        return formDataReplaced;
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "formDataValueReplacer() FormData value setting error : " + error);
    }
}