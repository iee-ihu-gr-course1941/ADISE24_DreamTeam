// Fetch the game state from the API
function fetchGameState(gameId) {
    console.log(`Fetching game state for Game ID: ${gameId}`); // Debugging info
    $.ajax({
       url: `./api/gameManager.php?action=getGameState&gameId=${gameId}`, // Adjust the URL based on your folder structure
       // url: `http://139.138.206.194/ADISE24_DreamTeam/api/gameManager.php?action=getGameState&gameId=${gameId}`, // this need to be fixed 
        method: 'GET',
        success: function(response) {
            if (!response.error) {
                renderBoard(response.board_state); // Render the board state
                renderTurn(response.current_turn); // Render the current turn
            } else {
                alert('Error fetching game state: ' + response.error);
            }
        },
        error: function() {
            alert('An error occurred while fetching the game state.');
        }
    });
}

function renderBoard(board) {
    const boardContainer = $('#board');
    boardContainer.empty(); // Clear previous board

    // Iterate over the board state to render each cell
    board.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const div = $('<div></div>');
            div.addClass('cell ' + getCellClass(cell)); // Add class based on the cell value
            div.data('x', rowIndex);  // Store the x-coordinate (row)
            div.data('y', colIndex); // Store the y-coordinate (column)
            boardContainer.append(div);
        });
    });
}

function getCellClass(cell) {
    switch (cell) {
        case 0: return 'W'; // For empty cells
        case 1: return 'R';
        case 2: return 'B';
        case 3: return 'G';
        case 4: return 'Y';
        default: return 'W';
    }
}



// Render the current turn
function renderTurn(currentTurn) {
    $('#current-turn').text(`It's Player ${currentTurn}'s turn`); // Update the turn display
}

// Place a block and update the game state
function placeBlock(gameId, x, y, blockType) {
    $.ajax({
        url: '../api/gameManager.php',
        method: 'POST',
        data: {
            action: 'placeBlock',
            gameId: gameId,
            x: x,
            y: y,
            block: blockType
        },
        success: function(response) {
            if (!response.error) {
                fetchGameState(gameId); // Re-fetch game state after placing the block
            } else {
                alert('Error placing block: ' + response.error);
            }
        },
        error: function() {
            alert('An error occurred while placing the block.');
        }
    });
}

// Periodically fetch the game state every 2 seconds
$(document).ready(function() {
    const gameId = 1; // Replace with the actual game ID

    fetchGameState(gameId); // Initial fetch to display the game state
    setInterval(() => fetchGameState(gameId), 500); // Fetch updates every 0.5 seconds

    // Example event listener for placing a block
    $('#board').on('click', '.cell', function() {
        const x = $(this).data('x'); // Assuming cells have data attributes for x and y
        const y = $(this).data('y');
        const blockType = 'blue'; // Replace with the desired block type

        placeBlock(gameId, x, y, blockType);
    });
});
