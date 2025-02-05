import { getCategoriesNames } from "./helpers/categories_getNames.js";
import { checkAndStoreLocallyWorks } from "./helpers/local_storage.js";

import { createCategoryFilterButtons } from "./category/create_category_filter_buttons.js";
import { connectLandingPage, loginClickListener } from "./connection/connected.js";
import { displayGallery } from "./landing_page/portfolio.js";

/****** Step 1.1 fetch works from backend ******/
export let works;

/****** Step 1.2 create category filter ******/
export let categories = new Set();

/****** Step 1.1 get works from backend ******/
let worksInLocalStorage = localStorage.getItem("works");
works = await checkAndStoreLocallyWorks(worksInLocalStorage);
if(works == []) alert(
    "Erreur au téléchargement de la galerie des projets. "+
    "Veuillez s'il vous plaît patienter ou contacter l'admin.");

/****** Step 1 display landing page ******/
displayGallery("landing", works);
let galleryDiv = document.querySelector(".gallery");
let figures = document.querySelectorAll(".gallery figure");
let initialGallery = Array.from(figures);

/****** Step 1.2 create category filter buttons ******/
categories = await getCategoriesNames(works);
await createCategoryFilterButtons(categories, galleryDiv, initialGallery);

/****** Step 2.2 update landing page to connected mode ******/
loginClickListener()
if(localStorage.getItem("token")) connectLandingPage();