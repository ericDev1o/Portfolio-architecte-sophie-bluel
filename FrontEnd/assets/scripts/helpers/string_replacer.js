/**
 * This function replaces spaces by underscores ("_").
 * @param {string} name : the class name including one or more spaces (" ")
 * @returns the string substitution with "_" instead of " "
 */
export function replaceSpaceByUnderscore(name) {
    try {
        let underscored = name;
        if(name.includes(" ")) underscored = name.replaceAll(" ", "_");
        return underscored;
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "replaceSpaceByUnderscore() replaceAll() error : " + error);
    }
}