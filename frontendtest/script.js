// Fetch game state from JSON file
fetch('gameState.json')
    .then(response => response.json())
    .then(gameState => {
        const boardElement = document.getElementById('board');
        const piecesContainer = document.getElementById('piecesContainer');
        let selectedPiece = null;

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


        function enablePreview() {
            document.querySelectorAll('.cell').forEach(cell => {
                cell.addEventListener('mouseover', event => {
                    const row = parseInt(cell.dataset.row, 10);
                    const col = parseInt(cell.dataset.col, 10);
                    previewPiecePlacement(row, col);
                });
        
                cell.addEventListener('mouseout', () => {
                    removePreview();
                });
            });
        }
        
        function previewPiecePlacement(row, col) {
            if (!selectedPiece) return;
        
            const pieceShape = pieceShapes[selectedPiece];
            const player = gameState.turn;
        
            pieceShape.forEach((pieceRow, i) => {
                pieceRow.forEach((cellValue, j) => {
                    if (cellValue === 1) {
                        const targetRow = row + i;
                        const targetCol = col + j;
        
                        if (
                            targetRow >= 0 && targetRow < 20 &&
                            targetCol >= 0 && targetCol < 20
                        ) {
                            const cell = document.querySelector(
                                `.cell[data-row="${targetRow}"][data-col="${targetCol}"]`
                            );
        
                            if (cell) {
                                if (isValidPlacementForPiece(row, col, pieceShape, player)) {
                                    cell.classList.add('preview-valid');
                                } else {
                                    cell.classList.add('preview-invalid');
                                }
                            }
                        }
                    }
                });
            });
        }
        
        function removePreview() {
            document.querySelectorAll('.cell').forEach(cell => {
                cell.classList.remove('preview-valid', 'preview-invalid');
            });
        }
        

        function renderPlayerPieces() {
            piecesContainer.innerHTML = ''; // Clear previous pieces
            const player = gameState.players[gameState.turn];
        
            player.pieces.forEach(piece => {
                const pieceData = pieceShapes[piece];
                const pieceElement = document.createElement('div');
                pieceElement.classList.add('player-piece');
                pieceElement.dataset.piece = piece; // Add data attribute
        
                // Render shape
                pieceData.forEach(row => {
                    const rowElement = document.createElement('div');
                    rowElement.classList.add('piece-row');
                    row.forEach(cell => {
                        const cellElement = document.createElement('div');
                        cellElement.classList.add('piece-cell');
                        if (cell === 1) {
                            cellElement.style.backgroundColor = player.color;
                        }
                        rowElement.appendChild(cellElement);
                    });
                    pieceElement.appendChild(rowElement);
                });
        
                pieceElement.addEventListener('click', () => selectPiece(piece));
                piecesContainer.appendChild(pieceElement);
            });
        }
        

        function selectPiece(piece) {
            // Remove the highlight from any previously selected piece
            document.querySelectorAll('.player-piece').forEach(pieceElement => {
                pieceElement.classList.remove('selected-piece');
            });
        
            // Highlight the currently selected piece
            const pieceElement = document.querySelector(`[data-piece="${piece}"]`);
            if (pieceElement) {
                pieceElement.classList.add('selected-piece');
            }
        
            selectedPiece = piece;
            console.log(`Selected piece: ${piece}`); // Keep this for debugging
        }
        

        function handleCellClick(row, col) {
            if (!selectedPiece) {
                console.error('Select a piece first!');
                return;
            }
        
            const pieceShape = pieceShapes[selectedPiece];
            const player = gameState.turn;
        
            // Validate placement
            const isValid = isValidPlacementForPiece(row, col, pieceShape, player);
        
            if (!isValid) {
                console.log('Invalid placement! Highlighting invalid cells.');
                highlightInvalidPlacement(row, col, pieceShape);
                return; // Skip placing the piece
            }
        
            console.log('Valid placement! Placing the piece.');
        
            // Place the piece on the board
            placePieceOnBoard(row, col, pieceShape, player);
            renderBoard();
        
            // Remove the used piece from the player's inventory
            const currentPlayer = gameState.players[player];
            currentPlayer.pieces = currentPlayer.pieces.filter(p => p !== selectedPiece);
            selectedPiece = null;
        
            // Move to the next turn
            gameState.turn = gameState.turn % 4 + 1;
            updateTurnDisplay();
            updateScores(); // Recalculate scores
            renderPlayerPieces();
        }
        
        

        function placePieceOnBoard(row, col, pieceShape, player) {
            for (let i = 0; i < pieceShape.length; i++) {
                for (let j = 0; j < pieceShape[i].length; j++) {
                    if (pieceShape[i][j] === 1) {
                        const targetRow = row + i;
                        const targetCol = col + j;
        
                        // Update the board state
                        gameState.board[targetRow][targetCol] = player;
                        console.log(`Placing part of the piece at (${targetRow}, ${targetCol})`);
                    }
                }
            }
        }

        function isValidPlacementForPiece(row, col, pieceShape, player) {
            const startingCorners = {
                1: [0, 0],     // Top-left corner for Player 1
                2: [0, 19],    // Top-right corner for Player 2
                3: [19, 19],   // Bottom-right corner for Player 3
                4: [19, 0]     // Bottom-left corner for Player 4
            };
        
            const [startRow, startCol] = startingCorners[player];
        
            let hasDiagonalConnection = false; // For diagonal rule enforcement
            let isFirstMove = true; // Assume it's the first move
        
            // Check if the player has any pieces already placed on the board
            for (let r = 0; r < 20; r++) {
                for (let c = 0; c < 20; c++) {
                    if (gameState.board[r][c] === player) {
                        isFirstMove = false;
                        break;
                    }
                }
            }
        
            for (let i = 0; i < pieceShape.length; i++) {
                for (let j = 0; j < pieceShape[i].length; j++) {
                    if (pieceShape[i][j] === 1) {
                        const targetRow = row + i;
                        const targetCol = col + j;
        
                        // Bounds check
                        if (targetRow < 0 || targetRow >= 20 || targetCol < 0 || targetCol >= 20) {
                            console.log('Out of bounds');
                            return false;
                        }
        
                        // Overlap check
                        if (gameState.board[targetRow][targetCol] !== null) {
                            console.log('Cell already occupied');
                            return false;
                        }
        
                        // For first move, ensure it starts in the assigned corner
                        if (isFirstMove) {
                            if (targetRow === startRow && targetCol === startCol) {
                                continue; // Allow placement in the starting corner
                            } else {
                                console.log('First move must start in the assigned corner');
                                return false;
                            }
                        }
        
                        // Diagonal connection check for subsequent moves
                        const diagonalDirections = [
                            [-1, -1], [-1, 1], [1, -1], [1, 1]
                        ];
        
                        const isDiagonalConnected = diagonalDirections.some(([dr, dc]) => {
                            const r = targetRow + dr;
                            const c = targetCol + dc;
                            return (
                                r >= 0 &&
                                r < 20 &&
                                c >= 0 &&
                                c < 20 &&
                                gameState.board[r][c] === player
                            );
                        });
        
                        hasDiagonalConnection = hasDiagonalConnection || isDiagonalConnected;
        
                        // Edge-touching check
                        const edgeDirections = [
                            [-1, 0], [1, 0], [0, -1], [0, 1]
                        ];
        
                        const hasEdgeTouch = edgeDirections.some(([dr, dc]) => {
                            const r = targetRow + dr;
                            const c = targetCol + dc;
                            return (
                                r >= 0 &&
                                r < 20 &&
                                c >= 0 &&
                                c < 20 &&
                                gameState.board[r][c] === player
                            );
                        });
        
                        if (hasEdgeTouch) {
                            console.log('Pieces cannot touch edge-to-edge');
                            return false;
                        }
                    }
                }
            }
        
            // Ensure at least one diagonal connection for subsequent moves
            if (!isFirstMove && !hasDiagonalConnection) {
                console.log('No diagonal connection for subsequent move');
                return false;
            }
        
            return true; // Valid placement
        }
        
        

       
        

        function isValidPlacement(row, col) {
            const player = gameState.turn;
        
            // Define starting corners for each player
            const startingCorners = {
                1: [0, 0],      // Top-left corner for Player 1 (Red)
                2: [0, 19],     // Top-right corner for Player 2 (Green)
                3: [19, 19],    // Bottom-right corner for Player 3 (Blue)
                4: [19, 0]      // Bottom-left corner for Player 4 (Yellow)
            };
        
            const [startRow, startCol] = startingCorners[player];
        
            // Check if this is the player's first move
            const isFirstMove = !gameState.board.flat().includes(player);
        
            if (isFirstMove) {
                // First move must be placed in the player's starting corner
                return row === startRow && col === startCol;
            }
        
            // For subsequent moves, enforce diagonal connection rules
            const directions = [
                [-1, -1], [-1, 1], [1, -1], [1, 1] // Diagonal directions
            ];
        
            const hasDiagonalConnection = directions.some(([dr, dc]) => {
                const r = row + dr;
                const c = col + dc;
                return (
                    r >= 0 &&
                    r < 20 &&
                    c >= 0 &&
                    c < 20 &&
                    gameState.board[r][c] === player
                );
            });
        
            if (!hasDiagonalConnection) return false;
        
            // Prevent edge touching
            const edgeDirections = [
                [-1, 0], [1, 0], [0, -1], [0, 1] // Adjacent directions (edges)
            ];
        
            const hasEdgeTouch = edgeDirections.some(([dr, dc]) => {
                const r = row + dr;
                const c = col + dc;
                return (
                    r >= 0 &&
                    r < 20 &&
                    c >= 0 &&
                    c < 20 &&
                    gameState.board[r][c] === player
                );
            });
        
            return !hasEdgeTouch; // Valid if no edge touching
        }
        
        

        function updateTurnDisplay() {
            const currentPlayerElement = document.getElementById('currentPlayer');
            currentPlayerElement.textContent = gameState.turn;
            currentPlayerElement.style.color = getPlayerColor(gameState.turn);
        }

        function getPlayerColor(player) {
            return gameState.players[player].color;
        }

        function initializeGame() {
            renderBoard();
            renderPlayerPieces();
            updateTurnDisplay();
            updateScores();
            enablePreview(); // Allow players to preview pieces before placement
        }
        
        

        function updateScores() {
            const scores = {};
        
            for (const playerId in gameState.players) {
                const player = gameState.players[playerId];
                scores[playerId] = player.pieces.reduce((total, piece) => {
                    const pieceShape = pieceShapes[piece];
                    const pieceScore = pieceShape.flat().filter(cell => cell === 1).length; // Count filled cells
                    return total + pieceScore;
                }, 0);
            }
        
            // Update the score display
            const scoreDisplay = document.getElementById('scoreDisplay');
            scoreDisplay.innerHTML = '';
        
            for (const playerId in scores) {
                const scoreElement = document.createElement('div');
                scoreElement.textContent = `Player ${playerId}: ${scores[playerId]} points`;
                scoreElement.style.color = gameState.players[playerId].color; // Use player color
                scoreDisplay.appendChild(scoreElement);
            }
        }
        
        

        const pieceShapes = {
            P1: [[1]],
            P2: [[1, 1]],
            P3: [[1, 1, 1]],
            P4: [[1, 1, 1, 1]],
            P5: [[1, 1, 1, 1, 1]],
            P6: [[1, 1], [1, 1]],
            P7: [[1, 1, 1], [0, 0, 1]],
            P8: [[1, 1, 1], [0, 1, 0]],
            P9: [[1, 1], [1, 0], [1, 0]],
            P10: [[1, 1, 1], [1, 0, 0]],
            P11: [[1, 1, 1], [0, 1, 1]],
            P12: [[1, 1, 1], [1, 1, 0]],
            P13: [[1, 1, 0], [0, 1, 1]],
            P14: [[1, 1], [1, 1], [1, 0]],
            P15: [[1, 1], [1, 0], [1, 1]],
            P16: [[1, 1, 1], [1, 0, 1]],
            P17: [[1, 1, 1], [1, 0, 0], [1, 0, 0]],
            P18: [[1, 1, 1], [0, 1, 0], [0, 1, 0]],
            P19: [[1, 1, 1, 1], [0, 1, 0, 0]],
            P20: [[1, 1, 1, 1], [1, 0, 0, 0]],
            P21: [[1, 1, 1, 1], [0, 0, 1, 0]]
        };

        function highlightInvalidPlacement(row, col, pieceShape) {
            for (let i = 0; i < pieceShape.length; i++) {
                for (let j = 0; j < pieceShape[i].length; j++) {
                    if (pieceShape[i][j] === 1) {
                        const targetRow = row + i;
                        const targetCol = col + j;
        
                        // Check if the cell is within bounds
                        if (targetRow >= 0 && targetRow < 20 && targetCol >= 0 && targetCol < 20) {
                            const cell = document.querySelector(
                                `.cell[data-row="${targetRow}"][data-col="${targetCol}"]`
                            );
                            if (cell) {
                                cell.classList.add('invalid-placement');
                                setTimeout(() => cell.classList.remove('invalid-placement'), 1000); // Remove highlight after 1 second
                            }
                        }
                    }
                }
            }
        }
        

        initializeGame();
    });
