function updateTurnDisplay() {
    const currentPlayerElement = document.getElementById('currentPlayer');
    currentPlayerElement.textContent = gameState.turn;
    currentPlayerElement.style.color = getPlayerColor(gameState.turn);
}
