/**
 * This function finds a key and replaces the value.
 * @param {FormData} formData 
 * @param {String} key 
 * @param {*} newValue 
 * @returns {FormData} : the muted formData.
 */
export function formDataValueReplacer(formData, key, newValue) {
    try {
        const formDataReplaced = formData;
        for(let [cle, valeur] of formDataReplaced.entries()) {
            if(cle === key) {
                formDataReplaced.set(cle, newValue);
                break;
            }
        }
        return formDataReplaced;
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "formDataValueReplacer() FormData value setting error : " + error);
    }
}