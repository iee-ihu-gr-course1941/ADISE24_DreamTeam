document.addEventListener("DOMContentLoaded", function() {
    // Fetch the JSON data from the server
    fetch('https://users.iee.ihu.gr/~iee2020202/ADISE24_DreamTeam/blokus.php/boards/1') // Change the URL with the appropriate board_id
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Parse each string in the board array into an actual array
                const parsedBoard = data.board.map(row => JSON.parse(row));
                renderBoard(parsedBoard); // Render the board using the parsed data
            } else {
                console.error('Error fetching board:', data.message);
            }
        })
        .catch(error => console.error('Error loading board data:', error));
});

// Function to render the Blokus board
function renderBoard(board) {
    const boardContainer = document.getElementById('blokus-board'); // Get the container for the board
    boardContainer.innerHTML = ''; // Clear the container before rendering the new board

    // Loop through the rows and columns of the board
    board.forEach((row, rowIndex) => {
        const rowDiv = document.createElement('div'); // Create a row container
        rowDiv.classList.add('d-flex'); // Use Bootstrap flexbox for rows

        row.forEach((cell, colIndex) => {
            const cellDiv = document.createElement('div');
            cellDiv.classList.add('col', 'p-0'); // Use Bootstrap columns for the grid, no padding

            // Apply the background color based on the cell value
            switch (cell) {
                case 0:
                    cellDiv.classList.add('bg-white'); // Empty space
                    break;
                case 1:
                    cellDiv.classList.add('bg-danger'); // Player 1 (Red)
                    break;
                case 2:
                    cellDiv.classList.add('bg-primary'); // Player 2 (Blue)
                    break;
                case 3:
                    cellDiv.classList.add('bg-success'); // Player 3 (Green)
                    break;
                case 4:
                    cellDiv.classList.add('bg-warning'); // Player 4 (Yellow)
                    break;
                case 5:
                    cellDiv.classList.add('bg-light-danger'); // Light Red
                    break;
                case 6:
                    cellDiv.classList.add('bg-light-primary'); // Light Blue
                    break;
                case 7:
                    cellDiv.classList.add('bg-light-success'); // Light Green
                    break;
                case 8:
                    cellDiv.classList.add('bg-light-warning'); // Light Yellow
                    break;
                default:
                    cellDiv.classList.add('bg-white'); // Default to empty if the value is unknown
            }

            // Apply a black border for each cell
            cellDiv.classList.add('border', 'border-1', 'border-dark');

            // Set the fixed height for the cell (use Bootstrap utility class)
            cellDiv.style.height = '30px';

            rowDiv.appendChild(cellDiv); // Add the cell to the row
        });

        boardContainer.appendChild(rowDiv); // Add the row to the container
    });
}
