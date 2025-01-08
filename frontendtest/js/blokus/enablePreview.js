function enablePreview() {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.addEventListener('mouseover', event => {
            const row = parseInt(cell.dataset.row, 10);
            const col = parseInt(cell.dataset.col, 10);
            previewPiecePlacement(row, col);
        });

        cell.addEventListener('mouseout', () => {
            removePreview();
        });
    });
}

function previewPiecePlacement(row, col) {
    if (!selectedPiece) return;

    const pieceShape = pieceShapes[selectedPiece];
    const player = gameState.turn;

    pieceShape.forEach((pieceRow, i) => {
        pieceRow.forEach((cellValue, j) => {
            if (cellValue === 1) {
                const targetRow = row + i;
                const targetCol = col + j;

                if (
                    targetRow >= 0 && targetRow < 20 &&
                    targetCol >= 0 && targetCol < 20
                ) {
                    const cell = document.querySelector(
                        `.cell[data-row="${targetRow}"][data-col="${targetCol}"]`
                    );

                    if (cell) {
                        if (isValidPlacementForPiece(row, col, pieceShape, player)) {
                            cell.classList.add('preview-valid');
                        } else {
                            cell.classList.add('preview-invalid');
                        }
                    }
                }
            }
        });
    });
}