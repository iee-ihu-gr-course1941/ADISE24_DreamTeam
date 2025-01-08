export async function fetchPlayerPieces(gameId, playerId) {
    try {
        const response = await fetch(`https://users.iee.ihu.gr/~iee2020202/ADISE24_DreamTeam/blokus.php/games/${gameId}/players/${playerId}/pieces`);
        const data = await response.json();

        if (!data.success) {
            throw new Error('Failed to fetch player pieces');
        }

        return data.pieces;
    } catch (error) {
        console.error('Error fetching player pieces:', error);
        return [];
    }
}
