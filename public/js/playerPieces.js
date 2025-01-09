export async function fetchPlayerPieces(gameId, playerId) {
    try {
        const response = await fetch(
            `https://users.iee.ihu.gr/~iee2020202/ADISE24_DreamTeam/blokus.php/games/${gameId}/players/${playerId}/pieces`
        );
        const data = await response.json();

        if (!data.success) {
            throw new Error('Failed to fetch player pieces');
        }

        if (data.pieces.length > 0) {
            // Parse piece_data, which is a JSON string
            return JSON.parse(data.pieces[0].piece_data); // Return the array of pieces
        } else {
            console.warn('No pieces found for player:', playerId);
            return [];
        }
    } catch (error) {
        console.error('Error fetching player pieces:', error);
        return [];
    }
}
