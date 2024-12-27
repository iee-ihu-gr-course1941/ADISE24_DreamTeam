$(document).ready(function() {
    // Generate the 20x20 board
    for (let i = 0; i < 400; i++) {
      $('.board').append('<div></div>');
    }
  
    // Define pieces (example: 1x1 piece)
    const pieces = [
      { id: 'piece1', shape: [[1]] },
      // Add more pieces as needed
    ];
  
    // Render pieces
    pieces.forEach(piece => {
      const pieceDiv = $('<div></div>').addClass('piece').attr('id', piece.id);
      $('.pieces').append(pieceDiv);
    });
  
    // Make pieces draggable
    $('.piece').draggable({
      helper: 'clone',
      revert: 'invalid',
      start: function(event, ui) {
        // Set the piece's initial position
        $(this).data('startPosition', ui.helper.position());
      }
    });
  
    // Make board cells droppable
    $('.board div').droppable({
      accept: '.piece',
      drop: function(event, ui) {
        const piece = ui.helper[0];
        const startPosition = $(piece).data('startPosition');
        const offset = $(this).offset();
        const pieceWidth = $(piece).outerWidth();
        const pieceHeight = $(piece).outerHeight();
  
        // Calculate the position to place the piece
        const left = offset.left - startPosition.left;
        const top = offset.top - startPosition.top;
  
        // Place the piece on the board
        $(piece).css({
          position: 'absolute',
          left: left,
          top: top
        }).appendTo('.board');
      }
    });
  });
  