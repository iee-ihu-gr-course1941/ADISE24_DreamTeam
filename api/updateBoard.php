<?php
session_start();
require_once '.config/connection.php';

if (!isset($_SESSION['user_id'])) {
    die(json_encode(['success' => false, 'error' => 'User not logged in']));
}

$userId = $_SESSION['user_id'];
$color = $_SESSION['color'];  // Get the player's color
$x = $_POST['x'];
$y = $_POST['y'];

// Check if it's the user's turn
$pdo = getDatabaseConnection();
$stmt = $pdo->prepare("SELECT turn FROM users WHERE id = :userId");
$stmt->execute(['userId' => $userId]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user || $user['turn'] !== 1) {
    die(json_encode(['success' => false, 'error' => 'It is not your turn']));
}

// Update the board
$stmt = $pdo->prepare("UPDATE board_20 SET block = :color WHERE x = :x AND y = :y");
$stmt->execute(['color' => $color, 'x' => $x, 'y' => $y]);

// Update turn to the next player
updateTurn($userId);

// Return success
echo json_encode(['success' => true]);
?>
