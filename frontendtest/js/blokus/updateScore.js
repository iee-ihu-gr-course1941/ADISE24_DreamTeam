
function updateScores() {
    const scores = {};

    for (const playerId in gameState.players) {
        const player = gameState.players[playerId];
        scores[playerId] = player.pieces.reduce((total, piece) => {
            const pieceShape = pieceShapes[piece];
            const pieceScore = pieceShape.flat().filter(cell => cell === 1).length; // Count filled cells
            return total + pieceScore;
        }, 0);
    }

    // Update the score display
    const scoreDisplay = document.getElementById('scoreDisplay');
    scoreDisplay.innerHTML = '';

    for (const playerId in scores) {
        const scoreElement = document.createElement('div');
        scoreElement.textContent = `Player ${playerId}: ${scores[playerId]} points`;
        scoreElement.style.color = gameState.players[playerId].color; // Use player color
        scoreDisplay.appendChild(scoreElement);
    }
}



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
