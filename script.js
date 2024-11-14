// ----- REST countries API ----- //

/**
 * Fetches country list from REST Countries API and populates the country dropdown
 */
async function populateCountryDropdown() {
    const countrySelect = document.getElementById('country');

    try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name');
        const data = await response.json();

        // sort countries alphabetically by common name
        data.sort((a, b) => a.name.common.localeCompare(b.name.common));

        // populate dropdown with country name
        data.forEach(country => {
            const option = document.createElement('option');
            option.value = country.name.common;
            option.textContent = country.name.common;
            countrySelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching country data:', error);
        setErrorMessage('country', 'Unable to load country list, showing most common countries');

        // call backup function
        backupPopulateCountryDropdown();
    }
}

/**
 * Backup function to populate the country dropdown with common countries.
 */
function backupPopulateCountryDropdown() {
    const countrySelect = document.getElementById('country');
    const commonCountries = [
        'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France', 'India', 'China', 'Brazil', 'Japan', 'South Africa'
    ];

    // populate country dropdown with backup country list
    commonCountries.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        countrySelect.appendChild(option);
    });
}

populateCountryDropdown();


// ----- Helpers ----- // 

/**
 * Sets or clears error message for a field.
 * 
 * @param {string} fieldId - The html ID of the input field 
 * @param {string} [message] - The error message to display  
 */
function setErrorMessage(fieldId, message = '') {
    const errorMessage = document.getElementById(`${fieldId}Error`);
    errorMessage.innerText = message;
}


/**
 * 
 * @param {string} fieldId - The html ID of the input field.
 * @returns {boolean} - True if the field is empty, false otherwise.
 */
function isFieldEmpty(fieldId) {
    const field = document.getElementById(fieldId);
    return field.value.trim() === '';
}


/**
 * Validates a field against a given regex and sets an error message if it fails.
 * 
 * @param {string} fieldId - The html ID of the input field.
 * @param {RegExp} regex - The regular expression to test the field value.
 * @param {string} errorMessage - The error message to display if validation fails.
 * @returns {boolean} - True if the field is valid, false otherwise.
 */
function fieldRegexValidation(fieldId, regex, errorMessage) {
    if (isFieldEmpty(fieldId)) {
        return true; // skip validation if field is empty
    }

    const field = document.getElementById(fieldId);

    if (!regex.test(field.value.trim())) {
        setErrorMessage(fieldId, errorMessage);
        return false;
    }
    setErrorMessage(fieldId); // clear any previous error
    return true;
}


const fieldDisplayNames = {
    'fname': 'First Name',
    'lname': 'Last Name',
    'email': 'Email Address',
    'age': 'Age',
    'dob': 'Date of Birth',
};


// Check that all input boxes are filled in
function checkAllFieldsFilled() {
    let validForm = true;
    const formFields = document.querySelectorAll('#userForm input[required]');

    formFields.forEach(field => {
        const displayName = fieldDisplayNames[field.id];
        if (isFieldEmpty(field.id)) {
            setErrorMessage(field.id, `${displayName} is required`);
            validForm = false;
        } else {
            setErrorMessage(field.id);
        }
    });
    return validForm;
}


function checkValidNames() {
    let validNames = true;
    const nameRegex = /^[a-zA-Z\s'-]{1,30}$/; // allows a-z, A-Z, whitespace, apostrophes and hyphens within a range of 1-30 chars
    const nameFields = ['fname', 'lname'];

    nameFields.forEach(fieldId => {
        const displayName = fieldDisplayNames[fieldId];
        if (!fieldRegexValidation(
            fieldId,
            nameRegex,
            `${displayName} must only contain letters, apostrophes, hyphens and be no more than 30 characters`
        )) {
            validNames = false;
        }
    });
    return validNames;
}


function checkValidEmail() {
    const emailRegex = /^[a-zA-Z0-9](\.?[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-])*@[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
    return fieldRegexValidation('email', emailRegex, 'Invalid email address');
}


function checkValidAge() {
    const ageRegex = /^(?:0|[1-9][0-9]?|1[01][0-9]|120)$/; // allows whole numbers between 0-120
    return fieldRegexValidation('age', ageRegex, 'Age must be a whole number between 0 and 120 years old');
}


function checkValidDob() {
    let validDob = true;
    const dobField = document.getElementById('dob');

    // convert DoB input to Date object
    const dobValue = new Date(dobField.value);
    const currentDate = new Date();

    if (isFieldEmpty('dob')) {
        return true;
    }

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


// Check that a country is selected.
function checkValidCountry() {
    const countryField = document.getElementById('country');
    if (countryField.value === '') {
        setErrorMessage('country', 'Please select a country');
        return false;
    }
    setErrorMessage('country');
    return true;
}


function checkAcceptedTos() {
    const tosCheckbox = document.getElementById('tos');

    if (!tosCheckbox.checked) {
        setErrorMessage('tos', 'You must agree to the Terms of Service to continue');
        return false;
    }
    setErrorMessage('tos');
    return true;
}


// Event listener for form submission
document.getElementById('userForm').addEventListener('submit', function(event) {
    const allFieldsFilled = checkAllFieldsFilled();
    const namesValid = checkValidNames();
    const emailValid = checkValidEmail();
    const ageValid = checkValidAge();
    const dobValid = checkValidDob();
    const countryValid = checkValidCountry();
    const tosAccepted = checkAcceptedTos();

    // prevent form submission if there are any errors
    if (!allFieldsFilled || !namesValid || !emailValid || !ageValid || !dobValid || !countryValid || !tosAccepted) {
        event.preventDefault();
    }
});




/* Comments
- trim all values automatically to remove leading and trailing white space

- make dob check for exact day and month when calculating age

- country unit test doesn't work for two-name countries
*/