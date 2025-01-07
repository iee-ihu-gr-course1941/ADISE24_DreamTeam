function renderPlayerPieces() {
    piecesContainer.innerHTML = ''; // Clear previous pieces
    const player = gameState.players[gameState.turn];

    player.pieces.forEach(piece => {
        const pieceData = pieceShapes[piece];
        const pieceElement = document.createElement('div');
        pieceElement.classList.add('player-piece');
        pieceElement.dataset.piece = piece; // Add data attribute

        // Render shape
        pieceData.forEach(row => {
            const rowElement = document.createElement('div');
            rowElement.classList.add('piece-row');
            row.forEach(cell => {
                const cellElement = document.createElement('div');
                cellElement.classList.add('piece-cell');
                if (cell === 1) {
                    cellElement.style.backgroundColor = player.color;
                }
                rowElement.appendChild(cellElement);
            });
            pieceElement.appendChild(rowElement);
        });

        pieceElement.addEventListener('click', () => selectPiece(piece));
        piecesContainer.appendChild(pieceElement);
    });
}