<?php
// Retrieves real-time updates of the game's state
function getGameUpdates($gameId) {
    global $pdo;

    $sql = "SELECT board_state, current_turn FROM games WHERE game_id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$gameId]);

    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    return $result ? $result : ['error' => 'Game not found'];
}

// Sends a message to all players in a game
function sendMessageToPlayers($gameId, $message) {
    global $pdo;

    $sql = "SELECT user_id FROM game_players WHERE game_id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$gameId]);
    $players = $stmt->fetchAll(PDO::FETCH_COLUMN);

    foreach ($players as $playerId) {
        // Logic to send the message (placeholder)
        // For example, save messages in a database table
        $sql = "INSERT INTO game_messages (game_id, user_id, message, sent_at) VALUES (?, ?, ?, NOW())";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$gameId, $playerId, $message]);
    }

    return ['status' => 'Message sent'];
}
?>
