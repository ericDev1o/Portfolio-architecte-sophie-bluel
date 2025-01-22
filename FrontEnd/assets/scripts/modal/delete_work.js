import {
    removeFromLocalStorage
} from "../helpers/local_storage.js";
import {
    displayError
} from "../helpers/user_error_display.js"
import {
    deleteWorkFigureFromLandingPageDOM
} from "../landing_page/portfolio.js";

/**
 * This function deletes a work from the back-end, DOM and localStorage.
 * @param {String} deleteURL : the backend DELETE URL begins with the script.js worksURL constant.
 * @param {Number} idWork : the id of the work to delete
 * @param {String} titleWork : the name of the work to delete in case of error message user display
 */
export async function deleteWork(deleteURL, idWork, titleWork) {
    const token = localStorage.getItem("token");
    const req = {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + token
        }
    }
    try {
        if(confirm("Êtes-vous sûr de vouloir supprimer ce projet?")) {
            const res = await fetch(deleteURL + idWork , req);
            if(res.status === 401) displayError("Veuillez vous authentifier s'il vous plaît", erreur);
            else if(res.status === 500) displayError("Erreur serveur inattendue. Veuillez réessayer plus tard s'il vous plaît.", erreur);
            else if(res.ok) {
                deleteWorkFigureFromModalDOM(idWork);
                deleteWorkFigureFromLandingPageDOM(idWork);
                removeFromLocalStorage("works");
            }
            else {
                console.error(new Date().toLocaleTimeString(), "deleteWork() DELETE error. Status: " + res.status + ", statusText: " + res.statusText);
            }
        }
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "deleteWork() fetch error : " + error);
        erreur.innerHTML = `Erreur à la suppression du projet "${titleWork}: demandez ou lisez les logs s'il vous plaît.`;
    }
}

/**
 * This function removes modal gallery's DOM work figure with specified id.
 * @param {integer} idWork 
 */
function deleteWorkFigureFromModalDOM(idWork) {
    try {
        const el = document.getElementById("modal" + "#" + idWork); // figure dans modale
        if(el) {
            el.remove();
            console.log(`Modal figure id n°${idWork} was deleted from DOM.`);
        }
        else { 
            console.error(`No modal figure having id modal#${idWork} was found in the DOM.`); 
        }
    } catch(error) {
        console.error(`Error deleting modal figure id n°${idWork}: ${error}`);
    }
}