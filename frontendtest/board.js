function renderBoard() {
    boardElement.innerHTML = ''; // Clear previous board

    for (let row = 0; row < 20; row++) {
        for (let col = 0; col < 20; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;

            // Check if the cell is occupied
            if (gameState.board[row][col]) {
                cell.classList.add('occupied');
                cell.style.backgroundColor = getPlayerColor(gameState.board[row][col]);
            }

            cell.addEventListener('click', () => handleCellClick(row, col));
            boardElement.appendChild(cell);
        }
    }
}