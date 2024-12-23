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
        $sql = "SELECT * FROM game_lobbies WHERE id = ? AND status = 'waiting'";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$lobbyId]);
        $lobby = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($lobby) {
            $sql = "UPDATE game_lobbies SET player1_id = ?, status = 'full' WHERE id = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$userId, $lobbyId]);

            echo json_encode(['success' => true, 'message' => 'You have joined the lobby']);
            return;
        }

        echo json_encode(['error' => 'Lobby is not available or already full']);
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
}

function leaveLobby($userId, $lobbyId) {
    $pdo = getDatabaseConnection();

    try {
        $sql = "SELECT * FROM game_lobbies WHERE id = ? AND player1_id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$lobbyId, $userId]);
        $lobby = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($lobby) {
            // If the user is the lobby owner, delete the lobby
            $sql = "DELETE FROM game_lobbies WHERE id = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$lobbyId]);

            echo json_encode(['success' => true, 'message' => 'Lobby deleted successfully']);
            return;
        } else {
            // If the user is not the owner, remove them from the lobby
            $sql = "UPDATE game_lobbies SET player2_id = NULL WHERE id = ? AND player2_id = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$lobbyId, $userId]);

            if ($stmt->rowCount() > 0) {
                echo json_encode(['success' => true, 'message' => 'You have left the lobby']);
                return;
            }
        }

        echo json_encode(['error' => 'You are not part of this lobby']);
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
}

?>