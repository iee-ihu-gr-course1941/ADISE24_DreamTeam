export async function fetchGameState(gameId) {
    try {
        const response = await fetch(`https://users.iee.ihu.gr/~iee2020202/ADISE24_DreamTeam/blokus.php/games/${gameId}`);
        const data = await response.json();

        if (!data.success) {
            throw new Error('Failed to fetch game state');
        }

        return data.gameState;
    } catch (error) {
        console.error('Error fetching game state:', error);
        return null;
    }
}
