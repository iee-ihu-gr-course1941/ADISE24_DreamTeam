import { fetchGameState } from './fetchGameState.js';
import { renderBoard } from './renderBoard.js'; // Import renderBoard
import { renderPlayerPieces } from './renderPieces.js';
import { isValidPlacementForPiece, placePieceOnBoard } from './gameRules.js';
import { getPlayerColor, updateTurnDisplay, updateScores } from './utilities.js';
import { initializeGame } from './initializeGame.js';


(async function () {
    const gameState = await fetchGameState('gameState.json');

    const boardElement = document.getElementById('board');
    const piecesContainer = document.getElementById('piecesContainer');
    const turnElement = document.getElementById('currentPlayer');
    const scoreDisplay = document.getElementById('scoreDisplay');

    function handleCellClick(row, col) {
        // Your logic for handling cell clicks
    }

    initializeGame(gameState, {
        boardElement,
        piecesContainer,
        turnElement,
        scoreDisplay,
        handleCellClick,
        getPlayerColor,
    });
})();
