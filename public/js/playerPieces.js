/*export async function fetchPlayerPieces(gameId, playerId) {
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
}*/ 
const pieceShapes = {
    P1: [[1]],
    P2: [[1, 1]],
    P3: [[1, 1, 1]],
    P4: [[1, 1, 1, 1]],
    P5: [[1, 1, 1, 1, 1]],
    P6: [[1, 1], [1, 1]],
    P7: [[1, 1, 1], [0, 0, 1]],
    P8: [[1, 1, 1], [0, 1, 0]],
    P9: [[1, 1], [1, 0], [1, 0]],
    P10: [[1, 1, 1], [1, 0, 0]],
    P11: [[1, 1, 1], [0, 1, 1]],
    P12: [[1, 1, 1], [1, 1, 0]],
    P13: [[1, 1, 0], [0, 1, 1]],
    P14: [[1, 1], [1, 1], [1, 0]],
    P15: [[1, 1], [1, 0], [1, 1]],
    P16: [[1, 1, 1], [1, 0, 1]],
    P17: [[1, 1, 1], [1, 0, 0], [1, 0, 0]],
    P18: [[1, 1, 1], [0, 1, 0], [0, 1, 0]],
    P19: [[1, 1, 1, 1], [0, 1, 0, 0]],
    P20: [[1, 1, 1, 1], [1, 0, 0, 0]],
    P21: [[1, 1, 1, 1], [0, 0, 1, 0]]
};

// Map each player ID to their pieces
const playerPieces = {
    1: Object.keys(pieceShapes), // Example: Player 1 starts with all pieces
    2: Object.keys(pieceShapes), // Example: Player 2 starts with all pieces
    // Add additional players as needed
};

export async function fetchPlayerPieces(playerId) {
    try {
        // Check if player exists in the local pieces map
        if (!playerPieces[playerId]) {
            throw new Error(`Player ${playerId} does not exist.`);
        }

        // Return the pieces for the player
        return playerPieces[playerId];
    } catch (error) {
        console.error('Error fetching player pieces:', error);
        return [];
    }
}

