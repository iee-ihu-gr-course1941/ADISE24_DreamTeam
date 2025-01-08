<?php
require_once 'dbconnect.php';

header('Content-Type: application/json');

/**
 * Fetch the state of a game by game ID.
 */
function getGameState($gameId) {
    $pdo = getDatabaseConnection();
    try {
        $sql = "CALL GetGameState(:gameId);";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':gameId', $gameId, PDO::PARAM_INT);
        $stmt->execute();

        $gameState = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($gameState) {
            echo json_encode(['success' => true, 'gameState' => $gameState], JSON_PRETTY_PRINT);
        } else {
            echo json_encode(['success' => false, 'message' => 'Game not found'], JSON_PRETTY_PRINT);
        }
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Database error in getGameState(): ' . $e->getMessage()]);
    }
}


/**
 * Place a piece on the board.
 */
function placePiece($gameId, $playerId, $piece, $position) {
    $pdo = getDatabaseConnection();

    try {
        // Convert piece array to JSON string
        $pieceJson = json_encode($piece);

        $sql = "CALL PlacePiece(:gameId, :playerId, :piece, :row, :col);";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':gameId', $gameId, PDO::PARAM_INT);
        $stmt->bindParam(':playerId', $playerId, PDO::PARAM_INT);
        $stmt->bindParam(':piece', $pieceJson, PDO::PARAM_STR); // Bind JSON string
        $stmt->bindParam(':row', $position['row'], PDO::PARAM_INT);
        $stmt->bindParam(':col', $position['col'], PDO::PARAM_INT);

        $stmt->execute();

        echo json_encode(['success' => true, 'message' => 'Piece placed successfully']);
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Database error in placePiece(): ' . $e->getMessage()]);
    }
}



/**
 * End the game by game ID.
 */
function endGame($gameId) {
    $pdo = getDatabaseConnection();

    try {
        $sql = "CALL EndGame(:gameId);"; // Assuming a stored procedure for ending a game
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':gameId', $gameId, PDO::PARAM_INT);
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result) {
            echo json_encode(['success' => true, 'scores' => $result['scores'], 'winner' => $result['winner']], JSON_PRETTY_PRINT);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to end the game'], JSON_PRETTY_PRINT);
        }
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Database error in endGame(): ' . $e->getMessage()]);
    }
}


/**
 * Get the current status of a game.
 */
function getGameStatus($gameId) {
    $pdo = getDatabaseConnection();

    try {
        $sql = "CALL GetGameStatus(:gameId);";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':gameId', $gameId, PDO::PARAM_INT);
        $stmt->execute();

        $status = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($status) {
            echo json_encode(['success' => true, 'status' => $status], JSON_PRETTY_PRINT);
        } else {
            echo json_encode(['success' => false, 'message' => 'Game status not found'], JSON_PRETTY_PRINT);
        }
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Database error in getGameStatus(): ' . $e->getMessage()]);
    }
}

/**
 * Check if the game is in a deadlock state.
 */
function checkDeadlock($gameId) {
    $pdo = getDatabaseConnection();

    try {
        $sql = "CALL CheckDeadlock(:gameId);";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':gameId', $gameId, PDO::PARAM_INT);
        $stmt->execute();

        $deadlock = $stmt->fetch(PDO::FETCH_ASSOC);

        echo json_encode(['success' => true, 'deadlock' => $deadlock['deadlock']], JSON_PRETTY_PRINT);
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Database error in checkDeadlock(): ' . $e->getMessage()]);
    }
}


/**
 * Get the pieces available for a player.
 */
function getPlayerPieces($gameId, $playerId) {
    $pdo = getDatabaseConnection();

    try {
        $sql = "CALL GetPlayerPieces(:gameId, :playerId);";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':gameId', $gameId, PDO::PARAM_INT);
        $stmt->bindParam(':playerId', $playerId, PDO::PARAM_INT);
        $stmt->execute();

        $pieces = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($pieces) {
            echo json_encode(['success' => true, 'pieces' => $pieces], JSON_PRETTY_PRINT);
        } else {
            echo json_encode(['success' => false, 'message' => 'No pieces found for this player'], JSON_PRETTY_PRINT);
        }
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Database error in getPlayerPieces(): ' . $e->getMessage()]);
    }
}


?>
