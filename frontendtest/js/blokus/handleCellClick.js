function handleCellClick(row, col) {
    if (!selectedPiece) {
        console.error('Select a piece first!');
        return;
    }

    const pieceShape = pieceShapes[selectedPiece];
    const player = gameState.turn;

    // Validate placement
    const isValid = isValidPlacementForPiece(row, col, pieceShape, player);

    if (!isValid) {
        console.log('Invalid placement! Highlighting invalid cells.');
        highlightInvalidPlacement(row, col, pieceShape);
        return; // Skip placing the piece
    }

    console.log('Valid placement! Placing the piece.');

    // Place the piece on the board
    placePieceOnBoard(row, col, pieceShape, player);
    renderBoard();

    // Remove the used piece from the player's inventory
    const currentPlayer = gameState.players[player];
    currentPlayer.pieces = currentPlayer.pieces.filter(p => p !== selectedPiece);
    selectedPiece = null;

    // Move to the next turn
    gameState.turn = gameState.turn % 4 + 1;
    updateTurnDisplay();
    updateScores(); // Recalculate scores
    renderPlayerPieces();
}
