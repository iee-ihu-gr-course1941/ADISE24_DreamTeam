function isValidPlacement(row, col) {
    const player = gameState.turn;

    // Define starting corners for each player
    const startingCorners = {
        1: [0, 0],      // Top-left corner for Player 1 (Red)
        2: [0, 19],     // Top-right corner for Player 2 (Green)
        3: [19, 19],    // Bottom-right corner for Player 3 (Blue)
        4: [19, 0]      // Bottom-left corner for Player 4 (Yellow)
    };

    const [startRow, startCol] = startingCorners[player];

    // Check if this is the player's first move
    const isFirstMove = !gameState.board.flat().includes(player);

    if (isFirstMove) {
        // First move must be placed in the player's starting corner
        return row === startRow && col === startCol;
    }

    // For subsequent moves, enforce diagonal connection rules
    const directions = [
        [-1, -1], [-1, 1], [1, -1], [1, 1] // Diagonal directions
    ];

    const hasDiagonalConnection = directions.some(([dr, dc]) => {
        const r = row + dr;
        const c = col + dc;
        return (
            r >= 0 &&
            r < 20 &&
            c >= 0 &&
            c < 20 &&
            gameState.board[r][c] === player
        );
    });

    if (!hasDiagonalConnection) return false;

    // Prevent edge touching
    const edgeDirections = [
        [-1, 0], [1, 0], [0, -1], [0, 1] // Adjacent directions (edges)
    ];

    const hasEdgeTouch = edgeDirections.some(([dr, dc]) => {
        const r = row + dr;
        const c = col + dc;
        return (
            r >= 0 &&
            r < 20 &&
            c >= 0 &&
            c < 20 &&
            gameState.board[r][c] === player
        );
    });

    return !hasEdgeTouch; // Valid if no edge touching
}
