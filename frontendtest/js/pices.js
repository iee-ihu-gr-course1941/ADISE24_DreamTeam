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

    // Show all pieces initially
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
        showSinglePiece(box, pieceDiv, piece);
      });

      box.appendChild(pieceDiv);
    });
  }

  function showSinglePiece(box, pieceDiv, piece) {
    // Clear the box and show only the clicked piece
    box.innerHTML = ''; // Clear previous pieces

    // Create and add the "Back" button
    const backButton = document.createElement('button');
    backButton.classList.add('btn', 'btn-secondary');
    backButton.textContent = 'Back';
    backButton.onclick = function() {
      renderTetrisPiecesBack(box); // Go back to showing all pieces
    };

    // Create and add the "Rotate Left" button (Counterclockwise 90 degrees)
    const rotateLeftButton = document.createElement('button');
    rotateLeftButton.classList.add('btn', 'btn-primary');
    rotateLeftButton.innerHTML = '&#8592;'; // Left arrow
    rotateLeftButton.onclick = function() {
      rotatePiece(pieceDiv, 'left');
    };

    // Create and add the "Rotate Right" button (Clockwise 90 degrees)
    const rotateRightButton = document.createElement('button');
    rotateRightButton.classList.add('btn', 'btn-primary');
    rotateRightButton.innerHTML = '&#8594;'; // Right arrow
    rotateRightButton.onclick = function() {
      rotatePiece(pieceDiv, 'right');
    };

    // Create and add the "Mirror" button (Vertical flip)
    const mirrorButton = document.createElement('button');
    mirrorButton.classList.add('btn', 'btn-primary');
    mirrorButton.innerHTML = '&#8596;'; // Vertical mirror arrow
    mirrorButton.onclick = function() {
      mirrorPiece(pieceDiv);
    };

    // Add buttons and the piece div to the box
    box.appendChild(backButton);
    box.appendChild(rotateLeftButton);
    box.appendChild(rotateRightButton);
    box.appendChild(mirrorButton);
    box.appendChild(pieceDiv); // Show the clicked piece
  }

  function rotatePiece(pieceDiv, direction) {
    const currentRotation = pieceDiv.style.transform || 'rotate(0deg)';
    let newRotation = parseInt(currentRotation.replace('rotate(', '').replace('deg)', '')) || 0;

    if (direction === 'left') {
      newRotation -= 90;
    } else if (direction === 'right') {
      newRotation += 90;
    }

    // Ensure the rotation is within the range of 0 to 360 degrees
    newRotation = (newRotation + 360) % 360;

    pieceDiv.style.transform = `rotate(${newRotation}deg)`;
  }

  function mirrorPiece(pieceDiv) {
    // Toggle the mirroring by flipping horizontally
    const currentTransform = pieceDiv.style.transform || '';
    if (currentTransform.includes('scaleX(-1)')) {
      pieceDiv.style.transform = currentTransform.replace('scaleX(-1)', '');
    } else {
      pieceDiv.style.transform = `${currentTransform} scaleX(-1)`;
    }
  }

  function renderTetrisPiecesBack(box) {
    box.innerHTML = ''; // Clear the box

    // Fetch JSON data again (this might need optimization to avoid redundant fetches)
    fetch('json/test.json')
      .then(response => response.json())
      .then(data => {
        renderTetrisPieces('player1-box', data.player1, 'player1');
        renderTetrisPieces('player2-box', data.player2, 'player2');
        renderTetrisPieces('player3-box', data.player3, 'player3');
        renderTetrisPieces('player4-box', data.player4, 'player4');
      })
      .catch(error => console.error('Error loading Tetris data:', error));
  }