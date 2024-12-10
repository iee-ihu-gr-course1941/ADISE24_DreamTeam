<?php
header('Content-Type: application/json');

// Include the database connection file
require_once './config/connection.php';


function createGame($userId, $gameType, $maxPlayers) {
    global $pdo;

    $stmt = $pdo->prepare("INSERT INTO games (player1_id, game_status, created_at) 
                           VALUES (?, 'waiting', NOW())");
    $stmt->execute([$userId]);

    $gameId = $pdo->lastInsertId();

    // Update the game with the game type and max players
    $stmt = $pdo->prepare("UPDATE games SET game_type = ?, max_players = ? WHERE id = ?");
    $stmt->execute([$gameType, $maxPlayers, $gameId]);

    return $gameId;
}


function joinGame($userId, $gameId) {
    global $pdo;

    // Check if the game exists and is not full
    $stmt = $pdo->prepare("SELECT * FROM games WHERE id = ? AND game_status = 'waiting'");
    $stmt->execute([$gameId]);
    $game = $stmt->fetch();

    if (!$game) {
        return ['error' => 'Game not available or already started'];
    }

    // Add user to the game (assuming max_players is 4)
    $stmt = $pdo->prepare("UPDATE games SET player2_id = ?, game_status = 'in_progress' 
                           WHERE id = ? AND player2_id IS NULL");
    if ($stmt->execute([$userId, $gameId])) {
        return ['success' => true];
    } else {
        return ['error' => 'Could not join the game'];
    }
}


function getGameDetails($gameId) {
    global $pdo;

    $stmt = $pdo->prepare("SELECT * FROM games WHERE id = ?");
    $stmt->execute([$gameId]);
    $game = $stmt->fetch();

    if (!$game) {
        return ['error' => 'Game not found'];
    }

    // Fetch players' names
    $players = [];
    for ($i = 1; $i <= 4; $i++) {
        if ($game["player{$i}_id"]) {
            $stmt = $pdo->prepare("SELECT name FROM users WHERE id = ?");
            $stmt->execute([$game["player{$i}_id"]]);
            $player = $stmt->fetch();
            $players[] = $player['name'];
        }
    }

    return [
        'game_id' => $gameId,
        'players' => $players,
        'status' => $game['game_status']
    ];
}



function getAvailableGames() {
    global $pdo;

    $stmt = $pdo->prepare("SELECT id, player1_id, game_status FROM games WHERE game_status = 'waiting'");
    $stmt->execute();
    $games = $stmt->fetchAll();

    $availableGames = [];
    foreach ($games as $game) {
        $availableGames[] = [
            'game_id' => $game['id'],
            'player1_id' => $game['player1_id'],
            'status' => $game['game_status']
        ];
    }

    return $availableGames;
}



function leaveGame($userId, $gameId) {
    global $pdo;

    // Check if the user is part of the game
    $stmt = $pdo->prepare("SELECT * FROM games WHERE id = ? AND (player1_id = ? OR player2_id = ?)");
    $stmt->execute([$gameId, $userId, $userId]);
    $game = $stmt->fetch();

    if (!$game) {
        return ['error' => 'You are not in this game'];
    }

    // Remove user from the game and update status if necessary
    $stmt = $pdo->prepare("UPDATE games SET player2_id = NULL, game_status = 'waiting' WHERE id = ? AND player2_id = ?");
    $stmt->execute([$gameId, $userId]);

    return ['success' => true];
}


function startGame($gameId) {
    global $pdo;

    $stmt = $pdo->prepare("SELECT * FROM games WHERE id = ?");
    $stmt->execute([$gameId]);
    $game = $stmt->fetch();

    if (!$game || $game['game_status'] != 'waiting') {
        return ['error' => 'Game cannot be started'];
    }

    // Ensure that enough players are in the game
    if (!$game['player2_id']) {
        return ['error' => 'Not enough players to start the game'];
    }

    // Update game status to in_progress
    $stmt = $pdo->prepare("UPDATE games SET game_status = 'in_progress' WHERE id = ?");
    $stmt->execute([$gameId]);

    return ['success' => true];
}


function endGame($gameId) {
    global $pdo;

    // Fetch game details
    $stmt = $pdo->prepare("SELECT * FROM games WHERE id = ?");
    $stmt->execute([$gameId]);
    $game = $stmt->fetch();

    if (!$game || $game['game_status'] != 'in_progress') {
        return ['error' => 'Game cannot be ended'];
    }

    // Calculate winner (dummy logic: assuming player1 wins for now)
    $winnerId = $game['player1_id'];

    // Update game status and winner
    $stmt = $pdo->prepare("UPDATE games SET game_status = 'finished' WHERE id = ?");
    $stmt->execute([$gameId]);

    return [
        'success' => true,
        'winner_id' => $winnerId
    ];
}



function getGameState($gameId) {
    global $pdo;

    // Retrieve game state
    $stmt = $pdo->prepare("SELECT * FROM game_state WHERE game_id = ?");
    $stmt->execute([$gameId]);
    $gameState = $stmt->fetch();

    if (!$gameState) {
        return ['error' => 'Game state not found'];
    }

    return [
        'game_id' => $gameId,
        'current_turn' => $gameState['current_turn'],
        'board_state' => json_decode($gameState['board_state'])
    ];
}



function updateGameState($gameId, $moveData) {
    global $pdo;

    // Update the game state with the new move data
    $stmt = $pdo->prepare("UPDATE game_state SET current_turn = ?, board_state = ? WHERE game_id = ?");
    $stmt->execute([$moveData['current_turn'], json_encode($moveData['board_state']), $gameId]);

    return ['success' => true];
}


function getGameHistory($gameId) {
    global $pdo;

    $stmt = $pdo->prepare("SELECT * FROM moves WHERE game_id = ? ORDER BY move_timestamp ASC");
    $stmt->execute([$gameId]);
    $moves = $stmt->fetchAll();

    $history = [];
    foreach ($moves as $move) {
        $history[] = [
            'player_id' => $move['player_id'],
            'position_x' => $move['position_x'],
            'position_y' => $move['position_y'],
            'orientation' => $move['orientation'],
            'move_timestamp' => $move['move_timestamp']
        ];
    }

    return $history;
}





?>