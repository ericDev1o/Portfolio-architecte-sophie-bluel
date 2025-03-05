/**
 * This function checks that the user picked file's size is less than 4 Mb.
 * @param { File } file : a user picked file
 * @param { Event } event : in case triggered by an <input type="file"> change event,
 *  this event is reset for retry if the file's size exceeds 4Mb.
 * @returns { Boolean } : true if the file is leight enough.
 */
export function isFileSizeLessThan4Mb(file, event) {
    const maxSize = 4 * 1024 * 1024;
    try {
        if(file.size > maxSize) {
            alert("Le fichier dépasse la taille maximale de 4Mo. Pourriez-vous s'il-vous-plaît recommencer?");
            if(event) event.target.value = "";
            else file = null;
            return false;
        }
        else return true;
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "isFileSizeLessThan4Mb() error : " + error);
    }
}