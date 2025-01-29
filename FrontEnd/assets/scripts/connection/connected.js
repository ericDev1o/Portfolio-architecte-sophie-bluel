import { removeFromLocalStorage } from "../helpers/local_storage.js";
import { listenToBackArrowClick } from "../helpers/modal_helper.js";
import { checkAndStoreLocallyWorks } from "../helpers/local_storage.js";

import {
    getPortfolioTitle,
    insertAfterPortfolioTitle
} from "../category/create_category_filter_buttons.js";
import {
    backIcon,
    displayModal,
    displayModalGallery
} from "../modal/modal.js";

const login = document.querySelector("#login");

/**
 * This fonction handles the login click.
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
 * This fonction toggles the landing page in connected mode.
 * */
export async function connectLandingPage() {
    try {       
        addConnectedModeBanner();
        loginLink();
        hideCategoryFilterButtons();
        const modifier = addWorksModificationLink();
        modifier.classList.add("pointer");
        /****** Step 3.1 photo gallery modal ******/
        modifier.addEventListener("click", async () => {
            const works = await checkAndStoreLocallyWorks();
            displayModal();
            displayModalGallery(works);
            listenToBackArrowClick(backIcon);
        });
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "Landing page connected mode HTML DOM setting error : " + error);
    }
}

/**
 * This fonction handles the login link.
 */
function loginLink() {
    try{
        if(
            login.innerText === "login" && 
            login.href.endsWith("/pages/connection.html")
        ) {
            login.innerText = "logout";
            login.href = login.href.replace("/pages/connection.html", "/index.html");
            //location.href =  "./pages/connection.html";
        }
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "Landing page login link error :  " + error);
    }
}

/**
 * This fonction handles the logout.
 */
export function logout() {
    try{
        if(
            login.innerText === "logout" && 
            login.href.endsWith("/index.html") &&
            localStorage.getItem("token")
        )
        removeFromLocalStorage("token");
        login.innerText = "login";
        login.href = login.href.replace("/index.html", "/pages/connection.html");
        location.href = "./index.html";
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "Landing page logout error :  " + error);
    }
}

/**
 * This function adds a connected mode banner to the header.
 */
export function addConnectedModeBanner() {
    try{
        const connectedModeBanner = document.createElement("div");
        connectedModeBanner.id = "connected-banner";
        connectedModeBanner.innerText = "Mode édition";

        const divVerticalFlex = document.getElementById("logged-out-mode-header");

        const header = document.querySelector("header");
        header.innerHTML = "";
        header.appendChild(connectedModeBanner);
        header.appendChild(divVerticalFlex);
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "addConnectedModeBanner() HTML banner creation or DOM appendChild() error: ", error);
    }
}

/**
 * This functions hides the category filter buttons.
 */
export function hideCategoryFilterButtons() {
    try{
        let buttons = document.querySelectorAll(".filter");
        buttons.forEach(button => {
            button.classList.add("hide");
        });
        buttons = document.querySelector(".buttons");
        buttons.classList.add("hide", "pointer");
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
        editDiv.id = "editDiv";
        insertAfterPortfolioTitle(editDiv);

        let editIcon = document.createElement("i");
        editIcon.classList.add("material-symbols-outlined");
        editIcon.innerText = "edit_square";
        editIcon.setAttribute("aria-hidden", "true");
        editIcon.setAttribute("alt", "Éditez vos projets");
        editIcon.id = "editIcon";

        let editText = document.createTextNode("modifier");

        let editSpan = document.createElement("span");
        editSpan.id = "editSpan";
        editSpan.appendChild(editIcon);
        editSpan.appendChild(editText);

        let portfolioTitle = getPortfolioTitle();
        portfolioTitle.appendChild(editSpan);
        return editSpan;
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "addWorksModificationLink() HTML creation or DOM appendChild() error : " + error);
    }
}