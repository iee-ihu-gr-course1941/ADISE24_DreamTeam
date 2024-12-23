<?php
require_once 'dbconnect.php';
require_once 'helper.php';

header('Content-Type: application/json');

function getLobbies() {
    $pdo = getDatabaseConnection();
    try {
        $sql = "SELECT * FROM game_lobbies";
        $stmt = $pdo->query($sql);
        $lobbies = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($lobbies, JSON_PRETTY_PRINT);
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Error in getLobbies(): ' . $e->getMessage()]);
    }
}

function createLobby($userId) {
    $pdo = getDatabaseConnection();
    try {
        $sql = "INSERT INTO game_lobbies (player1_id) VALUES (:userId)";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':userId', $userId, PDO::PARAM_INT);
        $stmt->execute();

        $lobbyId = $pdo->lastInsertId();

        echo json_encode(['lobby_id' => (int)$lobbyId]); 
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
}

function joinLobby($userId, $lobbyId) {
    $pdo = getDatabaseConnection();

    try {
        // Check if the lobby exists and is in 'waiting' status
        $sql = "SELECT * FROM game_lobbies WHERE id = ? AND status = 'waiting'";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$lobbyId]);
        $lobby = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($lobby) {
            // Update the lobby to add the player and change the status to 'full' or similar
            $sql = "UPDATE game_lobbies SET player1_id = ?, status = 'full' WHERE id = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$userId, $lobbyId]);

            echo json_encode(['success' => true, 'message' => 'You have joined the lobby']);
            return;
        }

        // If the lobby is not available, send an error message
        echo json_encode(['error' => 'Lobby is not available or already full']);
    } catch (PDOException $e) {
        // Handle database errors
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
}

?>