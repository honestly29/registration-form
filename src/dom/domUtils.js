/**
 * Sets or clears error message for a specific field.
 * 
 * @param {string} fieldId - The HTML ID of the input field 
 * @param {string} [message=''] - The error message to display. If empty, it clears the error message.
 */
export function setErrorMessage(fieldId, message = '') {
    const errorMessage = document.getElementById(`${fieldId}Error`);
    errorMessage.innerText = message;
}


/**
 * Populates country dropdown with country names.
 * 
 * @param {Array<string>} data - Array of country names to populate in the dropdown.
 * @returns 
 */
export function populateCountryDropdown(data) {
    const countrySelect = document.getElementById('country');
    if (!countrySelect) return;

    data.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        countrySelect.appendChild(option);
    });
}
