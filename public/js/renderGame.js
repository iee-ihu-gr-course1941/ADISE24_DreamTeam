import { fetchGameState } from './gameState.js';
import { fetchPlayerPieces } from './playerPieces.js';
import { placePiece } from './placePiece.js';

let gameState = null;
let selectedPiece = null;

function enableCellPreview() {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.addEventListener('mouseover', event => {
            const row = parseInt(cell.dataset.row, 10);
            const col = parseInt(cell.dataset.col, 10);
            previewPiecePlacement(row, col);
        });

        cell.addEventListener('mouseout', removePreview);
    });
}

export async function initializeGame(gameId) {
    console.log('Initializing game with ID:', gameId);

    // Fetch game state from the API
    const response = await fetch(`https://users.iee.ihu.gr/~iee2020202/ADISE24_DreamTeam/blokus.php/games/${gameId}`);
    const data = await response.json();

    if (!data.success) {
        console.error('Failed to fetch game state:', data.message);
        document.getElementById('board').innerHTML = '<p class="text-danger">Failed to load game state.</p>';
        return;
    }

    gameState = data.gameState;

    // Parse the board state (convert JSON string into a 2D array)
    const board = JSON.parse(gameState.board_state).map(row => JSON.parse(row));
    console.log('Parsed board:', board);

    // Render the board and other components
    renderBoard(board);
    renderPlayerPieces(gameState.players);
    updateTurnDisplay(gameState.current_turn_user_id);
    enablePreview();
}

function renderBoard(board) {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = ''; // Clear previous board

    for (let row = 0; row < 20; row++) {
        for (let col = 0; col < 20; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;

            // Check if the cell is occupied
            if (board[row][col]) {
                cell.classList.add('occupied');
                cell.style.backgroundColor = getPlayerColor(board[row][col]);
            }

            cell.addEventListener('click', () => handleCellClick(row, col));
            boardElement.appendChild(cell);
        }
    }
    console.log('Board rendered successfully');
}


function renderPlayerPieces(players) {
    const piecesContainer = document.getElementById('piecesContainer');
    piecesContainer.innerHTML = ''; // Clear previous pieces

    players.forEach(player => {
        const playerDiv = document.createElement('div');
        playerDiv.classList.add('player-piece');

        const playerId = player.user_id;
        const pieces = playerPieces[playerId]; // Get pieces for this player

        playerDiv.textContent = `${player.username} (${player.position}) - Score: ${player.score}`;
        
        // Render player's pieces
        const piecesList = document.createElement('ul');
        pieces.forEach(pieceId => {
            const pieceItem = document.createElement('li');
            pieceItem.textContent = pieceId;
            pieceItem.dataset.piece = pieceId;
            pieceItem.classList.add('piece-item');

            pieceItem.addEventListener('click', () => selectPiece(pieceId));
            piecesList.appendChild(pieceItem);
        });

        playerDiv.appendChild(piecesList);
        piecesContainer.appendChild(playerDiv);
    });

    console.log('Player pieces rendered successfully');
}


function selectPiece(pieceId) {
    document.querySelectorAll('.player-piece').forEach(pieceElement => {
        pieceElement.classList.remove('selected-piece');
    });

    const pieceElement = document.querySelector(`[data-piece="${pieceId}"]`);
    if (pieceElement) {
        pieceElement.classList.add('selected-piece');
    }

    selectedPiece = pieceId;
}

async function handleCellClick(row, col) {
    if (!selectedPiece) {
        console.error('Select a piece first!');
        return;
    }

    const success = await placePiece(gameState.game_id, gameState.turn, selectedPiece, { row, col });

    if (success) {
        console.log('Piece placed successfully');
        gameState = await fetchGameState(gameState.game_id);
        initializeGame(gameState.game_id);
    }
}
function updateTurnDisplay() {
    const currentPlayerElement = document.getElementById('currentPlayer');
    const currentPlayer = gameState.players.find(player => player.user_id === gameState.current_turn_user_id);

    if (currentPlayer) {
        currentPlayerElement.textContent = `Current Player: ${currentPlayer.username}`;
        currentPlayerElement.style.color = currentPlayer.color || 'black'; // Use player color or default to black
    } else {
        currentPlayerElement.textContent = 'Current Player: Undefined';
        currentPlayerElement.style.color = 'black';
    }
}


function getPlayerColor(playerId) {
    const player = gameState.players.find(player => player.user_id === playerId);
    return player ? player.color : '#000';
}

function enablePreview() {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.addEventListener('mouseover', event => {
            const row = parseInt(cell.dataset.row, 10);
            const col = parseInt(cell.dataset.col, 10);
            previewPiecePlacement(row, col);
        });

        cell.addEventListener('mouseout', removePreview);
    });
}

function previewPiecePlacement(row, col) {
    if (!selectedPiece) return; // No piece selected, exit

    const pieceShape = pieceShapes[selectedPiece]; // Get the shape of the selected piece
    const player = gameState.turn; // Current player's turn

    pieceShape.forEach((pieceRow, i) => {
        pieceRow.forEach((cellValue, j) => {
            if (cellValue === 1) {
                const targetRow = row + i;
                const targetCol = col + j;

                // Check if the target cell is within bounds
                if (
                    targetRow >= 0 && targetRow < 20 &&
                    targetCol >= 0 && targetCol < 20
                ) {
                    const cell = document.querySelector(
                        `.cell[data-row="${targetRow}"][data-col="${targetCol}"]`
                    );

                    if (cell) {
                        if (isValidPlacementForPiece(row, col, pieceShape, player)) {
                            cell.classList.add('preview-valid'); // Highlight valid placement
                        } else {
                            cell.classList.add('preview-invalid'); // Highlight invalid placement
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
