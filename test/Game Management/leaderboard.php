<?php
// Retrieves the global leaderboard
function getLeaderboard() {
    global $pdo;

    $sql = "SELECT username, wins, rank FROM users ORDER BY wins DESC LIMIT 10";
    $stmt = $pdo->query($sql);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

// Retrieves the user's position on the leaderboard
function getUserLeaderboardPosition($userId) {
    global $pdo;

    $sql = "SELECT rank FROM users WHERE user_id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$userId]);
    return $stmt->fetchColumn();
}
?>
