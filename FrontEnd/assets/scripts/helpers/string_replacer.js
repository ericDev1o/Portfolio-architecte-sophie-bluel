/**
 * This function replaces spaces by underscores ("_").
 * @param { String } name : the class name including one or more spaces (" ")
 * @returns { String } : the string substitution with "_" instead of " "
 */
export function replaceSpaceByUnderscore(name) {
    try {
        let underscored = name;
        if(name.includes(" ")) underscored = name.replaceAll(" ", "_");
        return underscored;
    } catch(error) {
        console.error("replaceSpaceByUnderscore() replaceAll() error : " + error);
    }
}