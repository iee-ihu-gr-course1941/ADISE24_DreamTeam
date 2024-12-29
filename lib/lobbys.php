<?php
require_once 'dbconnect.php';
require_once 'helper.php';

header('Content-Type: application/json');

function getLobbies() {
    $pdo = getDatabaseConnection();
    try {
        $sql = "CALL GetGames();";
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
function handleRequest() {
    // Check if the action parameter is set
    if (isset($_GET['action'])) {
        $action = $_GET['action'];

        // Handle based on the action
        switch ($action) {
            case 'getLobbies':
                echo json_encode(getLobbies());
                break;

            case 'createLobby':
                if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['userId'])) { // Use $_POST for POST data
                    $userId = (int) $_POST['userId'];
                    echo json_encode(createLobby($userId));
                } else {
                    echo json_encode(['error' => 'User ID is required']);
                }
                break;

            case 'joinLobby':
                if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['userId'], $_POST['lobbyId'])) {
                    echo json_encode(joinLobby($_POST['userId'], $_POST['lobbyId']));
                } else {
                    echo json_encode(['error' => 'User ID and Lobby ID are required']);
                }
                break;

            case 'leaveLobby':
                if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['userId'], $_POST['lobbyId'])) {
                    echo json_encode(leaveLobby($_POST['userId'], $_POST['lobbyId']));
                } else {
                    echo json_encode(['error' => 'User ID and Lobby ID are required']);
                }
                break;

            case 'getLobbyDetails':
                if (isset($_GET['lobbyId'])) {
                    echo json_encode(getLobbyDetails($_GET['lobbyId']));
                } else {
                    echo json_encode(['error' => 'Lobby ID is required']);
                }
                break;

            default:
                echo json_encode(['error' => 'Invalid action']);
                break;
        }
    } else {
        echo json_encode(['error' => 'Action parameter is missing']);
    }
}

handleRequest();

?>