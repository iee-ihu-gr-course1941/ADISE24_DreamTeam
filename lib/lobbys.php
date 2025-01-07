<?php
require_once 'dbconnect.php';
require_once 'helper.php';

header('Content-Type: application/json');

function getLobbies() {
    $pdo = getDatabaseConnection();
    try {
        $sql = "CALL GetGames2();";
        $stmt = $pdo->query($sql);
        $lobbies = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($lobbies, JSON_PRETTY_PRINT);
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Error in getLobbies(): ' . $e->getMessage()]);
    }
}

//works
function createLobby($userId, $gameType, $maxPlayers, $createdAt) {
    $pdo = getDatabaseConnection();

    /*$userId = 2;
    $gameType = 'middle';
    $maxPlayers = 4;
    $createdAt = date('Y-m-d H:i:s');*/

    try {
        $sql = "INSERT INTO game_lobbies (player1_id, game_type, max_players, created_at) 
                VALUES (:userId, :gameType, :maxPlayers, :createdAt)";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':userId', $userId, PDO::PARAM_INT);
        $stmt->bindParam(':gameType', $gameType, PDO::PARAM_STR);
        $stmt->bindParam(':maxPlayers', $maxPlayers, PDO::PARAM_INT);
        $stmt->bindParam(':createdAt', $createdAt, PDO::PARAM_STR);
        $stmt->execute();

        $lobbyId = $pdo->lastInsertId();

        echo json_encode([
            'lobby_id' => (int)$lobbyId,
            'player1_id' => $userId,
            'game_type' => $gameType,
            'max_players' => $maxPlayers,
            'created_at' => $createdAt
        ]);
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
}

//Issue with parameters
// function createLobby($userId) {
//     $pdo = getDatabaseConnection();
//     try {
//         $sql = "INSERT INTO game_lobbies (player1_id) VALUES (:userId)";
//         $stmt = $pdo->prepare($sql);
//         $stmt->bindParam(':userId', $userId, PDO::PARAM_INT);
//         $stmt->execute();

//         $lobbyId = $pdo->lastInsertId();

//         echo json_encode(['lobby_id' => (int)$lobbyId]); 
//     } catch (PDOException $e) {
//         echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
//     }
// }

function joinLobby($userId, $lobbyId) {
    $pdo = getDatabaseConnection();

    try {
        $checkUserSql = "SELECT COUNT(*) as count FROM game_players WHERE lobby_id = :lobby_id AND user_id = :user_id";
        $checkUserStmt = $pdo->prepare($checkUserSql);
        $checkUserStmt->execute(['lobby_id' => $lobbyId, 'user_id' => $userId]);
        $userInLobby = $checkUserStmt->fetch(PDO::FETCH_ASSOC)['count'];

        if ($userInLobby > 0) {
            echo json_encode(['success' => false, 'message' => 'You are already in this lobby.']);
            return;
        }

        $checkFullSql = "SELECT COUNT(*) as count FROM game_players WHERE game_id = :game_id";
        $checkFullStmt = $pdo->prepare($checkFullSql);
        $checkFullStmt->execute(['game_id' => $lobbyId]);
        $currentPlayers = $checkFullStmt->fetch(PDO::FETCH_ASSOC)['count'];

        if ($currentPlayers >= 4) {
            echo json_encode(['success' => false, 'message' => 'The lobby is full.']);
            return;
        }

        $joinGameSql = "CALL Blokus_db.joinGame(:user_id, :lobby_id)";
        $joinGameStmt = $pdo->prepare($joinGameSql);
        $joinGameStmt->execute(['user_id' => $userId, 'lobby_id' => $lobbyId]);

        echo json_encode(['success' => true, 'message' => 'You have successfully joined the lobby.']);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }
}


//works
function leaveLobby() {
    $pdo = getDatabaseConnection();
    $lobbyId = 4;

    try {
        $sql = "DELETE FROM game_lobbies WHERE id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$lobbyId]);

        if ($stmt->rowCount() > 0) {
            echo json_encode(['success' => true, 'message' => "Lobby with ID $lobbyId deleted successfully"]);
        } else {
            echo json_encode(['success' => false, 'message' => "No lobby found with ID $lobbyId"]);
        }
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
}

//Issue with parameters
// function leaveLobby($lobbyId) {
//     $pdo = getDatabaseConnection();
//     $lobbyId = "SELECT id FROM game_lobbies";

//     try {
//         $sql = "DELETE FROM game_lobbies WHERE id = ?";
//         $stmt = $pdo->prepare($sql);
//         $stmt->execute([$lobbyId]);

//         if ($stmt->rowCount() > 0) {
//             echo json_encode(['success' => true, 'message' => "Lobby with ID $lobbyId deleted successfully"]);
//         } else {
//             echo json_encode(['success' => false, 'message' => "No lobby found with ID $lobbyId"]);
//         }
//     } catch (PDOException $e) {
//         echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
//     }
// }

// Handle all API requests
?>