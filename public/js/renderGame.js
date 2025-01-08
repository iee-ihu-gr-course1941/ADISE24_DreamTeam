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
    gameState = await fetchGameState(gameId);

    if (!gameState) {
        console.error('Failed to initialize game');
        return;
    }

    renderBoard();           // Render the board
    renderPlayerPieces();    // Render player pieces
    updateTurnDisplay();     // Update turn display
    enableCellPreview();     // Enable hover-based preview for placement
}


function renderBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';

    for (let row = 0; row < 20; row++) {
        for (let col = 0; col < 20; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;

            if (gameState.board[row][col]) {
                cell.classList.add('occupied');
                cell.style.backgroundColor = getPlayerColor(gameState.board[row][col]);
            }

            cell.addEventListener('click', () => handleCellClick(row, col));
            boardElement.appendChild(cell);
        }
    }
}

async function renderPlayerPieces() {
    const piecesContainer = document.getElementById('piecesContainer');
    piecesContainer.innerHTML = '';

    const playerId = gameState.turn;
    const pieces = await fetchPlayerPieces(gameState.game_id, playerId);

    pieces.forEach(piece => {
        const pieceData = JSON.parse(piece.piece_data);
        const pieceElement = document.createElement('div');
        pieceElement.classList.add('player-piece');
        pieceElement.dataset.piece = piece.piece_id;

        pieceData.shape.forEach(row => {
            const rowElement = document.createElement('div');
            rowElement.classList.add('piece-row');
            row.forEach(cell => {
                const cellElement = document.createElement('div');
                cellElement.classList.add('piece-cell');
                if (cell === 1) {
                    cellElement.style.backgroundColor = gameState.players[playerId].color;
                }
                rowElement.appendChild(cellElement);
            });
            pieceElement.appendChild(rowElement);
        });

        pieceElement.addEventListener('click', () => selectPiece(piece.piece_id));
        piecesContainer.appendChild(pieceElement);
    });
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
    currentPlayerElement.textContent = `Player ${gameState.turn}`;
    currentPlayerElement.style.color = getPlayerColor(gameState.turn);
}

function getPlayerColor(playerId) {
    return gameState.players[playerId].color;
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
