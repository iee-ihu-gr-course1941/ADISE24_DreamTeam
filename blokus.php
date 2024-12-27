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
require_once "lib/boreds.php";


// Initialize router
$router = new Router();


// Add routes with associated functions
$router->add('GET', 'v1', 'getApiVersion');  // Mapping GET /v1 to getApiVersion function
$router->add('GET', 'accounts', 'show_users');  // Mapping GET /accounts to show_users function
$router->add('GET', 'accounts/{id}', 'getUserProfile');  // Mapping GET /accounts/{id} to getUserProfile function


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
$router->add('GET', 'boards/{board_id}', 'getBored');  // 
////////////////////////////////
///////////////////////////////

//lobby functions
$router->add('GET', 'lobbys', 'getLobbies');


 $router->add('POST', 'lobbys/create', function($input) { //Figure out how we can test this one too
    createLobby((int)$input['userId'], $input['gameType'], (int)$input['maxPlayers'], $input['createdAt']);
});




// //works
$router->add('POST', 'lobbys/leave', function() {
    leaveLobby();
});

//games functions


// Handle the request
$input = json_decode(file_get_contents('php://input'), true);
$router->routeRequest($input);

?>