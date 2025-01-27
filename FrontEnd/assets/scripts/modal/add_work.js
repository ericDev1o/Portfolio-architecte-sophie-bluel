import { displayError } from "../helpers/user_error_display.js";
import { getCategoryId } from "../helpers/category_getId.js";
import { formDataValueReplacer } from "../helpers/FormData_value_replacer.js";
import { closeModal } from "../helpers/modal_helper.js";

import { worksURL } from "../config.js";
import { displayGallery, emptyLandingPageGalleryDOM } from "../landing_page/portfolio.js";
import { fetchAndStoreWorks } from "./get_works.js";

/**
 * This function adds a work. It sends it to the back-end.
 * At page reload it must be visible.
 * @param { Event } event : login form SubmitEvent button click
 */

export async function addSubmit(event) {
    try {
        event.preventDefault();

        let image = document.querySelector("#image").value;
        let title = document.querySelector("#title").value;
        let category = document.querySelector("#category").value;

        const erreur = document.querySelector("#erreur");
        const form = document.querySelector("#modal-form");
        const url = new URL(worksURL);
        const formData = new FormData(form);
        const formDataCategId = formDataValueReplacer(formData, "category", await getCategoryId(category));
        const token = localStorage.getItem("token");
        const fetchOptions = {
            method: "POST",
            headers: {
                accept: "application/json",
                "Authorization": "Bearer " + token
            },
            body: formDataCategId
        };

        const res = await fetch(url, fetchOptions);

        if(res.ok) {                       
            image = null;
            title = "";
            category = "";
            const works = await fetchAndStoreWorks();
            emptyLandingPageGalleryDOM();
            displayGallery("landing", works);
            closeModal();
        }
        else if(res.status === 500) displayError("Erreur serveur inattendue. Veuillez réessayer s'il vous plaît.", erreur);
        else if(res.status === 401) displayError("Veuillez vous authentifier s'il vous plaît.", erreur);
        else if(res.status === 400) displayError("Titre, catégorie ou fichier incorrect. Veuillez vérifier l'extenion d'image et le poids max. du fichier s'il vous plaît.", erreur);
        else console.error(new Date().toLocaleTimeString(), "HTTP request -> response error. Status:  " + res.status + ". Message: " + res.statusText);
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "addSubmit() fetch error : " + error);
        erreur.innerHTML = "Erreur au chargement d'image. Vérifiez l'extension et le poids du fichier. Au besoin, demandez ou lisez les logs s'il vous plaît.";
    }
}