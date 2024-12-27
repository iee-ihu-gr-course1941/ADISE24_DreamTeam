document.addEventListener("DOMContentLoaded", function() {
    fetch('board.json')
      .then(response => response.json())
      .then(data => {
        renderBoard(data.board); 
      })
      .catch(error => console.error('Error loading board data:', error));
  });

  function renderBoard(board) {
    const boardContainer = document.getElementById('blokus-board');
    boardContainer.innerHTML = '';
    const boardSize = 20;

    board.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const cellDiv = document.createElement('div');
            cellDiv.classList.add('col', 'p-0', 'border', 'border-dark');
            cellDiv.style.height = '30px';
            cellDiv.style.width = '30px';
            switch(cell) {
                case 0: cellDiv.classList.add('bg-white'); break;
                case 1: cellDiv.classList.add('bg-danger'); break;
                case 2: cellDiv.classList.add('bg-primary'); break;
                case 3: cellDiv.classList.add('bg-success'); break;
                case 4: cellDiv.classList.add('bg-warning'); break;
                default: cellDiv.classList.add('bg-light'); break;
            }
            boardContainer.appendChild(cellDiv);
        });
    });
  }

  function testMoves() {
    const board = [
        // Example simplified board (same as above)
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        // Add more rows for full testing
    ];
    const playerPiece = [
        [ [0,0], [1,0], [2,0], [2,1] ] // Example of a simple L shape piece
    ];
    const playerColor = 1; // Example: Player 1
    const availableMoves = getAvailableMoves(board, playerPiece, playerColor);
    console.log('Available Moves:', availableMoves);
  }

  function getAvailableMoves(board, playerPiece, playerColor) {
    const moves = [];
    const boardSize = 20; // Typically 20x20 for a standard Blokus board

    // Helper function to check if a piece is within bounds
    function isInBounds(piece, row, col) {
        for (let i = 0; i < piece.length; i++) {
            const [r, c] = piece[i];
            if (r + row < 0 || r + row >= boardSize || c + col < 0 || c + col >= boardSize) {
                return false;
            }
        }
        return true;
    }

    // Helper function to check if the piece touches the player's pieces at corners
    function touchesOwnPiece(piece, row, col, playerColor) {
        let touches = false;
        for (let i = 0; i < piece.length; i++) {
            const [r, c] = piece[i];
            const boardRow = r + row;
            const boardCol = c + col;

            // Check the four corners around the piece
            const neighbors = [
                [boardRow - 1, boardCol], [boardRow + 1, boardCol], 
                [boardRow, boardCol - 1], [boardRow, boardCol + 1]
            ];

            for (let [nr, nc] of neighbors) {
                if (nr >= 0 && nr < boardSize && nc >= 0 && nc < boardSize) {
                    if (board[nr][nc] === playerColor) {
                        touches = true;
                    }
                }
            }
        }
        return touches;
    }

    // Helper function to check if a piece overlaps with another player's pieces
    function overlapsWithOpponent(piece, row, col, playerColor) {
        for (let i = 0; i < piece.length; i++) {
            const [r, c] = piece[i];
            const boardRow = r + row;
            const boardCol = c + col;

            if (board[boardRow][boardCol] !== 0 && board[boardRow][boardCol] !== playerColor) {
                return true;
            }
        }
        return false;
    }

    // Generate all rotations and reflections of a piece (4 rotations * 2 reflections = 8 variations)
    function getPieceVariations(piece) {
        const variations = [];
        let currentPiece = piece;

        // Add original piece
        variations.push(currentPiece);

        // Rotate 90 degrees, 180 degrees, and 270 degrees
        for (let i = 0; i < 3; i++) {
            currentPiece = rotatePiece(currentPiece);
            variations.push(currentPiece);
        }

        // Reflect horizontally and vertically
        for (let i = 0; i < variations.length; i++) {
            variations.push(reflectPiece(variations[i], 'horizontal'));
            variations.push(reflectPiece(variations[i], 'vertical'));
        }

        return variations;
    }

    // Rotate a piece 90 degrees
    function rotatePiece(piece) {
        return piece.map(([r, c]) => [-c, r]);
    }

    // Reflect a piece horizontally or vertically
    function reflectPiece(piece, direction) {
        return piece.map(([r, c]) => direction === 'horizontal' ? [r, -c] : [-r, c]);
    }

    // Check all possible positions on the board
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            // Generate all variations of the piece (rotations and reflections)
            const pieceVariations = getPieceVariations(playerPiece);

            pieceVariations.forEach(piece => {
                if (isInBounds(piece, row, col) && !overlapsWithOpponent(piece, row, col, playerColor) && touchesOwnPiece(piece, row, col, playerColor)) {
                    // If the move is valid, add it to the list of valid moves
                    moves.push({ row, col, piece });
                }
            });
        }
    }

    return moves;
}
