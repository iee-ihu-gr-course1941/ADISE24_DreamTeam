<?php
header('Content-Type: application/json');

// Include the database connection file
require_once './api/config/connection.php';


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


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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

        $currentIndex = array_search($currentTurn, $players);
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



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function getLobbies() {
    global $pdo;

    // Fetch all active lobbies where the status is 'waiting'
    $sql = "SELECT lobby_id, created_by, created_at FROM lobbies WHERE status = 'waiting'";
    $stmt = $pdo->query($sql);

    return $stmt->fetchAll(); // Return the list of active lobbies
}

// 2. Create a new lobby
function createLobby($userId) {
    global $pdo;

    // Insert a new lobby with the status 'waiting'
    $sql = "INSERT INTO lobbies (created_by, status, created_at) VALUES (?, 'waiting', NOW())";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$userId]);

    return $pdo->lastInsertId(); // Return the new lobby ID
}

// 3. Join an existing lobby
function joinLobby($userId, $lobbyId) {
    global $pdo;

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

        return true; // Successfully joined the lobby
    }

    return false; // Lobby is not available
}

// 4. Leave a lobby
function leaveLobby($userId, $lobbyId) {
    global $pdo;

    // Remove the user from the lobby
    $sql = "DELETE FROM lobby_players WHERE lobby_id = ? AND user_id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$lobbyId, $userId]);

    return $stmt->rowCount() > 0; // Return true if the user was successfully removed
}

// 5. Retrieve the details of a specific lobby
function getLobbyDetails($lobbyId) {
    global $pdo;

    // Fetch the lobby details
    $sql = "SELECT l.lobby_id, l.created_by, l.status, l.created_at,
                   p.user_id, u.username
            FROM lobbies l
            LEFT JOIN lobby_players p ON l.lobby_id = p.lobby_id
            LEFT JOIN users u ON p.user_id = u.user_id
            WHERE l.lobby_id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$lobbyId]);

    return $stmt->fetchAll(); // Return the lobby details along with player info
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



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