import { deleteWorkFigureFromLandingPageDOM, deleteWorkFigureFromModalDOM } from "../helpers/DOM_helper.js";
import { displayError } from "../helpers/user_error_display.js"

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
            const error = document.querySelector("#error");
            if(res.status === 401) displayError("Veuillez vous authentifier s'il vous plaît", error);
            else if(res.status === 500) displayError("Erreur serveur inattendue. Veuillez réessayer plus tard s'il vous plaît.", error);
            else if(res.ok) {
                deleteWorkFigureFromModalDOM(idWork);
                deleteWorkFigureFromLandingPageDOM(idWork);
            }
            else {
                console.error(new Date().toLocaleTimeString(), "deleteWork() DELETE error. Status: " + res.status + ", statusText: " + res.statusText);
            }
        }
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "deleteWork() fetch error : " + error);
        error.innerHTML = `Erreur à la suppression du projet "${titleWork}: demandez ou lisez les logs s'il vous plaît.`;
    }
}