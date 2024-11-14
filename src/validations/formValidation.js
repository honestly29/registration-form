import { setErrorMessage } from '../dom/domUtils.js';


/**
 * Checks if a field is empty. If empty, sets an error message.
 * 
 * @param {string} fieldId - The HTML ID of the input field.
 * @returns {boolean} - True if the field is empty and sets an error message, false otherwise.
 */
export function isFieldEmpty(fieldId) {
    const field = document.getElementById(fieldId);
    const isEmpty = !field || field.value.trim() === '';

    if (isEmpty) {
        setErrorMessage(fieldId, 'Field cannot be left blank');
    } else {
        setErrorMessage(fieldId, ''); 
    }

    return isEmpty;
}


/**
 * Validates a field against a given regex and sets an error message if it fails.
 * 
 * @param {string} fieldId - The HTML ID of the input field.
 * @param {RegExp} regex - The regular expression to test the field value.
 * @param {string} errorMessage - The error message to display if validation fails.
 * @returns {boolean} - True if the field is valid, false otherwise.
 */
export function fieldRegexValidation(fieldId, regex, errorMessage) {
    const field = document.getElementById(fieldId);

    const isValid = regex.test(field.value.trim());

    if (!isValid) {
        setErrorMessage(fieldId, errorMessage);
    } else {
        setErrorMessage(fieldId, '');
    }
    return isValid;
}



/**
 * Validates if the input name fields contain only valid characters.
 * 
 * @returns {boolean} - True if both fields are valid, false otherwise.
 */
export function checkValidNames() {
    let validNames = true;
    const nameRegex = /^[a-zA-Z\s'-]{1,30}$/; // allows a-z, A-Z, whitespace, apostrophes and hyphens within a range of 1-30 chars
    const nameFields = ['fname', 'lname'];

    nameFields.forEach(fieldId => {
        if (isFieldEmpty(fieldId) || !fieldRegexValidation(
            fieldId,
            nameRegex,
            'Name must only contain letters, apostrophes, hyphens and be no more than 30 characters'
        )) {
            validNames = false;
        }
    });
    return validNames;
}



/**
 * Validates if the email input field contains a valid email format.
 * 
 * @returns {boolean} - True if the email is valid, false otherwise.
 */
export function checkValidEmail() {
    if (isFieldEmpty('email')) return false;

    const emailRegex = /^[a-zA-Z0-9](\.?[a-zA-Z0-9!#$%&'*+/=?^_{|}~-])*@[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
    return fieldRegexValidation('email', emailRegex, 'Invalid email address');
}



/**
 * Validates if the age input field contains a valid age between 0 and 120.
 * 
 * @returns {boolean} - True if the age is valid, false otherwise.
 */
export function checkValidAge() {
    if (isFieldEmpty('age')) return false;

    const ageRegex = /^(?:0|[1-9][0-9]?|1[01][0-9]|120)$/; // allows whole numbers between 0-120
    return fieldRegexValidation('age', ageRegex, 'Age must be a whole number between 0 and 120 years old');
}



/**
 * Validates if the Date of Birth input field contains a valid date in the past
 * and represents an age between 0 and 120 years.
 * 
 * @returns {boolean} - True if the DOB is valid, false otherwise.
 */
export function checkValidDob() {
    let validDob = true;
    const dobField = document.getElementById('dob');

    // convert DoB input to Date object
    const dobValue = new Date(dobField.value);
    const currentDate = new Date();

    // calculate age
    const age = currentDate.getFullYear() - dobValue.getFullYear();

    // check if DoB is a valid date and in the past
    if (isNaN(dobValue.getTime()) || dobValue >= currentDate || age < 0 || age > 120) {
        setErrorMessage('dob', 'Date of Birth must be a valid date in the past. Between 0 and 120 years old');
        validDob = false;
    } else {
        setErrorMessage('dob');
    }
    return validDob;
}



/**
 * Checks if a country is selected in the country dropdown field.
 * 
 * @returns {boolean} - True if a country is selected, false otherwise.
 */
export function checkValidCountry() {
    const countryField = document.getElementById('country');

    if (countryField.value === '') {
        setErrorMessage('country', 'Please select a country');
        return false;
    }
    setErrorMessage('country');
    return true;
}



/**
 * Validates if the Terms of Service (TOS) checkbox is checked.
 * 
 * @returns {boolean} - True if the TOS checkbox is checked, false otherwise.
 */
export function checkAcceptedTos() {
    const tosCheckbox = document.getElementById('tos');

    if (!tosCheckbox.checked) {
        setErrorMessage('tos', 'You must agree to the Terms of Service to continue');
        return false;
    }
    setErrorMessage('tos');
    return true;
}