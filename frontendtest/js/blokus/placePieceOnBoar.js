function placePieceOnBoard(row, col, pieceShape, player) {
    for (let i = 0; i < pieceShape.length; i++) {
        for (let j = 0; j < pieceShape[i].length; j++) {
            if (pieceShape[i][j] === 1) {
                const targetRow = row + i;
                const targetCol = col + j;

                // Update the board state
                gameState.board[targetRow][targetCol] = player;
                console.log(`Placing part of the piece at (${targetRow}, ${targetCol})`);
            }
        }
    }
}