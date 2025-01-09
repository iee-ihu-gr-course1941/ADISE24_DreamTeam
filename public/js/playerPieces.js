export async function fetchPlayerPieces(gameId, playerId) {
    try {
        const response = await fetch(`${base_url}/games/${gameId}/players/${playerId}/pieces`);
        const data = await response.json();

        if (!data.success) {
            console.error('API Error:', data.message || 'Unknown error');
            throw new Error('Failed to fetch player pieces');
        }

        if (data.pieces.length > 0) {
            // Parse piece_data JSON string from the first piece object
            return JSON.parse(data.pieces[0].piece_data); // Array of pieces
        } else {
            console.warn(`No pieces found for player ${playerId} in game ${gameId}`);
            return [];
        }
    } catch (error) {
        console.error('Error fetching player pieces:', error);
        return [];
    }
}
