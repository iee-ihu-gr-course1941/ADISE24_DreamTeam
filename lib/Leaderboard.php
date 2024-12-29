<?php
require_once 'dbconnect.php';
require_once 'helper.php';

header('Content-Type: application/json');

function getLeaderboard() {
    $pdo = getDatabaseConnection();
    try {
        $sql = "CALL GetLeaderboard();";
        $stmt = $pdo->query($sql);
        $lobbies = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($lobbies, JSON_PRETTY_PRINT);
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Error in geLeaderboard(): ' . $e->getMessage()]);
    }
}

?>