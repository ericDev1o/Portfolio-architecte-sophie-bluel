import {
    getCategoriesNames
} from "./helpers/categories_getNames.js";
import {
    removeFromLocalStorage
} from "./helpers/local_storage.js";
import {
    classList_add_rem
} from "./helpers/classList_add_remove.js";
import {
    createCategoryFilterButtons
} from "./category/create_category_filter_buttons.js";
import {
    displayGallery
} from "./landing_page/portfolio.js";
import {
    addConnectedModeBanner,
    hideCategoryFilterButtons,
    addWorksModificationLink
} from "./connection.js";
import {
    fetchAndStoreWorks
} from "./modal/get_works.js";
import {
    displayModal,
    closeModal,
    displayAddWorkForm
} from "./modal/modal.js";
import {
    addSubmit
} from "./modal/add_work.js";

/****** Step 1.1 fetch works from backend ******/
let worksInLocalStorageVar = window.localStorage.getItem("works");
let works;
if (worksInLocalStorageVar) {
    try{
        works = JSON.parse(worksInLocalStorageVar);
        if ( ! Array.isArray(works)) {
            console.warn(`LocalStorage works item ${works} isn't an array as expected: local storage is deleted and loaded again.`);
            window.localStorage.removeItem("works");
            works = fetchAndStoreWorks();
        }
    } catch (error) {
        console.error(`Locally stored works JSON parsing error: ${error}. Local storage is deleted and loaded again.`);
        window.localStorage.removeItem("works");
        works = fetchAndStoreWorks();
    }
} else {
    works = fetchAndStoreWorks();
}

displayGallery("landing", works);
let galleryDiv = document.querySelector(".gallery");
let figures = document.querySelectorAll(".gallery figure");
let initialGallery = Array.from(figures);
/****** Step 1.2 create category filter ******/
export let categories = new Set();
categories = await getCategoriesNames(works);
await createCategoryFilterButtons(categories, galleryDiv, initialGallery);
/****** Step 2.2 update landing page to connected mode ******/
try{
    const login = document.getElementById("login");
    login.addEventListener("click", event => {
        event.preventDefault();
        if(login.innerText === "logout") {
            if(localStorage.getItem("token")) {
                removeFromLocalStorage("token");
            }
            login.innerText = "login";
            if(login.href.endsWith("/index.html")) {
                login.href = login.href.replace("/index.html", "/pages/connection.html");
            }
            window.location.href = "./index.html";
        }
        else if(login.innerText === "login") {
            if(login.href.endsWith("/pages/connection.html")) {
                login.href.replace("/pages/connection.html", "/index.html");
            }
            window.location.href = "./pages/connection.html";
        }
    });
} catch(error) {
    console.error(new Date().toLocaleTimeString(), "Landing page login event listener error :  " + error);
}

