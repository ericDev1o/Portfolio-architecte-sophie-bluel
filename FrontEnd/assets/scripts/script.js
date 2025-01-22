import {
    getCategoriesNames
} from "./helpers/categories_getNames.js";
import {
    removeFromLocalStorage
} from "./helpers/local_storage.js";
import {
    listenToBackArrowClick
} from "./helpers/modal_helper.js";
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
    backIcon,
    displayModal,
    displayModalGallery
} from "./modal/modal.js";

/****** Step 1.1 fetch works from backend ******/
let worksInLocalStorageVar = window.localStorage.getItem("works");
export let works;

if (worksInLocalStorageVar) {
    try{
        let worksStoredWhen = window.localStorage.getItem("worksStoredWhen");
        if(Date.now() - worksStoredWhen <= 86400) {
            works = JSON.parse(worksInLocalStorageVar);
            if ( ! Array.isArray(works)) {
                console.warn(`LocalStorage works item ${works} isn't an array as expected: local storage is deleted and loaded again.`);
                window.localStorage.removeItem("works");
                works = await fetchAndStoreWorks();
            }
        }
        else {
            works = await fetchAndStoreWorks();
        }
    } catch (error) {
        console.error(new Date().toLocaleTimeString(), `Locally stored works JSON parsing error: ${error}. Local storage is deleted and loaded again.`);
        window.localStorage.removeItem("works");
        works = await fetchAndStoreWorks();
    }
} else {
    works = await fetchAndStoreWorks();
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
            if(localStorage.getItem("token")) removeFromLocalStorage("token");
            login.innerText = "login";
            if(login.href.endsWith("/index.html")) login.href = login.href.replace("/index.html", "/pages/connection.html");
            window.location.href = "./index.html";
        }
        else if(login.innerText === "login") {
            if(login.href.endsWith("/pages/connection.html")) login.href.replace("/pages/connection.html", "/index.html");
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
        if(login.innerText === "login") login.innerText = "logout";
        hideCategoryFilterButtons();
        addWorksModificationLink();
        const modifier = document.getElementById("editSpan");
        modifier.classList.add("pointer");
        /****** Step 3.1 show photo gallery modal ******/
        modifier.addEventListener("click", () => {
            displayModal();
            displayModalGallery();
            listenToBackArrowClick(backIcon);
        });
    }
} catch(error) {
    console.error(new Date().toLocaleTimeString(), "Landing page connected mode HTML DOM setting error : " + error);
}