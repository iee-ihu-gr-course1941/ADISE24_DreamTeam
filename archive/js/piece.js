function placePiece() {
    // Get values from the form
    var piece_id = $('#piece_id').val();
    var x = $('#x').val();
    var y = $('#y').val();

    // Send AJAX request to PHP API
    $.ajax({
        url: './api/place_piece.php', // The PHP file where the stored procedure is called
        method: 'POST',
        data: {
            piece_id: piece_id,
            x: x,
            y: y
        },
        success: function(response) {
            var data = JSON.parse(response);
            // Show the result on the page
            if (data.success) {
                $('#response').html('<p>' + data.message + '</p>');
            } else {
                $('#response').html('<p style="color:red;">' + data.message + '</p>');
            }
        },
        error: function() {
            alert('An error occurred while placing the piece.');
        }
    });
}