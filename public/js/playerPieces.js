export async function fetchPlayerPieces(gameId, playerId) {
    try {
        const response = await fetch(`https://users.iee.ihu.gr/~iee2020202/ADISE24_DreamTeam/blokus.php/games/${gameId}/players/${playerId}/pieces`);
        const data = await response.json();

        console.log('API Response:', data); // Log the API response

        if (!data.success) {
            throw new Error('Failed to fetch player pieces');
        }

        // Parse the piece_data field from the API response
        if (data.pieces.length > 0) {
            return JSON.parse(data.pieces[0].piece_data); // Returns the array of pieces
        } else {
            return [];
        }
    } catch (error) {
        console.error('Error fetching player pieces:', error);
        return [];
    }
}
