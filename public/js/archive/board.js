// Fetch the board data from the API
function fetchBoard() {
    $.ajax({
        url: './api/board.php', // Adjust the URL based on your folder structure
        method: 'GET',
        success: function(response) {
            if (response.success) {
                renderBoard(response.board);
            } else {
                alert('Error fetching board: ' + response.error);
            }
        },
        error: function() {
            alert('An error occurred while fetching the board.');
        }
    });
}

// Render the board
function renderBoard(board) {
    const boardContainer = $('#board');
    boardContainer.empty(); // Clear previous board

    board.forEach(cell => {
        const div = $('<div></div>');
        div.addClass('cell ' + cell.block); // Add class for cell color
        div.text(`${cell.x},${cell.y}`); // Optionally show coordinates
        boardContainer.append(div);
    });
}

// Render the board
function renderBoard(boardState) {
    const boardContainer = $('#board');
    boardContainer.empty(); // Clear the previous board

    boardState.forEach(row => {
        row.forEach(cell => {
            const div = $('<div></div>');

             // Assign a class based on the cell value
             switch (cell.value) {
                case 0:
                    div.addClass('cell W'); // White
                    break;
                case 1:
                    div.addClass('cell R'); // Red
                    break;
                case 2:
                    div.addClass('cell B'); // Blue
                    break;
                case 3:
                    div.addClass('cell G'); // Green
                    break;
                case 4:
                    div.addClass('cell Y'); // Yellow
                    break;
                default:
                    div.addClass('cell empty'); // Default if value doesn't match
                    break;
            }

            //div.addClass('cell ' + cell.block); // Add class for block type or empty
            //div.text(`${cell.x},${cell.y}`); // Optionally show coordinates
            boardContainer.append(div);
        });
    });
}

// Fetch the current turn info
function fetchTurn() {
    $.ajax({
        url: './api/turn.php', // Endpoint to get the current turn status
        method: 'GET',
        success: function(response) {
            if (response.success) {
                $('#current-turn').text(`It's ${response.username}'s turn`); // Display current player
            } else {
                alert('Error fetching turn: ' + response.error);
            }
        },
        error: function() {
            alert('An error occurred while fetching the turn.');
        }
    });
}

// Update the board when a player makes a move
function makeMove(x, y) {
    $.ajax({
        url: './api/updateBoard.php',
        method: 'POST',
        data: { x: x, y: y },
        success: function(response) {
            if (response.success) {
                fetchBoard(); // Re-fetch the board after move
                fetchTurn();  // Re-fetch the turn status
            } else {
                alert('Error making move: ' + response.error);
            }
        },
        error: function() {
            alert('An error occurred while making the move.');
        }
    });
}





// Periodically fetch the board data every 2 seconds (or any interval)
$(document).ready(function() {
    fetchBoard(); // Initial fetch to display the board
    setInterval(fetchBoard, 500); // Fetch every 2 seconds to check for updates
});