function highlightInvalidPlacement(row, col, pieceShape) {
    for (let i = 0; i < pieceShape.length; i++) {
        for (let j = 0; j < pieceShape[i].length; j++) {
            if (pieceShape[i][j] === 1) {
                const targetRow = row + i;
                const targetCol = col + j;

                // Check if the cell is within bounds
                if (targetRow >= 0 && targetRow < 20 && targetCol >= 0 && targetCol < 20) {
                    const cell = document.querySelector(
                        `.cell[data-row="${targetRow}"][data-col="${targetCol}"]`
                    );
                    if (cell) {
                        cell.classList.add('invalid-placement');
                        setTimeout(() => cell.classList.remove('invalid-placement'), 1000); // Remove highlight after 1 second
                    }
                }
            }
        }
    }
}


