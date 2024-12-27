// Fetch JSON data and render Tetris pieces
fetch('json/test.json')
  .then(response => response.json())
  .then(data => {
    renderTetrisPieces('player1-box', data.player1, 'player1');
    renderTetrisPieces('player2-box', data.player2, 'player2');
    renderTetrisPieces('player3-box', data.player3, 'player3');
    renderTetrisPieces('player4-box', data.player4, 'player4');
  })
  .catch(error => console.error('Error loading Tetris data:', error));



  function renderTetrisPieces(playerBoxId, pieces, playerClass) {
    const box = document.getElementById(playerBoxId);
    box.classList.add(playerClass); // Add player-specific class
  
    pieces.forEach(piece => {
      const pieceDiv = document.createElement('div');
      pieceDiv.classList.add('tetris-piece');
      
      piece.forEach(row => {
        const rowDiv = document.createElement('div');
        row.forEach(cell => {
          const block = document.createElement('div');
          block.classList.add('block');
          if (cell === 0) {
            block.style.backgroundColor = 'transparent'; // Empty space
          }
          rowDiv.appendChild(block);
        });
        pieceDiv.appendChild(rowDiv);
      });
  
      box.appendChild(pieceDiv);
    });
  }
  
