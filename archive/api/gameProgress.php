<?php
// Assuming you have a PDO connection set up as $pdo
// Include the PDO connection setup here if needed

// 1. Get the next player's turn
function getNextPlayerTurn($gameId) {
    global $pdo;

    // Retrieve the current player turn
    $sql = "SELECT current_turn FROM games WHERE game_id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$gameId]);
    $currentTurn = $stmt->fetchColumn();

    if ($currentTurn !== false) {
        // Calculate the next player's turn
        $sql = "SELECT user_id FROM game_players WHERE game_id = ? ORDER BY player_order";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$gameId]);
        $players = $stmt->fetchAll(PDO::FETCH_COLUMN);

        $currentIndex = array_search ($currentTurn, $players);
        $nextIndex = ($currentIndex + 1) % count($players);

        return $players[$nextIndex]; // Return the next player's ID
    }

    return null; // Game ID not found
}

// 2. Get available moves for the current player
function getAvailableMoves($gameId, $playerId) {
    global $pdo;

    // Retrieve the current game board state and the player's available pieces
    $sql = "SELECT board_state FROM games WHERE game_id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$gameId]);
    $boardState = $stmt->fetchColumn();

    $sql = "SELECT piece_id FROM player_pieces WHERE game_id = ? AND player_id = ? AND is_used = 0";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$gameId, $playerId]);
    $availablePieces = $stmt->fetchAll(PDO::FETCH_COLUMN);

    // Logic for determining available moves (simplified placeholder)
    // Implement the game's rules to compute valid moves based on `boardState` and `availablePieces`
    $availableMoves = [
        'placeholder' => 'Implement game rules to calculate moves'
    ];

    return $availableMoves;
}

// 3. Get pieces available to the current player
function getPlayerPieces($gameId, $playerId) {
    global $pdo;

    // Retrieve the player's pieces that have not been used
    $sql = "SELECT piece_id FROM player_pieces WHERE game_id = ? AND player_id = ? AND is_used = 0";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$gameId, $playerId]);

    return $stmt->fetchAll(PDO::FETCH_COLUMN); // Return the list of available piece IDs
}

// 4. Update the player's move
function updatePlayerMove($gameId, $playerId, $move) {
    global $pdo;

    // Begin a transaction to ensure atomic updates
    $pdo->beginTransaction();

    try {
        // Update the board state with the new move
        $sql = "UPDATE games SET board_state = ?, current_turn = ? WHERE game_id = ?";
        $stmt = $pdo->prepare($sql);
        $newBoardState = json_encode($move['boardState']); // Assuming `boardState` is part of `$move`
        $stmt->execute([$newBoardState, $move['nextPlayer'], $gameId]);

        // Mark the piece as used
        $sql = "UPDATE player_pieces SET is_used = 1 WHERE game_id = ? AND player_id = ? AND piece_id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$gameId, $playerId, $move['pieceId']]);

        // Commit the transaction
        $pdo->commit();

        return true; // Move successfully updated
    } catch (Exception $e) {
        // Roll back the transaction in case of an error
        $pdo->rollBack();
        return false;
    }
}
