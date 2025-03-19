import { getCategoryId } from "../helpers/category_helper.js";
import { formDataValueReplacer } from "../helpers/FormData_value_replacer.js";
import { hideModal } from "../helpers/modal_helper.js";
import { addWorkFigureToDOM } from "../helpers/DOM_helper.js";

import { worksURL } from "../config.js";
import { backToGalleryClass } from "./modal.js";

/**
 * This function adds a work. 
 * It sends it to the back-end. At page reload it must therefore remain visible.
 * It updates the landing page and modal DOM.
 * @param { Event } event : add work form SubmitEvent button click
 */

export async function addSubmit(event) {
    try {
        event.preventDefault();

        let category = document.querySelector("#category").value;

        const error = document.querySelector("#error");
        const form = document.querySelector("#modal-form");
        const url = new URL(worksURL);
        const formData = new FormData(form);
        const id = await getCategoryId(category);
        const formDataCategId = formDataValueReplacer(formData, "category", id);
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
            const data = await res.json();
            if(data) await addWorkFigureToDOM(data);

            backToGalleryClass(true);

            hideModal();
        }
        else if(res.status === 500) alert("Erreur serveur inattendue. Veuillez réessayer s'il vous plaît.", error);
        else if(res.status === 401) alert("Veuillez vous authentifier s'il vous plaît.", error);
        else if(res.status === 400) alert("Titre, catégorie ou fichier incorrect. Veuillez vérifier l'extenion d'image et le poids max. du fichier s'il vous plaît.", error);
        else console.error("addSubmit() HTTP request -> response error. Status:  " + res.status + ". Message: " + res.statusText);
    } catch(error) {
        console.error("addSubmit() fetch error : " + error);
    }
}