try {
    const isConnected = await localStorage.getItem("token");
    if(isConnected) {
        addConnectedModeBanner();
        if(login.innerText === "login") {
            login.innerText = "logout";
        }
        hideCategoryFilterButtons();
        addWorksModificationLink();
        const modifier = document.getElementById("editSpan");
        modifier.classList.add("pointer");
        /****** Step 3.1 show photo gallery modal ******/
        modifier.addEventListener("click", () => {
            displayModal();
            try {
                const modalBackground = document.getElementById("modal-backgrd");
                const modalWrapper = document.querySelector(".modal-wrapper");
                modalWrapper.ariaLabel= "Galerie photo";
                if(modalWrapper.ariaModal === "false") modalBackground.ariaModal = "true";

                /*const focusableElements = Array.from(document.querySelectorAll("i, button, input, select"));
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];*/

                const fermer = document.querySelector(".icon-close");
                fermer.addEventListener("click", () => {
                    closeModal();
                    modalWrapper.ariaModal = "false";
                });

                modalBackground.addEventListener("click", event => {
                    if(event.target === modalBackground) {
                        closeModal();
                        modalWrapper.ariaModal = "false";
                    }
                });
                displayGallery("modal", works);
                displayAddWorkForm();

                const iconClose = document.querySelector(".icon-close");

                const erreur = document.querySelector("#erreur");
                erreur.innerText = "";

                const galleryView = document.querySelector(".gallery-view");
                const gallery = document.querySelector("#gallery");
                const addView = document.querySelector(".add-view");
                const title = document.getElementById("modal-title");
                const button = document.getElementById("modal-button");
                const line = document.querySelector(".hr-modal");
                const back = document.querySelector(".icon-back");

                const iconWrapper = document.getElementById("icon-wrapper");
                iconWrapper.classList.add("icon-wrapper-top");

                const form = document.getElementById("modal-form");

                button.addEventListener("click", event => {
                    if(button.innerText === "Ajouter une photo") {

                        classList_add_rem(iconClose, "icon-close-form", "icon-close-gallery");

                        iconWrapper.classList.remove("icon-wrapper-top");

                        classList_add_rem(back, "display-style", "hide");
                        back.style.display = "block";

                        classList_add_rem(galleryView, "hide", "display-style");
                        galleryView.style.display = "none";
                        gallery.classList.remove("gallery-view-size-back");

                        classList_add_rem(addView, "display-style", "hide");
                        addView.style.display = "block";

                        title.innerText = "Ajout photo";
                        modalWrapper.ariaLabel = "Ajout photo";

                        line.classList.add("hr-modal-form");

                        button.classList.add("button-modal-form");
                        button.innerText = "Valider";
                        button.type = "submit";

                        modalWrapper.removeChild(button);
                        modalWrapper.removeChild(line);
                        form.appendChild(line);
                        form.appendChild(button);

                        classList_add_rem(button, "greyed", "selected");
                    }
                    else if(button.innerText === "Valider") {
                        /****** Step 3.3 add work ******/
                        addSubmit(event);
                    }
                });

                document.addEventListener("keydown", (event) => {
                    if(event.key === "Tab") {
                       event.preventDefault(); 
                       /*let index = focusableElements.findIndex(f => f === modalWrapper.querySelector(":focus"));
                       if(event.shiftKey && document.activeElement === firstElement) {
                           lastElement.focus();
                       }
                       else if( ! event.shiftKey && document.activeElement === lastElement) {
                           firstElement.focus();
                       }
                       else if(event.shiftKey) index--;
                       else if( ! event.shiftKey) index++;
                       focusableElements[index].focus();*/
                    }
                    else if(event.key === "Escape") {
                        closeModal();
                        modifier.focus();
                    }
                });
            } catch(error) {
                console.error(new Date().toLocaleTimeString(), "Modifier button modal HTML creation or DOM appendChild() error : " + error);
            }

            try {
                document.querySelector(".icon-back").addEventListener("click", () => {
                    classList_add_rem(iconClose, "icon-close-gallery", "icon-close-form");

                    classList_add_rem(back, "hide", "display-style");
                    back.style.display = "none";
                    galleryView.style.display = "grid";

                    gallery.classList.add("gallery-view-size-back");
                    
                    addView.classList.add("hide");
                    addView.classList.add("display-style");
                    addView.style.display = "none";

                    title.innerText = "Galerie photo";

                    line.classList.remove("hr-modal-form");

                    button.classList.remove("button-modal-form");
                    button.innerText = "Ajouter une photo";
                    button.type = "button";

                    form.removeChild(button);
                    form.removeChild(line);
                    wrapper.appendChild(line);
                    wrapper.appendChild(button);

                    classList_add_rem(button, "selected", "greyed");
                });
            } catch(error) {
                console.error(new Date().toLocaleTimeString(), "Modal back icon HTML creation or DOM appendChild() error : " + error);
            }
        });
    }
} catch(error) {
    console.error(new Date().toLocaleTimeString(), "Landing page connected mode HTML DOM setting error : " + error);
}