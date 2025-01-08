function initializeGame() {
    renderBoard();
    renderPlayerPieces();
    updateTurnDisplay();
    updateScores();
    enablePreview(); // Allow players to preview pieces before placement
}

