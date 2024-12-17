<?php
header('Content-Type: application/json');

// Include the database connection file
require_once './config/connection.php';


// 1. List all active game lobbies
function getLobbies() {
    $pdo = getDatabaseConnection();
    try {
        // Fetch all active lobbies where the status is 'waiting'
        $sql = "call getLobbies()";
        $stmt = $pdo->query($sql);
        return $stmt->fetchAll(); // Return the list of active lobbies
    } catch (PDOException $e) {
    return ['error' => 'Error in getLobbies(): ' . $e->getMessage()];
}
}

function createLobby($userId) {
    $pdo = getDatabaseConnection();
    try {
        // Call the stored procedure and fetch the result
        $sql = "CALL createLobby(:userId)";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':userId', $userId, PDO::PARAM_INT);
        $stmt->execute();

        // Fetch the lobby ID from the procedure result set
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result && isset($result['lobby_id'])) {
            return ['lobby_id' => (int)$result['lobby_id']]; // Return the new lobby ID
        } else {
            return ['error' => 'Failed to create lobby.'];
        }
    } catch (PDOException $e) {
        // Handle database errors
        return ['error' => 'Database error: ' . $e->getMessage()];
    }
}



// 3. Join an existing lobby
function joinLobby($userId, $lobbyId) {
    $pdo = getDatabaseConnection();

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

        return ['success' => true]; // Successfully joined the lobby
    }

    return ['error' => 'Lobby is not available']; // Lobby is not available
}

// 4. Leave a lobby
function leaveLobby($userId, $lobbyId) {
    $pdo = getDatabaseConnection();

    // Remove the user from the lobby
    $sql = "DELETE FROM lobby_players WHERE lobby_id = ? AND user_id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$lobbyId, $userId]);

    return ['success' => $stmt->rowCount() > 0]; // Return true if the user was successfully removed
}

// 5. Retrieve the details of a specific lobby
function getLobbyDetails($lobbyId) {
    $pdo = getDatabaseConnection();

    // Fetch the lobby details along with the players in it
    $sql = "SELECT l.lobby_id, l.created_by, l.status, l.created_at,
                   p.user_id, u.username
            FROM lobbies l
            LEFT JOIN lobby_players p ON l.lobby_id = p.lobby_id
            LEFT JOIN users u ON p.user_id = u.id
            WHERE l.lobby_id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$lobbyId]);

    return $stmt->fetchAll(); // Return the lobby details along with player info
}

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

// Call the handleRequest function to process the request
handleRequest();
?>
