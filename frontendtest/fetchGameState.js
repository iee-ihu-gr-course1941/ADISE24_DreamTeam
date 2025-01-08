/**
 * Fetches the game state from a specified JSON file.
 *
 * @param {string} url - The URL or path to the JSON file.
 * @returns {Promise<Object>} - A promise that resolves to the game state object.
 */
export async function fetchGameState(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const gameState = await response.json();
        return gameState;
    } catch (error) {
        console.error(`Failed to fetch game state: ${error.message}`);
        throw error; // Re-throw the error to handle it in the calling code
    }
}
