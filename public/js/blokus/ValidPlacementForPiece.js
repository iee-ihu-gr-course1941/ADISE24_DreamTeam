
function isValidPlacementForPiece(row, col, pieceShape, player) {
    const startingCorners = {
        1: [0, 0],     // Top-left corner for Player 1
        2: [0, 19],    // Top-right corner for Player 2
        3: [19, 19],   // Bottom-right corner for Player 3
        4: [19, 0]     // Bottom-left corner for Player 4
    };

    const [startRow, startCol] = startingCorners[player];

    let hasDiagonalConnection = false; // For diagonal rule enforcement
    let isFirstMove = true; // Assume it's the first move

    // Check if the player has any pieces already placed on the board
    for (let r = 0; r < 20; r++) {
        for (let c = 0; c < 20; c++) {
            if (gameState.board[r][c] === player) {
                isFirstMove = false;
                break;
            }
        }
    }

    for (let i = 0; i < pieceShape.length; i++) {
        for (let j = 0; j < pieceShape[i].length; j++) {
            if (pieceShape[i][j] === 1) {
                const targetRow = row + i;
                const targetCol = col + j;

                // Bounds check
                if (targetRow < 0 || targetRow >= 20 || targetCol < 0 || targetCol >= 20) {
                    console.log('Out of bounds');
                    return false;
                }

                // Overlap check
                if (gameState.board[targetRow][targetCol] !== null) {
                    console.log('Cell already occupied');
                    return false;
                }

                // For first move, ensure it starts in the assigned corner
                if (isFirstMove) {
                    if (targetRow === startRow && targetCol === startCol) {
                        continue; // Allow placement in the starting corner
                    } else {
                        console.log('First move must start in the assigned corner');
                        return false;
                    }
                }

                // Diagonal connection check for subsequent moves
                const diagonalDirections = [
                    [-1, -1], [-1, 1], [1, -1], [1, 1]
                ];

                const isDiagonalConnected = diagonalDirections.some(([dr, dc]) => {
                    const r = targetRow + dr;
                    const c = targetCol + dc;
                    return (
                        r >= 0 &&
                        r < 20 &&
                        c >= 0 &&
                        c < 20 &&
                        gameState.board[r][c] === player
                    );
                });

                hasDiagonalConnection = hasDiagonalConnection || isDiagonalConnected;

                // Edge-touching check
                const edgeDirections = [
                    [-1, 0], [1, 0], [0, -1], [0, 1]
                ];

                const hasEdgeTouch = edgeDirections.some(([dr, dc]) => {
                    const r = targetRow + dr;
                    const c = targetCol + dc;
                    return (
                        r >= 0 &&
                        r < 20 &&
                        c >= 0 &&
                        c < 20 &&
                        gameState.board[r][c] === player
                    );
                });

                if (hasEdgeTouch) {
                    console.log('Pieces cannot touch edge-to-edge');
                    return false;
                }
            }
        }
    }

    // Ensure at least one diagonal connection for subsequent moves
    if (!isFirstMove && !hasDiagonalConnection) {
        console.log('No diagonal connection for subsequent move');
        return false;
    }

    return true; // Valid placement
}

