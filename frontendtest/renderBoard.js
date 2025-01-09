/**
 * Renders the game board on the screen.
 *
 * @param {HTMLElement} boardElement - The DOM element where the board will be rendered.
 * @param {Object} gameState - The current state of the game, including the board layout.
 * @param {Function} handleCellClick - A callback function triggered when a cell is clicked.
 * @param {Function} getPlayerColor - A function that returns the color for a player based on their ID.
 */
export function renderBoard(boardElement, gameState, handleCellClick, getPlayerColor) {
    // Clear the previous board
    boardElement.innerHTML = '';

    // Loop through the board rows and columns
    for (let row = 0; row < 20; row++) {
        for (let col = 0; col < 20; col++) {
            // Create a new cell
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;

            // Check if the cell is occupied and assign color
            if (gameState.board[row][col]) {
                cell.classList.add('occupied');
                cell.style.backgroundColor = getPlayerColor(gameState.board[row][col]);
            }

            // Add click event listener for cell
            cell.addEventListener('click', () => handleCellClick(row, col));

            // Append the cell to the board
            boardElement.appendChild(cell);
        }
    }
}
