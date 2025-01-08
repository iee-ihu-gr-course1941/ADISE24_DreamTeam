export async function placePiece(gameId, playerId, piece, position) {
    try {
        const response = await fetch(`https://users.iee.ihu.gr/~iee2020202/ADISE24_DreamTeam/blokus.php/games/${gameId}/place-piece`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                playerId,
                piece,
                position
            })
        });

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message || 'Failed to place piece');
        }

        return true;
    } catch (error) {
        console.error('Error placing piece:', error);
        return false;
    }
}
