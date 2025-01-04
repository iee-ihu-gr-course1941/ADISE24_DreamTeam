// Function to extract the lobby_id from the URL
function getLobbyIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('lobby_id'); // Extract the 'lobby_id' from the query string
}

// Function to fetch and display the board for the given lobby_id
async function fetchAndRenderBoard(lobbyId) {
    const boardContainer = document.getElementById('blokus-board');
    boardContainer.innerHTML = '<p class="text-center">Loading board...</p>'; // Show loading message

    try {
        // Fetch the board data from the server
        const response = await fetch(`https://users.iee.ihu.gr/~iee2020202/ADISE24_DreamTeam/blokus.php/boards/${lobbyId}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch board data');
        }

        const data = await response.json(); // Parse JSON data
        boardContainer.innerHTML = ''; // Clear loading message

        if (!data.success) {
            boardContainer.innerHTML = '<p class="text-center text-muted">Board not found.</p>';
            return;
        }

        // Parse the board rows (strings) into arrays
        const board = data.board.map(row => JSON.parse(row));
        renderBoard(board); // Render the board
    } catch (error) {
        console.error(error);
        boardContainer.innerHTML = '<p class="text-center text-danger">Failed to load board. Please try again later.</p>';
    }
}

// Function to render the Blokus board
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

// On page load, extract the lobby_id and fetch the board
document.addEventListener('DOMContentLoaded', () => {
    const lobbyId = getLobbyIdFromUrl(); // Get lobby_id from the URL
    if (lobbyId) {
        fetchAndRenderBoard(lobbyId); // Fetch and render the board
    } else {
        document.getElementById('blokus-board').innerHTML = '<p class="text-center text-danger">Invalid lobby ID.</p>';
    }
});
