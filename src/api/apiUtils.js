/**
 * Fetches a list of country names from the REST Countries API and sorts them alphabetically.
 * 
 * @async
 * @returns {Promise<Array<string>|null>} - A sorted array of country names, or null if an error occurs.
 */
export async function fetchCountryData() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name');
        const data = await response.json();
        return data.map(country => country.name.common).sort();
    } catch (error) {
        console.error('Error fetching country data:', error);
        return null;
    }
}