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

  // Attach interaction events
  $(pieceDiv).on('click', function() {
    toggleSelectPiece(this); // Toggle piece selection on click
  });

  box.appendChild(pieceDiv);
});
}

let selectedPiece = null;

function toggleSelectPiece(pieceElement) {
if (selectedPiece) {
  $(selectedPiece).css('border', 'none');
}
if (selectedPiece !== pieceElement) {
  selectedPiece = pieceElement;
  $(selectedPiece).css('border', '2px solid black');
} else {
  selectedPiece = null;
}
}

// Rotate piece
function rotatePiece() {
if (selectedPiece) {
  const currentRotation = $(selectedPiece).data('rotation') || 0;
  const newRotation = (currentRotation + 90) % 360;
  $(selectedPiece).css('transform', 'rotate(' + newRotation + 'deg)');
  $(selectedPiece).data('rotation', newRotation);
}
}

// Mirror piece
function mirrorPiece() {
if (selectedPiece) {
  const currentScale = $(selectedPiece).data('scale') || 1;
  const newScale = currentScale === 1 ? -1 : 1;
  $(selectedPiece).css('transform', 'scaleX(' + newScale + ')');
  $(selectedPiece).data('scale', newScale);
}
}

// Keyboard controls for interaction
$(document).keydown(function(e) {
if (selectedPiece) {
  if (e.key === 'r' || e.key === 'R') {
    rotatePiece();
  }
  if (e.key === 'm' || e.key === 'M') {
    mirrorPiece();
  }
}
});