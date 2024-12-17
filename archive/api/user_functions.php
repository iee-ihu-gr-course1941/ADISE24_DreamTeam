<?php
require_once './config/connection.php';


/**
 * Retrieve user profile details
 */
function getUserProfile($userId) {
    $pdo = getDatabaseConnection(); // Get the PDO connection here
    try {
        $sql = "SELECT id, username, email, created_at FROM users WHERE id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$userId]);
        return $stmt->fetch(PDO::FETCH_ASSOC); // Return the user's profile data
    } catch (PDOException $e) {
        return ['error' => 'Error in getUserProfile: ' . $e->getMessage()];
    }
}

/**
 * Update user profile details
 */
function updateUserProfile($userId, $username, $email) {
    $pdo = getDatabaseConnection(); // Get the PDO connection here
    try {
        $sql = "UPDATE users SET username = ?, email = ? WHERE id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$username, $email, $userId]);
        return ['success' => $stmt->rowCount() > 0];
    } catch (PDOException $e) {
        return ['error' => 'Error in updateUserProfile: ' . $e->getMessage()];
    }
}

/**
 * Delete user account
 */
function deleteUser($userId) {
    $pdo = getDatabaseConnection(); // Get the PDO connection here
    try {
        $sql = "DELETE FROM users WHERE id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$userId]);
        return ['success' => $stmt->rowCount() > 0];
    } catch (PDOException $e) {
        return ['error' => 'Error in deleteUser: ' . $e->getMessage()];
    }
}

/**
 * Retrieve user's game statistics
 */
function getUserGameStats($userId) {
    $pdo = getDatabaseConnection(); // Get the PDO connection here
    try {
        $sql = "SELECT 
                    COUNT(CASE WHEN player1_id = ? AND winner_id = player1_id THEN 1 END) AS wins,
                    COUNT(CASE WHEN player2_id = ? AND winner_id = player2_id THEN 1 END) AS losses,
                    COUNT(game_id) AS total_games
                FROM games 
                WHERE player1_id = ? OR player2_id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$userId, $userId, $userId, $userId]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        return ['error' => 'Error in getUserGameStats: ' . $e->getMessage()];
    }
}

/**
 * Handle incoming request and perform actions based on query parameters
 */
function handleRequest() {
    // Check if the action parameter is set
    if (isset($_GET['action'])) {
        $action = $_GET['action'];

        switch ($action) {
            case 'getUserProfile':
                if (isset($_GET['userId'])) {
                    $userId = (int) $_GET['userId'];
                    echo json_encode(getUserProfile($userId));
                } else {
                    echo json_encode(['error' => 'userId parameter is missing']);
                }
                break;

            case 'updateUserProfile':
                if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['userId'], $_POST['username'], $_POST['email'])) {
                    $userId = (int) $_POST['userId'];
                    $username = $_POST['username'];
                    $email = $_POST['email'];
                    echo json_encode(updateUserProfile($userId, $username, $email));
                } else {
                    echo json_encode(['error' => 'Missing required parameters or wrong HTTP method']);
                }
                break;

            case 'deleteUser':
                if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && isset($_GET['userId'])) {
                    $userId = (int) $_GET['userId'];
                    echo json_encode(deleteUser($userId));
                } else {
                    echo json_encode(['error' => 'userId parameter is missing or wrong HTTP method']);
                }
                break;

            case 'getUserGameStats':
                if (isset($_GET['userId'])) {
                    $userId = (int) $_GET['userId'];
                    echo json_encode(getUserGameStats($userId));
                } else {
                    echo json_encode(['error' => 'userId parameter is missing']);
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
