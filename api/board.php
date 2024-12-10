<?php
header('Content-Type: application/json');

// Include the database connection file
require_once './config/connection.php';

/**
 * Fetches the board data from the database.
 *
 * @return array
 */
function fetch_board() {
    $pdo = getDatabaseConnection();
    try {
        $stmt = $pdo->prepare("CALL fetch_board() ");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        die(json_encode(['success' => false, 'error' => $e->getMessage()]));
    }
}

// Set the current user's turn to 0 (finished), and the next user's turn to 1
function updateTurn($currentPlayerId) {
    $pdo = getDatabaseConnection();
    
    // Set all users' turn to 0
    $stmt = $pdo->prepare("UPDATE users SET turn = 0");
    $stmt->execute();
    
    // Set the next player's turn to 1
    $stmt = $pdo->prepare("UPDATE users SET turn = 1 WHERE id = (SELECT id FROM users WHERE turn = 0 LIMIT 1)");
    $stmt->execute();
}



// Handle API request
echo json_encode(['success' => true, 'board' => fetch_board()]);
?>
