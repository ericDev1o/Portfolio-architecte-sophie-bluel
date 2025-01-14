/**
 * This function gets the front's config.
 * Backend routes are stored.
 */
export async function loadConfig() {
    try {
        const baseURL = window.location.origin;
        const configPath = `${baseURL}/FrontEnd/assets/config/config.json`;
        const resConfigFetched = await fetch(configPath);
        if(resConfigFetched.ok) {
            const dataConfig = await resConfigFetched.json();
            return dataConfig;
        } else {
            console.error("loadConfig() error: " + resConfigFetched.statusText);
        }
    } catch(error) {
        console.error("loadConfig() error fetching the config.json: " + error);
    }
}

const config = await loadConfig();
const host = config.host_dev_local;
const port = config.port_dev_local;
const api = config.api_main_route;
const login = config.login_route;
const works = config.works_route;
const categories = config.login_route;

const apiURL = `${host}${port}${api}`;
export const loginURL = `${apiURL}${login}`;
export const worksURL = `${apiURL}${works}`;
export const categoriesURL = `${apiURL}${categories}`;