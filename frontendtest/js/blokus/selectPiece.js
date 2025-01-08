function selectPiece(piece) {
    // Remove the highlight from any previously selected piece
    document.querySelectorAll('.player-piece').forEach(pieceElement => {
        pieceElement.classList.remove('selected-piece');
    });

    // Highlight the currently selected piece
    const pieceElement = document.querySelector(`[data-piece="${piece}"]`);
    if (pieceElement) {
        pieceElement.classList.add('selected-piece');
    }

    selectedPiece = piece;
    console.log(`Selected piece: ${piece}`); // Keep this for debugging
}

