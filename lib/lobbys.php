<?php
require_once 'dbconnect.php';
require_once 'helper.php';

header('Content-Type: application/json');

function getLobbys() {
    $pdo = getDatabaseConnection();
    try {
        // Fetch all active lobbies where the status is 'waiting'
        $sql = 'SELECT * FROM game_lobbies';
        $stmt = $pdo->query($sql);
        $stmt->fetchAll(); // Return the list of active lobbies
        $lobbys = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode($lobbys, JSON_PRETTY_PRINT);
    } catch (PDOException $e) {
    echo json_encode (['error' => 'Error in getLobbys(): ' . $e->getMessage()]);
    }
}



?>