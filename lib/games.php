<?php

require_once 'dbconnect.php';
require_once 'helper.php';

header('Content-Type: application/json');

function getNextPlayerTurn($gameId) {
    global $pdo;

    $sql = "SELECT current_turn FROM games WHERE game_id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$gameId]);
    $currentTurn = $stmt->fetchColumn();

    if ($currentTurn !== false) {
        $sql = "SELECT user_id FROM game_players WHERE game_id = ? ORDER BY player_order";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$gameId]);
        $players = $stmt->fetchAll(PDO::FETCH_COLUMN);

        $currentIndex = array_search ($currentTurn, $players);
        $nextIndex = ($currentIndex + 1) % count($players);

        return $players[$nextIndex]; 
    }

    return null; 
}

function getAvailableMoves($gameId, $playerId) {
    global $pdo;

    $sql = "SELECT board_state FROM games WHERE game_id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$gameId]);
    $boardState = $stmt->fetchColumn();

    $sql = "SELECT piece_id FROM player_pieces WHERE game_id = ? AND player_id = ? AND is_used = 0";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$gameId, $playerId]);
    $availablePieces = $stmt->fetchAll(PDO::FETCH_COLUMN);

    $availableMoves = [
        'placeholder' => 'Implement game rules to calculate moves'
    ];

    return $availableMoves;
}

function getPlayerPieces($gameId, $playerId) {
    global $pdo;

    $sql = "SELECT piece_id FROM player_pieces WHERE game_id = ? AND player_id = ? AND is_used = 0";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$gameId, $playerId]);

    return $stmt->fetchAll(PDO::FETCH_COLUMN);
}

function updatePlayerMove($gameId, $playerId, $move) {
    global $pdo;

    $pdo->beginTransaction();

    try {
        $sql = "UPDATE games SET board_state = ?, current_turn = ? WHERE game_id = ?";
        $stmt = $pdo->prepare($sql);
        $newBoardState = json_encode($move['boardState']); 
        $stmt->execute([$newBoardState, $move['nextPlayer'], $gameId]);

        $sql = "UPDATE player_pieces SET is_used = 1 WHERE game_id = ? AND player_id = ? AND piece_id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$gameId, $playerId, $move['pieceId']]);

        $pdo->commit();

        return true;
    } catch (Exception $e) {
        $pdo->rollBack();
        return false;
    }
}
?>