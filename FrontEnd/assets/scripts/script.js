import { getCategoriesNames } from "./helpers/category_helper.js";
import { fetchWorks } from "./helpers/fetch.js";

import { createCategoryFilterButtons } from "./category/create_category_filter_buttons.js";
import { connectLandingPage, loginClickListener } from "./connection/connected.js";
/** This function displays the gallery on landing page or in modal. */
import { displayGallery } from "./landing_page/portfolio.js";

/****** Step 1.1 fetch works from backend ******/
export let works = await fetchWorks();

/****** Step 1.2 create category filter ******/
export let categories = new Set();

/****** Step 1 display landing page ******/
displayGallery("landing", works, false);
let galleryDiv = document.querySelector(".gallery");

/****** Step 1.2 create category filter buttons ******/
categories = await getCategoriesNames(works);
await createCategoryFilterButtons(categories, galleryDiv, works);

/****** Step 2.2 update landing page to connected mode ******/
loginClickListener();
/** This function displays the landing page in connected mode. */
if(localStorage.getItem("token")) connectLandingPage();