document.addEventListener("DOMContentLoaded", function() {
    // Fetch the board data from the API
    fetch('https://users.iee.ihu.gr/~iee2020202/ADISE24_DreamTeam/blokus.php/boards/14')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Parse each string row in the board into an actual array
                const parsedBoard = data.board.map(row => JSON.parse(row));
                renderBoard(parsedBoard);
            } else {
                console.error('Error fetching board:', data.message);
            }
        })
        .catch(error => console.error('Error loading board data:', error));
});

// Function to render the board
function renderBoard(board) {
    const boardContainer = document.getElementById('blokus-board');
    boardContainer.innerHTML = ''; // Clear the container before rendering

    // Loop through each row and cell in the board
    board.forEach(row => {
        row.forEach(cell => {
            const cellDiv = document.createElement('div');
            cellDiv.classList.add('cell'); // Add the base cell class

            // Add the appropriate background color based on the cell value
            if (cell === 0) {
                cellDiv.classList.add('bg-white'); // White for 0
            } else if (cell === 1) {
                cellDiv.classList.add('bg-red'); // Red for 1
            }

            boardContainer.appendChild(cellDiv); // Add the cell to the board container
        });
    });
}