<?php

    // Allow requests from any origin
    header("Access-Control-Allow-Origin: *");

    // Allow the required methods
    header("Access-Control-Allow-Methods: POST, OPTIONS");

    // Allow headers like Content-Type
    header("Access-Control-Allow-Headers: Content-Type, Authorization");


    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        // Allow preflight request
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization");
        http_response_code(200); // Preflight successful
        exit();
    }

    require_once "lib/dbconnect.php";
    require_once "lib/accounts.php";   // Assuming you have user-related functions
    require_once "lib/users.php";
    require_once "lib/version.php";
    require_once "lib/router.php";
    require_once "lib/lobbys.php";
    require_once "lib/board.php";
    require_once "lib/leaderboard.php";
    require_once "lib/game.php";


    // Initialize router
    $router = new Router();


    // Add routes with associated functions
    $router->add('GET', 'v1', 'getApiVersion');  // Mapping GET /v1 to getApiVersion function
    $router->add('GET', 'accounts', 'show_users');  // Mapping GET /accounts to show_users function
    $router->add('GET', 'accounts/{id}', 'getUserProfile');  // Mapping GET /accounts/{id} to getUserProfile function

    ////////////Leaderboard Functions//////////
    ////////////////////////////////////////
    $router->add('GET', 'leaderboard', 'getLeaderboard');  
    ////////////////////////////////////////
    ////////////////////////////////////////


    //////////User Functions//////////
    /////////////////////////////////
    $router->add('POST', 'users/register', function($input) {
        registerUser($input['username'], $input['password']);
    });
    $router->add('POST', 'users/login', function($input) {
        loginUser($input['username'], $input['password']);
    });
    $router->add('POST', 'users/logout', 'logoutUser');  // POST /users/logout -> logoutUser function
    $router->add('GET', 'users/session', 'checkSession');  // GET /users/session -> checkSession function
    ////////////////////////////////
    ///////////////////////////////

    //////////Bored Functions//////////
    /////////////////////////////////
    $router->add('GET', 'boards/{id}', 'getBoard');  // 
    ////////////////////////////////
    ///////////////////////////////


    //////////Lobby Functions//////////
    ////////////////////////////////
    $router->add('GET', 'lobbys', 'getLobbies');
    $router->add('GET', 'lobbys/{id}', 'getLobbies');

    $router->add('POST', 'lobbys/create', function($input) { //Figure out how we can test this one too
        createLobby((int)$input['userId'], $input['gameType'], (int)$input['maxPlayers'], $input['createdAt']);
    });
    $router->add('POST', 'lobbys/leave', function() {
        leaveLobby();
    });

    $router->add('POST', 'lobbys/join', function($input) {
        if (!isset($input['userId']) || !isset($input['lobbyId'])) {
            echo json_encode(['error' => 'Missing required parameters: userId or lobbyId']);
            return;
        }
    
        $userId = (int)$input['userId'];
        $lobbyId = (int)$input['lobbyId'];
    
        joinLobby($userId, $lobbyId);
    });
    
    ////////////////////////////////
    ////////////////////////////////





    //games functions

    // Game Functions
    $router->add('GET', 'games/{id}', 'getGameState'); // Fetch the state of a game
    $router->add('POST', 'games/{id}/place-piece', function($gameId, $input) {
        // Validate input
        if (!isset($input['playerId'], $input['piece'], $input['position'])) {
            echo json_encode(['error' => 'Missing required parameters: playerId, piece, or position']);
            return;
        }
    
        // Call the placePiece function
        placePiece((int)$gameId, (int)$input['playerId'], $input['piece'], $input['position']);
    });
    
     // Place a piece on the board
    $router->add('POST', 'games/{id}/end', function($params) {
        endGame($params['id']);
    }); // End the game
    $router->add('GET', 'games/{id}/status', 'getGameStatus'); // Get the current status of the game
    $router->add('GET', 'games/{id}/deadlock', 'checkDeadlock'); // Check for deadlock in the game
    $router->add('GET', 'games/{id}/players/{playerId}/pieces', 'getPlayerPieces'); // Get the available pieces for a player



    // Handle the request
    $input = json_decode(file_get_contents('php://input'), true);
    $router->routeRequest($input);

?>