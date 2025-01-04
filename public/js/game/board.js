function renderBoard(board) {
    const boardContainer = document.getElementById('blokus-board'); // Get the container for the board
    boardContainer.innerHTML = ''; // Clear the container before rendering the new board

    // Loop through the rows and columns of the board
    board.forEach((row) => {
        const rowDiv = document.createElement('div'); // Create a row container
        rowDiv.classList.add('d-flex', 'justify-content-center'); // Use Bootstrap flexbox for rows

        row.forEach((cell) => {
            const cellDiv = document.createElement('div');
            cellDiv.classList.add('cell'); // Add a CSS class for consistent styling

            // Apply the background color based on the cell value
            switch (cell) {
                case 0:
                    cellDiv.style.backgroundColor = 'white'; // Empty space
                    break;
                case 1:
                    cellDiv.style.backgroundColor = 'red'; // Player 1
                    break;
                case 2:
                    cellDiv.style.backgroundColor = 'blue'; // Player 2
                    break;
                case 3:
                    cellDiv.style.backgroundColor = 'green'; // Player 3
                    break;
                case 4:
                    cellDiv.style.backgroundColor = 'yellow'; // Player 4
                    break;
                default:
                    cellDiv.style.backgroundColor = 'white'; // Default empty
            }

            // Style the grid cell
            cellDiv.style.border = '1px solid black';
            cellDiv.style.width = '30px'; // Set fixed width
            cellDiv.style.height = '30px'; // Set fixed height

            rowDiv.appendChild(cellDiv); // Add the cell to the row
        });

        boardContainer.appendChild(rowDiv); // Add the row to the container
    });
}
