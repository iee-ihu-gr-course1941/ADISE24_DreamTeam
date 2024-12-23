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
//require_once "lib/router.php";
require_once "lib/lobbys.php";

class Router {
    private $routes = [];

    // Add routes dynamically
    public function add($method, $path, $function) {
        // Convert route placeholders to regex
        $pattern = preg_replace('/\{[a-zA-Z0-9_]+\}/', '([^/]+)', $path);
        // Store route with regex pattern and function
        $this->routes[strtoupper($method)][] = [
            'pattern' => "#^$pattern$#",
            'function' => $function
        ];
    }

    // Handle the request
    public function handle($method, $path, $input) {
        $method = strtoupper($method);

        // Check if the method has registered routes
        if (!isset($this->routes[$method])) {
            header("HTTP/1.1 404 Not Found");
            echo json_encode(["error" => "Method not allowed"]);
            return;
        }

        // Loop through registered routes for the method
        foreach ($this->routes[$method] as $route) {
            if (preg_match($route['pattern'], $path, $matches)) {
                // Remove the full match and pass the rest as arguments
                array_shift($matches);
                call_user_func_array($route['function'], array_merge($matches, [$input]));
                return;
            }
        }

        // If no route matches, return 404
        header("HTTP/1.1 404 Not Found");
        echo json_encode(["error" => "Endpoint not found"]);
    }

    // Parse and handle the incoming request
    public function routeRequest($input) {
        $method = $_SERVER['REQUEST_METHOD'];
        $path = trim($_SERVER['PATH_INFO'], '/'); // Clean the path
        $input['token'] = $_SERVER['HTTP_X_TOKEN'] ?? '';

        $this->handle($method, $path, $input);
    }
}


// Initialize router
$router = new Router();


// Add routes with associated functions
$router->add('GET', 'v1', 'getApiVersion');  // Mapping GET /v1 to getApiVersion function
$router->add('GET', 'accounts', 'show_users');  // Mapping GET /accounts to show_users function
$router->add('GET', 'accounts/{id}', 'getUserProfile');  // Mapping GET /accounts/{id} to getUserProfile function


//user functions
$router->add('POST', 'users/register', function($input) {
	registerUser($input['username'], $input['password'], $input['email']);
});
$router->add('POST', 'users/login', function($input) {
    loginUser($input['username'], $input['password']);
});
$router->add('POST', 'users/logout', 'logoutUser');  // POST /users/logout -> logoutUser function
$router->add('GET', 'users/session', 'checkSession');  // GET /users/session -> checkSession function

//lobby functions
$router->add('GET', 'lobbys', 'getLobbies');
$router->add('GET', 'lobbys/uid', function($input) { //Figure out how we can test this one
    if (isset($input['player1_id']) && is_numeric($input['player1_id'])) {
        createLobby((int)$input['player1_id']);
    } else {
        echo json_encode(['error' => 'Invalid or missing userid parameter.']);
    }
});

$router->add('POST', 'lobbys/join', function($input) { //Figure out how we can test this one too
    if (isset($input['userId']) && isset($input['lobbyId'])) {
        joinLobby((int)$input['userId'], (int)$input['lobbyId']);
    } else {
        echo json_encode(['error' => 'Missing userId or lobbyId parameters']);
    }
});

// //works
$router->add('POST', 'lobbys/leave', function() {
    leaveLobby();
});

//Issue with parameters
// $router->add('POST', 'lobbys/leave', function($input) {
//     if (isset($input['id'])) {
//         leaveLobby((int)$input['id']);
//     } else {
//         echo json_encode(['error' => 'Missing lobbyId parameter']);
//     }
// });

// Handle the request
$input = json_decode(file_get_contents('php://input'), true);
$router->routeRequest($input);

?>