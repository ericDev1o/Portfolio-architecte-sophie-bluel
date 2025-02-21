import { loginURL } from "../config.js";
import { displayError } from "../helpers/user_error_display.js";
import { storeInLocalStorage } from "../helpers/local_storage.js";

/****** Step 2.2 user's authentication ******/
await addEventListener("submit", event => { loginSubmit(event); });

/**
 * This function logs the user in and stores the token in localStorage.
 * It stores in the browser an edit mode display information.
 * @param { Event } e : login form SubmitEvent button click
 */
async function loginSubmit(e) {
    try {
        e.preventDefault();
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        const loginData = { 
            email,
            password
        };
        const req = {
            method: "POST",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        }
        const error = document.querySelector("#error");
        error.innerHTML = "";
        const res = await fetch(loginURL, req);
        if(res.status === 401 || res.status === 404) displayError("Utilisat·rice·eur / mot de passe inconnu. Recommencez avec les bons identifiants s'il vous plaît.", error);      else if(res.ok) {
            const data = await res.json();
            storeInLocalStorage("token", data.token);
            location.href = "../index.html";
        }
        else {
            console.error(new Date().toLocaleTimeString(), `loginSubmit() HTTP error. Status: ${res.status}. Status text: ${res.statusText}.`)
        }
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "loginSubmit() fetch error : " + error);
        error.innerHTML = "Erreur à votre connexion. Vérifiez vos identifiants. Au besoin, demandez ou lisez les logs s'il vous plaît.";
    }
}