/**
 * This function checks the email address via a regular expression.
 * @param { String } email : e-mail address for example firstname.name@domain.extension 
 * @returns { Boolean } true if the argument satisfies the regex pattern.
 */
export function isValidEmail(email) {
    try {
        const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return emailPattern.test(email);
    } catch(error) {
        console.error("isValidEmail() regex error : " + error);
    }
}