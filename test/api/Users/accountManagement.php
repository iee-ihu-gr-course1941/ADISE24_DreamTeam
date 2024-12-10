<?php
// Include the database connection file
require_once '../config/connection.php';

/**
 * Retrieve user profile details
 */
function getUserProfile($pdo, $userId) {
    try {
        $sql = "SELECT id, username, email, created_at FROM users WHERE id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$userId]);
        return $stmt->fetch(PDO::FETCH_ASSOC); // Return the user's profile data
    } catch (PDOException $e) {
        error_log("Error in getUserProfile: " . $e->getMessage());
        return false;
    }
}

/**
 * Update user profile details
 */
function updateUserProfile($pdo, $userId, $username, $email) {
    try {
        $sql = "UPDATE users SET username = ?, email = ? WHERE id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$username, $email, $userId]);
        return $stmt->rowCount() > 0; // Return true if the update was successful
    } catch (PDOException $e) {
        error_log("Error in updateUserProfile: " . $e->getMessage());
        return false;
    }
}

/**
 * Delete user account
 */
function deleteUser($pdo, $userId) {
    try {
        $sql = "DELETE FROM users WHERE id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$userId]);
        return $stmt->rowCount() > 0; // Return true if the deletion was successful
    } catch (PDOException $e) {
        error_log("Error in deleteUser: " . $e->getMessage());
        return false;
    }
}

/**
 * Retrieve user's game statistics
 */
function getUserGameStats($pdo, $userId) {
    try {
        $sql = "SELECT 
                    COUNT(CASE WHEN player1_id = ? AND winner_id = player1_id THEN 1 END) AS wins,
                    COUNT(CASE WHEN player2_id = ? AND winner_id = player2_id THEN 1 END) AS losses,
                    COUNT(game_id) AS total_games
                FROM games 
                WHERE player1_id = ? OR player2_id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$userId, $userId, $userId, $userId]);
        return $stmt->fetch(PDO::FETCH_ASSOC); // Return the user's game statistics
    } catch (PDOException $e) {
        error_log("Error in getUserGameStats: " . $e->getMessage());
        return false;
    }
}
?>
