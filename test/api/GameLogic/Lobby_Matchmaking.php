<?php
// Assuming you have a PDO connection set up as $pdo
// Include the PDO connection setup here if needed

// 1. List all active game lobbies
function getLobbies() {
    global $pdo;

    // Fetch all active lobbies where the status is 'waiting'
    $sql = "SELECT lobby_id, created_by, created_at FROM lobbies WHERE status = 'waiting'";
    $stmt = $pdo->query($sql);

    return $stmt->fetchAll(); // Return the list of active lobbies
}

// 2. Create a new lobby
function createLobby($userId) {
    global $pdo;

    // Insert a new lobby with the status 'waiting'
    $sql = "INSERT INTO lobbies (created_by, status, created_at) VALUES (?, 'waiting', NOW())";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$userId]);

    return $pdo->lastInsertId(); // Return the new lobby ID
}

// 3. Join an existing lobby
function joinLobby($userId, $lobbyId) {
    global $pdo;

    // Check if the lobby is still 'waiting'
    $sql = "SELECT status FROM lobbies WHERE lobby_id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$lobbyId]);
    $lobby = $stmt->fetch();

    if ($lobby && $lobby['status'] === 'waiting') {
        // Add the user to the lobby
        $sql = "INSERT INTO lobby_players (lobby_id, user_id, joined_at) VALUES (?, ?, NOW())";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$lobbyId, $userId]);

        return true; // Successfully joined the lobby
    }

    return false; // Lobby is not available
}

// 4. Leave a lobby
function leaveLobby($userId, $lobbyId) {
    global $pdo;

    // Remove the user from the lobby
    $sql = "DELETE FROM lobby_players WHERE lobby_id = ? AND user_id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$lobbyId, $userId]);

    return $stmt->rowCount() > 0; // Return true if the user was successfully removed
}

// 5. Retrieve the details of a specific lobby
function getLobbyDetails($lobbyId) {
    global $pdo;

    // Fetch the lobby details
    $sql = "SELECT l.lobby_id, l.created_by, l.status, l.created_at,
                   p.user_id, u.username
            FROM lobbies l
            LEFT JOIN lobby_players p ON l.lobby_id = p.lobby_id
            LEFT JOIN users u ON p.user_id = u.user_id
            WHERE l.lobby_id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$lobbyId]);

    return $stmt->fetchAll(); // Return the lobby details along with player info
}
