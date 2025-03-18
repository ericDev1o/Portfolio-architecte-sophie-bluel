import { removeFromLocalStorage } from "../helpers/local_storage.js";
import { fetchWorks } from "../helpers/fetch.js";
import { adjustModalBottomAtOpening, displayModal } from "../helpers/modal_helper.js";

import { getPortfolioTitle, insertAfterPortfolioTitle } from "../category/create_category_filter_buttons.js";
import { backIcon, displayModalGallery, listenToBackArrowClick } from "../modal/modal.js";
import { classList_add_rem } from "../helpers/classList_add_remove.js";

const login = document.querySelector("#login");
const connectedModeBanner = document.getElementById("connected-banner");
let dialog;

/**
 * This function handles the login click.
 */
export function loginClickListener() {
    try{
        login.addEventListener("click", event => {
            event.preventDefault();
            if(
                login.innerText === "login" && 
                login.href.endsWith("/pages/connection.html") &&
                ! localStorage.getItem("token")
                ) location.href =  "./pages/connection.html";
            else logout();
        });
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "Landing page login click error :  " + error);
    }
}

/**
 * This function toggles the landing page in connected mode.
 * It displays the gallery with a "modifier" link upfront.
 * */
export async function connectLandingPage() {
    try {       
        displayConnectedModeBanner();
        loginLink();
        hideCategoryFilterButtons();
        addWorksModificationLink();
        const editIcons = document.querySelectorAll("#edit-icon");
        editIcons.forEach(editIcon => {
            editIcon.classList.add("pointer");
            /****** Step 3.1 photo gallery modal ******/
            editIcon.addEventListener("click", async () => {
                const works = await fetchWorks();
                
                if( ! dialog) dialog = document.getElementById("modal-backgrd");
                dialog = displayModal(dialog);
                displayModalGallery(works, editIcon);
                adjustModalBottomAtOpening();
                
                listenToBackArrowClick(backIcon);
            });
        });
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "Landing page connected mode HTML DOM setting error : " + error);
    }
}

/**
 * This function handles the login link.
 */
function loginLink() {
    try{
        if(
            login.innerText === "login" && 
            login.href.endsWith("/pages/connection.html")
        ) {
            login.innerText = "logout";
            login.href = login.href.replace("/pages/connection.html", "/index.html");
        }
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "Landing page login link error :  " + error);
    }
}

/**
 * This function handles the logout.
 */
export function logout() {
    try{
        if(
            login.innerText === "logout" && 
            login.href.endsWith("/index.html") &&
            localStorage.getItem("token")
        )
        {
            removeFromLocalStorage("token");
            login.innerText = "login";
            login.href = login.href.replace("/index.html", "/pages/connection.html");
            location.href = "./index.html";

            hideConnectedModeBanner();
           
            displayCategoryFilterButtons();

            const editDiv = document.getElementById("edit-div-id");
            classList_add_rem(editDiv, "edit-div", "edit-div-connected");
        }
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "Landing page logout error :  " + error);
    }
}

/**
 * This function adds a connected mode banner to the header at login.
 */
export function displayConnectedModeBanner() {
    try{
        classList_add_rem(connectedModeBanner, "display-flex", "hide");
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "displayConnectedModeBanner() error: ", error);
    }
}

/**
 * This function hides the header connected mode banner at logout.
 */
function hideConnectedModeBanner() {
    try{
        classList_add_rem(connectedModeBanner, "hide", "display-flex");
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "hideConnectedModeBanner() error: ", error);
    }
}

/**
 * This function hides the category filter buttons at login.
 */
export function hideCategoryFilterButtons() {
    try{
        const filter = document.getElementById("filter-id");
        classList_add_rem(filter, "filter-connected", "filter");

        const buttons = document.querySelector(".buttons");
        classList_add_rem(buttons, "hide", "display-flex");
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "hideCategoryFilterButton() HTML classList adding error : " + error);
    }
}

/**
 * This function displays the category filter buttons at logout.
 */
function displayCategoryFilterButtons() {
    try{
        const filter = document.getElementById("filter-id");
        classList_add_rem(filter, "filter", "filter-connected");

        const buttons = document.querySelector(".buttons");
        classList_add_rem(buttons, "display-flex", "hide");
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "hideCategoryFilterButton() HTML classList adding error : " + error);
    }
}

/**
 * This function adds a works modification link below the portfolio title.
 * @returns { HTMLSpanElement } "modifier" editSpan
 */
export function addWorksModificationLink() {
    try {
        let editDiv = document.createElement("div");
        editDiv.id = "edit-div-id";
        editDiv.classList.add("edit-div");
        classList_add_rem(editDiv, ".edit-div-connected", "edit-div");
        insertAfterPortfolioTitle(editDiv);

        let editIcon = document.createElement("i");
        editIcon.classList.add("material-symbols-outlined");
        editIcon.innerText = "edit_square";
        editIcon.setAttribute("aria-hidden", "true");
        editIcon.setAttribute("alt", "Éditez vos projets");
        editIcon.id = "edit-icon";

        let editText = document.createTextNode("modifier");

        let editSpan = document.createElement("span");
        editSpan.id = "edit-span";
        editSpan.appendChild(editIcon);
        editSpan.appendChild(editText);

        let portfolioTitle = getPortfolioTitle();
        portfolioTitle.appendChild(editSpan);
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "addWorksModificationLink() HTML creation or DOM appendChild() error : " + error);
    }
}