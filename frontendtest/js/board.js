document.addEventListener("DOMContentLoaded", function() {
    // Fetch the JSON data from the server
    fetch('json/board.json') // Change this to your actual JSON file path
      .then(response => response.json())
      .then(data => {
        renderBoard(data.board); // Render the board using the fetched data
      })
      .catch(error => console.error('Error loading board data:', error));
});

// Function to render the Blokus board
function renderBoard(board) {
    const boardContainer = document.getElementById('blokus-board'); // Get the container for the board
    boardContainer.innerHTML = ''; // Clear the container before rendering the new board

    // Loop through the rows and columns of the board
    board.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const cellDiv = document.createElement('div');
            cellDiv.classList.add('col', 'p-0'); // Use Bootstrap columns for the grid, no padding

            // Apply the background color based on the cell value
            switch(cell) {
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

            boardContainer.appendChild(cellDiv); // Add the cell to the container
        });
    });
}
