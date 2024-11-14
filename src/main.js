import { populateCountryDropdown, setErrorMessage } from './dom/domUtils.js';
import { fetchCountryData } from './api/apiUtils.js';
import { checkValidNames, checkValidEmail, checkValidAge, checkValidDob, checkValidCountry, checkAcceptedTos } from './validations/formValidation.js';



/**
 * Initializes the form by fetching country data and populating the dropdown menu.
 * If the fetch fails, it displays an error message.
 * 
 * @async
 */
async function initializeForm() {
    const countryData = await fetchCountryData();
    if (countryData) {
        populateCountryDropdown(countryData);
    } else {
        setErrorMessage('country', 'Unable to load country list');
    }
}



/**
 * Handles the form submission event and validates all form fields before submission.
 * Prevents submission if any validation fails.
 * 
 * @param {Event} event - The form submission event.
 */
function handleFormSubmission(event) {
   
    const namesValid = checkValidNames();
    const emailValid = checkValidEmail();
    const ageValid = checkValidAge();
    const dobValid = checkValidDob();
    const countryValid = checkValidCountry();
    const tosAccepted = checkAcceptedTos();

    if (!namesValid || !emailValid || !ageValid || !dobValid || !countryValid || !tosAccepted) {
        event.preventDefault();
    }
}


document.getElementById('userForm').addEventListener('submit', handleFormSubmission);


initializeForm();