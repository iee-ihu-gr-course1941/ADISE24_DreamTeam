<?php
header('Content-Type: application/json');

// Include the database connection file
require_once './config/connection.php';

// Get data from the request (piece_id, x, y)
$piece_id = isset($_POST['piece_id']) ? $_POST['piece_id'] : null;
$x = isset($_POST['x']) ? $_POST['x'] : null;
$y = isset($_POST['y']) ? $_POST['y'] : null;

// Validate the inputs
if ($piece_id !== null && $x !== null && $y !== null) {
    // Get the PDO database connection
    $pdo = getDatabaseConnection();

    try {
        // Call the stored procedure 'place_piece' with parameters
        $stmt = $pdo->prepare("CALL place_piece(?, ?, ?, false, '0')");
        $stmt->bindParam(1, $piece_id, PDO::PARAM_INT);
        $stmt->bindParam(2, $x, PDO::PARAM_INT);
        $stmt->bindParam(3, $y, PDO::PARAM_INT);

        // Execute the stored procedure
        $stmt->execute();

        // Check if the query was successful
        if ($stmt->rowCount() > 0) {
            echo json_encode(['success' => true, 'message' => 'Piece placed successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to place the piece']);
        }

    } catch (PDOException $e) {
        // Handle any error
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid input']);
}
?>
